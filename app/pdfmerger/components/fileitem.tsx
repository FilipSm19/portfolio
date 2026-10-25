import { DeleteIcon, ExchangeIcon, FileIcon, MoveToEndIcon } from "../../components/ui/icons/icons";

export default


    function FileItem(
        {
            file,
            index,
            onDelete,
            isReorderHovered,
            ReorderFiles,
            filesLength,
            onHoverStart,
            onHoverEnd
        }:
            {
                file: File,
                index: number,
                onDelete: () => void,
                isReorderHovered: boolean;
                ReorderFiles: (index: number) => void;
                filesLength: number;
                onHoverStart: () => void;
                onHoverEnd: () => void;
            }) {

    if (!file) return null;
    const name = file.name;

    const notFirstIndexOrMoreThanTwo = (index !== 0 || filesLength > 2);

    return <div className={'flex-center ' + (notFirstIndexOrMoreThanTwo ? 'w-1/3 sm:w-1/5' : 'w-1/5 sm:w-1/6')}>
        {notFirstIndexOrMoreThanTwo && <div className={'text-[0.5rem] p-1 rounded-xs text-secondary hover:bg-badge hover:text-primary z-25 cursor-pointer opacity-30 hover:opacity-100 transition-appearance'}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onClick={(e) => { e.preventDefault(); ReorderFiles(index); }}>
            {index !== 0 ? <ExchangeIcon className='size-5' /> : <MoveToEndIcon className="size-5" />}</div>}
        <div className={(isReorderHovered ? 'text-secondary! ' : '') + "hover:text-primary z-10 px-3 py-4 relative group/file transition-colors duration-400 " + (notFirstIndexOrMoreThanTwo ? 'w-4/5' : 'w-full')} aria-label={name} title={name}>
            <div className='not-group-hover/file:opacity-0 absolute z-15 top-2 right-4 cursor-pointer size-5 flex-center rounded-xs transition-appearance text-secondary hover:bg-area' title={'Remove File: ' + name} onClick={onDelete}>
                <DeleteIcon className='size-3' />
            </div>
            <FileIcon className='text-center text w-full size-6 mb-2' />
            <div className='overflow-hidden text-ellipsis wrap-break-word text-wrap text-[0.625rem] flex-1 text-center'>{
                (name.length > 23) ?
                    name.substring(0, 20) + '…' + name.slice(-3)
                    :
                    name

            }</div>
        </div>
    </div >;
}

