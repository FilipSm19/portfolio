export default function Navbar({ children }: { children: React.ReactNode }) {
    return <nav className="border rounded-t-sm border-border md:rounded-t-none md:border-t-0 px-4 sm:px-16 text-center" id='navbar'>
        <div className="flex text-xs items-center font-mono tracking-normal sm:tracking-widest text-secondary">
            {children}
        </div>
    </nav>
}