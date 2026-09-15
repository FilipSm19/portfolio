"use client";

import { useEffect, useRef, useState } from "react";

interface ObserverOptions {
    rootMargin?: string;
    threshold?: number | number[];
}

// The correct signal for "does this device actually support hover" — a wide
// touchscreen still can't hover, and a narrow window on a desktop with a
// mouse still can. Viewport width alone gets both of those wrong.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export function useActiveObserver<T extends HTMLElement = HTMLLIElement>(
    options: ObserverOptions = {}
) {
    const { rootMargin = "-41% 0px -57% 0px", threshold = 0 } = options;

    const [isActive, setIsActive] = useState(false);
    const elementRef = useRef<T | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const hoverQuery = window.matchMedia(HOVER_QUERY);
        let observer: IntersectionObserver | null = null;

        const setup = () => {
            observer?.disconnect();
            observer = null;

            if (hoverQuery.matches) {
                // Real hover device — CSS `hover:` handles it, this hook
                // stays out of the way so the two never fight over state.
                setIsActive(false);
                return;
            }

            observer = new IntersectionObserver(
                ([entry]) => setIsActive(entry.isIntersecting),
                { rootMargin, threshold }
            );
            observer.observe(element);
        };

        setup();
        // Fires only when hover support itself changes (e.g. a 2-in-1
        // laptop switching between mouse and tablet mode) — not on every
        // resize pixel like the old width-based version did.
        hoverQuery.addEventListener("change", setup);

        return () => {
            observer?.disconnect();
            hoverQuery.removeEventListener("change", setup);
        };
    }, [rootMargin, threshold]);

    return { elementRef, isActive };
}