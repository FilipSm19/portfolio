export default function ItemSectionCard({
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

    return (
        <li className={'select-none group/item sm:hover:bg-background w-full rounded-sm overflow-hidden ' + className}>
            <div className="item-card-title flex items-center gap-2.5 whitespace-pre-line px-2">
                {title}
            </div>
            {subtitle && <div className="flex items-center gap-2.5 whitespace-pre-line px-2 mt-1 text-secondary">
                {subtitle}
            </div>}
            <div className="leading-relaxed overflow-hidden">
                <div className='ml-5 my-2.5 px-2'>
                    <ul className={"flex flex-col gap-2 tracking-wider list-['-_'] marker:text-marker marker:font-mono text-foreground_muted group-hover/item:text-foreground " + classNameList}>{children}
                    </ul>
                </div>
            </div>
        </li>
    )
}