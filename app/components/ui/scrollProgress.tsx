"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? ((window.scrollY) / maxScroll) * 100 : 0;
            //let progress = maxScroll > 0 ? (0.1 + (window.scrollY * 0.75) / maxScroll) * 100 : 0;

            document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return null;
}