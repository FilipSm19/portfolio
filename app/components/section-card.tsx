import React from "react";

interface SectionCardProps {
    title: string;
    id?: string;
    children: React.ReactNode;
}

export default function SectionCard({ title, id, children }: SectionCardProps) {
    return (
        <div className="w-full scroll-mt-20 group" id={id}>
            <span className="badge text-taupe-500 border border-taupe-800 border-b-0 text-sm rounded-b-none pb-0.5 select-none group-hover:text-taupe-400">
                {title}
            </span>
            <div className="border rounded-sm rounded-tl-none border-taupe-800 p-5 text-sm text-taupe-400">
                {children}
            </div>
        </div>
    );
}