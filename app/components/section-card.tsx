import React from "react";

interface SectionCardProps {
    title: string;
    id?: string;
    children: React.ReactNode;
}

export default function SectionCard({ title, id, children }: SectionCardProps) {
    return (
        <div className="w-full scroll-mt-20 group" id={id}>
            <span className="badge border border-border border-b-0 text-sm rounded-b-none pb-0.5 select-none group-hover:text-primary">
                {title}
            </span>
            <div className="border rounded-sm rounded-tl-none border-border p-4 text-sm">
                {children}
            </div>
        </div>
    );
}