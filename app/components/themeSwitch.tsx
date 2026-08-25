'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [translateY, setTranslateY] = useState(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            const offset = Math.max(Math.min(-delta * 3, 30), -30);
            setTranslateY(offset);

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setTranslateY(0);
            }, 80);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        }
    }, [])

    if (!mounted) return;

    return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        style={{
            transform: `translateY(${translateY}px)`,
            transition: translateY === 0
                ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) colors 0.2s'
                : 'all 0.3s ease-out',

        }} className='absolute sm:fixed top-15 sm:bottom-5 sm:top-auto right-2 w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center sm:bg-bg_text rounded-md text-secondary hover:text-opposite-fg border-border hover:border-opposite-fg hover:bg-opposite-bg sm:border'>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>;
}



// Sun Icon (Light Mode)
export function SunIcon({ className = "w-5 h-5 sm:w-6 sm:h-6" }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

// Moon Icon (Dark Mode)
export function MoonIcon({ className = "w-5 h-5 sm:w-6 sm:h-6" }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    );
}