"use client";
import React from "react";
import { useNoCursorObserver } from "../../../hooks/observer";
import { twMerge } from "tailwind-merge";

interface CardSectionProps {
    title?: string;
    id?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function CardSection({ title, id, children, className }: CardSectionProps) {
    const { elementRef, isActive } = useNoCursorObserver<HTMLDivElement>("section");

    return (
        <div ref={elementRef} data-active={isActive} className="w-full scroll-mt-20 group" id={id}>
            {title && <span className="badge border border-border border-b-0 text-sm rounded-b-none pb-0.5 select-none group-hover:text-primary group-data-[active=true]:text-primary">
                {title}
            </span>}
            <div className={twMerge(" border rounded-sm border-border p-4 text-sm ", (title ? "rounded-tl-none " : ""), className)}>
                {children}
            </div>
        </div>
    );
}