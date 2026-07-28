export default function ItemSectionCard({
    title,
    children,
    className = "",
    classNameList = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
    classNameList?: string;
}) {

    return (
        <li className={'hover:text-teal-500 select-none transition-colors ease-in-out duration-600 ${className} ' + className}>
            <div className="flex items-center gap-2.5 whitespace-pre-line">
                {title}
            </div>
            <div className="text-white leading-relaxed overflow-hidden">
                <div className='ml-5 mt-2.5 text-white '>
                    <ul className={"flex flex-col gap-2 tracking-wider list-['-_'] marker:text-taupe-500 marker:font-mono not-hover:text-taupe-300 " + classNameList}>{children}
                    </ul>
                </div>
            </div>
        </li>
    )
}