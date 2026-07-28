
"use client";

import { useState } from "react";

export default function Contact({ email = 'filip.smojver19@gmail.com' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = email;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return <div>
        <div className='flex flex-row gap-10 tracking-wider justify-center'>
            <div className='flex flex-row items-center gap-1'>
                <a href={'mailto:' + email}>Email</a>
                <button
                    onClick={handleCopy}
                    type="button"
                    className={["duration-200 cursor-pointer", copied ? "text-teal-600  border-teal-900" : "hover:text-teal-300 border-taupe-900"].join(" ")}
                    title="Copy email to clipboard">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                </button>
            </div>
            <a href='https://www.linkedin.com/in/filip-smojver/' target="_blank">LinkedIn</a>
            <a href='https://github.com/FilipSm19' target="_blank">GitHub</a>
            <div
                className={[
                    "fixed bottom-6 left-1/2 -translate-x-1/2 z-52",
                    "flex items-center gap-2 px-4 py-2 rounded-full",
                    "bg-black border border-taupe-700 text-xs",
                    "pointer-events-none transition-all duration-300 ease-out",
                    copied
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95",
                ].join(" ")}
            >
                <span>Copied to clipboard</span>
            </div>
        </div>
    </div >;
}

