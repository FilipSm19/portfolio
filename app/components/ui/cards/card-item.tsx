"use client";

import { useNoCursorObserver } from "../../observer";

export default function CardItem({
    title,
    subtitle,
    children,
    className,
    classNameList = "",
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    classNameList?: string;
}) {
    const { elementRef, isActive } = useNoCursorObserver<HTMLLIElement>();

    return (
        <li
            ref={elementRef}
            data-active={isActive}
            className={
                'select-none group/item w-full rounded-sm overflow-hidden transition-colors hover:bg-background data-[active=true]:bg-background ' +
                className
            }
        >
            <div className="item-card-title font-bold flex items-center gap-2.5 whitespace-pre-line px-2">
                {title}
            </div>
            {subtitle && <div className="flex items-center gap-2.5 whitespace-pre-line px-2 mt-1 text-secondary">
                {subtitle}
            </div>}
            <div className="leading-relaxed overflow-hidden">
                <div className='ml-5 my-2.5 px-2'>
                    <ul className={"flex flex-col gap-2 tracking-wider list-['-_'] marker:text-marker marker:font-mono text-foreground_muted transition-colors group-hover/item:text-foreground group-data-[active=true]/item:text-foreground " + classNameList}>{children}
                    </ul>
                </div>
            </div>
        </li>
    )
}