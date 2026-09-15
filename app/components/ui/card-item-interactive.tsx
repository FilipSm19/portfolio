"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useActiveObserver } from "../observer";

export default function CardItemInteractive({
    title,
    children,
    className = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { elementRef, isActive } = useActiveObserver<HTMLLIElement>();

    return (
        <li ref={elementRef} data-active={isActive} className={'select-none rounded-sm overflow-hidden group/item ' + className} onClick={() => setIsOpen(!isOpen)}>

            <div className={`flex items-center gap-2.5 cursor-pointer w-full px-3 item-card-title ${isOpen && "bg-badge"}`}>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`w-1 h-1 scale-150 mr-1 shrink-0 ${isOpen ? "bg-primary" : "bg-current group-hover/item:bg-primary group-data-[active=true]/item:bg-primary"}`}
                />
                <span className={`group-hover/item:text-primary group-data-[active=true]/item:text-primary sm:border-b group-hover/item:border-b-transparent ${isOpen ? "no-underline text-primary sm:text-badge_text border-b-transparent" : "underline decoration-0 underline-offset-3 sm:no-underline border-muted"}`}>
                    {title}
                </span>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="bg-background px-2 leading-relaxed overflow-hidden"
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className='ml-5 mt-2.5'>
                            <ul className="flex flex-col gap-2 tracking-wider list-['-_'] marker:text-primary marker:font-mono ">{children}
                            </ul>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </li>
    )
}