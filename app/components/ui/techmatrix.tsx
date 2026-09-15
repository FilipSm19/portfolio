"use client";

import { useEffect, useRef } from "react";

interface DiamondGroup {
    id: number;
    relativeX: number; // Normalized X inside side zone (0.0 to 1.0)
    centerY: number; // Base Y position
    size: number;
    speed: number;
    sideZone: "left" | "right";
    longLineIndices: [number, number];
    baseExtensions: [number, number, number, number];
    lineWidths: [number, number, number, number];
    baseOpacity: number;
}

// Used only if neither --color-primary nor --primary is defined on the
// document, so this component still renders sensibly when dropped into a
// project without that design token set up.
const FALLBACK_PRIMARY_COLOR = "oklch(70.4% 0.14 182.503)";

// Cap device pixel ratio. Some phones report 3, which quadruples pixel/
// gradient cost for a difference invisible on thin lines like these.
const MAX_DPR = 2;

// Fixed seed so the generated layout (positions, sizes, speeds, opacities)
// is identical on every mount/reload instead of reshuffling each time.
// Change this number to intentionally generate a different, still-stable
// layout.
const LAYOUT_SEED = 20240614;

// --- Motion tuning -----------------------------------------------------
// How quickly the smoothed scroll position catches up to the real scroll
// position. Lower = laggier/smoother/slower-feeling motion.
const SCROLL_LERP_FACTOR = 0.035;
// Parallax drift speed range per diamond group, as a fraction of scroll
// distance. Lowered from the original [0.2, 0.55] to [0.07, 0.25] so
// diamonds drift noticeably slower relative to how far you scroll.
const PARALLAX_SPEED_MIN = 0.17;
const PARALLAX_SPEED_RANGE = 0.28;
// Speed of the scroll-driven sine "breathing" (line-length pulses and
// gradient shifts). Lowered so breathing feels calmer while scrolling.
const SCROLL_WAVE_SPEED = 0.0011;
// How far (in smoothed scroll px/frame) scroll activity needs to reach
// before lines hit maximum extra brightness.
const SCROLL_ACTIVITY_RANGE = 10;
// How quickly the brighten/dim response to scroll activity eases in and
// out — kept low so the transparency shift reads as a smooth glow rather
// than a flicker.
const SCROLL_ACTIVITY_SMOOTHING = 0.08;
// Maximum extra opacity added while actively scrolling.
const SCROLL_GLOW_STRENGTH = 0.32;
// -------------------------------------------------------------------------

// Below this, the centered content card covers almost the full viewport
// width, so the side-zone diamonds are hidden underneath it anyway. Kept in
// sync with the `hidden sm:block` wrapper class in the page — match
// Tailwind's `sm` breakpoint if you change one, change the other.
const ACTIVE_MEDIA_QUERY = "(min-width: 640px)";

// Small deterministic PRNG (mulberry32) so the layout is reproducible from
// LAYOUT_SEED instead of relying on Math.random(), which reshuffles the
// scene on every page load.
function mulberry32(seed: number) {
    let state = seed;
    return function () {
        state |= 0;
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Reads the theme's primary color straight off the document so the line
// color always matches:
//   --color-primary: var(--primary);
// Custom properties resolve nested var() references at computed-value
// time, so this returns the final color (e.g. an oklch(...) string) rather
// than the literal text "var(--primary)".
function resolvePrimaryColor(): string {
    if (typeof window === "undefined") return FALLBACK_PRIMARY_COLOR;
    const rootStyles = getComputedStyle(document.documentElement);
    const value =
        rootStyles.getPropertyValue("--color-primary").trim() ||
        rootStyles.getPropertyValue("--primary").trim();
    return value || FALLBACK_PRIMARY_COLOR;
}

// Builds a translucent variant of a color without needing to know or parse
// its color space (oklch/hsl/rgb/hex all work) — color-mix handles that.
function alphaStop(color: string, percent: number): string {
    return `color-mix(in oklab, ${color} ${percent}%, transparent)`;
}

export default function TechMatrixBg() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId = 0;
        let resizeRafId = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        let width = 0;
        let height = 0;
        const activeQuery = window.matchMedia(ACTIVE_MEDIA_QUERY);
        let isVisible = document.visibilityState !== "hidden" && activeQuery.matches;

        // Smooth Scroll Variables
        let targetScrollY = 0;
        let currentScrollY = 0;
        let previousScrollY = 0;
        let scrollActivity = 0; // 0..1, eases toward how fast the user is currently scrolling

        // Gradient stop colors, derived from the theme's --color-primary /
        // --primary token. Recomputed only on mount and on theme change
        // (see themeObserver below) — never per frame.
        let primaryColor = resolvePrimaryColor();
        let stopEdge = alphaStop(primaryColor, 5);
        let stopRamp = alphaStop(primaryColor, 20);
        let stopPeak = primaryColor;

        const refreshPrimaryColor = () => {
            const next = resolvePrimaryColor();
            if (next === primaryColor) return;
            primaryColor = next;
            stopEdge = alphaStop(primaryColor, 5);
            stopRamp = alphaStop(primaryColor, 20);
            stopPeak = primaryColor;
        };

        // Follow theme changes (e.g. a `dark` class toggled on <html>)
        // instead of freezing at whatever color was resolved at mount time.
        const themeObserver = new MutationObserver(refreshPrimaryColor);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "style"],
        });

        const rng = mulberry32(LAYOUT_SEED);

        // Generate Diamond Groups with Stratified Grid Sampling to prevent spatial gaps ("holes")
        const diamondGroups: DiamondGroup[] = [];
        const rows = 10;
        const colsPerSide = 4;
        let idCounter = 0;

        const sideZones: Array<"left" | "right"> = ["left", "right"];

        for (const sideZone of sideZones) {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < colsPerSide; c++) {
                    const indices = [0, 1, 2, 3];
                    const longIndex1 = indices.splice(
                        Math.floor(rng() * indices.length),
                        1
                    )[0];
                    const longIndex2 = indices.splice(
                        Math.floor(rng() * indices.length),
                        1
                    )[0];

                    const baseExtension = rng() * 15 + 15;

                    // Stratified positioning + subtle jitter
                    const cellWidth = 1.0 / colsPerSide;
                    const cellHeight = 1.0 / rows;

                    const jitterX = (rng() - 0.5) * cellWidth * 0.7;
                    const jitterY = (rng() - 0.5) * cellHeight * 0.7;

                    const relativeX = Math.max(
                        0.05,
                        Math.min(0.95, (c + 0.5) * cellWidth + jitterX)
                    );
                    const relativeY = (r + 0.5) * cellHeight + jitterY;

                    diamondGroups.push({
                        id: idCounter++,
                        relativeX,
                        centerY: relativeY,
                        size: rng() * 25 + 30,
                        speed: rng() * PARALLAX_SPEED_RANGE + PARALLAX_SPEED_MIN,
                        sideZone,
                        longLineIndices: [longIndex1, longIndex2],
                        baseExtensions: [
                            baseExtension,
                            baseExtension,
                            baseExtension,
                            baseExtension,
                        ],
                        lineWidths: [
                            rng() * 2 + 1,
                            rng() * 2 + 1,
                            rng() * 2 + 1,
                            rng() * 2 + 1,
                        ],
                        baseOpacity: rng() * 0.65 + 0.25,
                    });
                }
            }
        }

        const applyResize = () => {
            if (!canvas.parentElement) return;
            dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // Reset the transform before rescaling, otherwise repeated resize
            // events compound the scale (2x -> 4x -> 8x...).
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        const handleResize = () => {
            cancelAnimationFrame(resizeRafId);
            resizeRafId = requestAnimationFrame(applyResize);
        };

        const handleScroll = () => {
            targetScrollY = window.scrollY;
        };

        const handleVisibility = () => {
            const nowActive = document.visibilityState === "visible" && activeQuery.matches;
            if (nowActive && !isVisible) {
                isVisible = true;
                animationFrameId = requestAnimationFrame(render);
            } else if (!nowActive) {
                isVisible = false;
                cancelAnimationFrame(animationFrameId);
                ctx.clearRect(0, 0, width, height);
            }
        };

        applyResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("visibilitychange", handleVisibility);
        // Covers resizing/rotating across the breakpoint (e.g. a foldable
        // phone, or shrinking a desktop browser window), not just tab
        // show/hide — same start/stop logic either way.
        activeQuery.addEventListener("change", handleVisibility);

        const resizeObserver = new ResizeObserver(handleResize);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

        // Pre-allocated line length buffer to prevent allocations in loop
        const currentLineLengths: [number, number, number, number] = [0, 0, 0, 0];

        ctx.lineCap = "round";

        const render = (time: number) => {
            if (!isVisible) return;
            ctx.clearRect(0, 0, width, height);

            // Smooth scroll interpolation (slower catch-up = calmer motion)
            currentScrollY += (targetScrollY - currentScrollY) * SCROLL_LERP_FACTOR;

            // Scroll "activity": how fast the smoothed scroll is currently
            // moving, eased so lines brighten while scrolling and settle
            // back down smoothly once scrolling stops.
            const scrollDelta = currentScrollY - previousScrollY;
            previousScrollY = currentScrollY;
            const rawActivity = Math.min(1, Math.abs(scrollDelta) / SCROLL_ACTIVITY_RANGE);
            scrollActivity += (rawActivity - scrollActivity) * SCROLL_ACTIVITY_SMOOTHING;
            const scrollGlow = scrollActivity * SCROLL_GLOW_STRENGTH;

            const totalSpan = height + 800;
            const leftBoundary = width * 0.4;
            const rightBoundary = width * 0.6;

            const scrollFactor = currentScrollY * SCROLL_WAVE_SPEED;
            const timeFactor = time * 0.001; // Continuous subtle movement

            for (let i = 0; i < diamondGroups.length; i++) {
                const group = diamondGroups[i];

                // Absolute vertical placement mapped across current height space
                const absoluteY = group.centerY * totalSpan;
                const rawY = absoluteY - currentScrollY * group.speed;
                const drawY = (((rawY % totalSpan) + totalSpan) % totalSpan) - 100;

                // Boundary fade-out calculation
                const fadeMargin = 150;
                let edgeAlpha = 1.0;
                if (drawY < fadeMargin) {
                    edgeAlpha = Math.max(0, (drawY + 100) / (fadeMargin + 100));
                } else if (drawY > height - fadeMargin) {
                    edgeAlpha = Math.max(0, (height + 100 - drawY) / (fadeMargin + 100));
                }

                if (edgeAlpha <= 0) continue;

                const drawX =
                    group.sideZone === "left"
                        ? group.relativeX * leftBoundary
                        : rightBoundary + group.relativeX * (width - rightBoundary);

                const size = group.size;

                // Base line lengths
                currentLineLengths[0] = group.baseExtensions[0];
                currentLineLengths[1] = group.baseExtensions[1];
                currentLineLengths[2] = group.baseExtensions[2];
                currentLineLengths[3] = group.baseExtensions[3];

                // Dynamic expansion modulation combining scroll + subtle time pulse
                const [long0, long1] = group.longLineIndices;
                currentLineLengths[long0] =
                    group.baseExtensions[long0] *
                    (8 + Math.sin(scrollFactor * 3 + timeFactor * 1.5 + group.id) * 3.5);
                currentLineLengths[long1] =
                    group.baseExtensions[long1] *
                    (8 +
                        Math.sin(scrollFactor * 3 + timeFactor * 1.5 + group.id + 1.5) * 3.5);

                // Core vertices as plain numbers (no per-frame object allocation)
                const Tx = drawX, Ty = drawY - size;
                const Rx = drawX + size, Ry = drawY;
                const Bx = drawX, By = drawY + size;
                const Lx = drawX - size, Ly = drawY;

                // Corner line diagonal extensions
                const u0 = 0.7071 * currentLineLengths[0];
                const u1 = 0.7071 * currentLineLengths[1];
                const u2 = 0.7071 * currentLineLengths[2];
                const u3 = 0.7071 * currentLineLengths[3];

                const wave = Math.sin(scrollFactor + timeFactor + i * 0.5) * 0.25;
                const currentOpacity =
                    Math.max(0.08, Math.min(1.0, group.baseOpacity + wave + scrollGlow)) *
                    edgeAlpha;
                ctx.globalAlpha = currentOpacity;

                for (let index = 0; index < 4; index++) {
                    let fx: number, fy: number, tx: number, ty: number;
                    switch (index) {
                        case 0:
                            fx = Tx - u0; fy = Ty - u0; tx = Rx + u0; ty = Ry + u0;
                            break;
                        case 1:
                            fx = Rx + u1; fy = Ry - u1; tx = Bx - u1; ty = By + u1;
                            break;
                        case 2:
                            fx = Bx + u2; fy = By + u2; tx = Lx - u2; ty = Ly - u2;
                            break;
                        default:
                            fx = Lx - u3; fy = Ly + u3; tx = Tx + u3; ty = Ty - u3;
                            break;
                    }

                    const grad = ctx.createLinearGradient(fx, fy, tx, ty);

                    const gradientShift =
                        0.5 +
                        Math.sin(
                            scrollFactor * 2 + timeFactor + group.id * 0.3 + index * 0.8
                        ) *
                        0.3;

                    const peakStop = Math.max(0.15, Math.min(0.85, gradientShift));
                    const startFadeStop = Math.max(0, peakStop - 0.3);
                    const endFadeStop = Math.min(1, peakStop + 0.3);

                    grad.addColorStop(0, stopEdge);
                    if (startFadeStop > 0) grad.addColorStop(startFadeStop, stopRamp);
                    grad.addColorStop(peakStop, stopPeak);
                    if (endFadeStop < 1) grad.addColorStop(endFadeStop, stopRamp);
                    grad.addColorStop(1, stopEdge);

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = group.lineWidths[index];
                    ctx.beginPath();
                    ctx.moveTo(fx, fy);
                    ctx.lineTo(tx, ty);
                    ctx.stroke();
                }
            }

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("visibilitychange", handleVisibility);
            activeQuery.removeEventListener("change", handleVisibility);
            resizeObserver.disconnect();
            themeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
            cancelAnimationFrame(resizeRafId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        />
    );
}