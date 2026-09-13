export default function BtnLink({ title, url }: { title: string; url: string }) {
    return (
        <a
            className='btn'
            target='_blank'
            rel='noopener noreferrer'
            href={url}
            onClick={(e) => e.stopPropagation()}
        >
            {title}
        </a>
    );
}