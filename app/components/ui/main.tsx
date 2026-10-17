export default function MainContainer({ children }: { children?: React.ReactNode }) {
    return <main className="flex flex-1 flex-col items-center py-16 sm:py-24 px-4 sm:px-16 rounded-b-md sm:items-start gap-16 z-5 bg-bg_text/70 backdrop-blur-xs border-x border-b border-outer_border min-h-[75vh]">{children}</main>;
}