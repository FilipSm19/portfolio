"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ItemSectionCard({
    title,
    children,
    className = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className={'hover:text-teal-500 select-none ' + className} onClick={() => setIsOpen(!isOpen)}>

            <div className="flex items-center gap-2.5 cursor-pointer">
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`w-1.25 h-1.25 shrink-0 ${isOpen ? "bg-teal-500" : "bg-current"
                        }`}
                />
                <span className={isOpen ? "text-teal-500 " : ""}>
                    {title}
                </span>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="text-white leading-relaxed overflow-hidden"
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className='ml-5 mt-2.5 text-white'>
                            <ul className="flex flex-col gap-2 tracking-wider list-['-_'] marker:text-teal-500 marker:font-mono">{children}
                            </ul>
                        </div>


                    </motion.div>
                )}
            </AnimatePresence>

        </li>
    )
}