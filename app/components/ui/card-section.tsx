"use client";
import React from "react";
import { useActiveObserver } from "../observer";

interface CardSectionProps {
    title: string;
    id?: string;
    children: React.ReactNode;
}

export default function CardSection({ title, id, children }: CardSectionProps) {
    const { elementRef, isActive } = useActiveObserver<HTMLDivElement>();

    return (
        <div ref={elementRef} data-active={isActive} className="w-full scroll-mt-20 group" id={id}>
            <span className="badge border border-border border-b-0 text-sm rounded-b-none pb-0.5 select-none group-hover:text-primary group-data-[active=true]:text-primary">
                {title}
            </span>
            <div className="border rounded-sm rounded-tl-none border-border p-4 text-sm">
                {children}
            </div>
        </div>
    );
}