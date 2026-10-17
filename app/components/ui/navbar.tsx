export default function Navbar(
    { children, className }:
        {
            children: React.ReactNode,
            className?: string
        }) {
    return <nav className="border rounded-t-sm border-border md:rounded-t-none md:border-t-0 text-center" id='navbar'>
        <div className={"flex text-xs items-center font-mono tracking-normal sm:tracking-widest text-secondary [&>a]:hover:bg-badge " + className}>
            {children}
        </div>
    </nav>
}