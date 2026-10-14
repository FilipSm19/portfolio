export function H({ children, className }: { children: React.ReactNode, className?: string }) {
    return <span className={"highlight " + className}> {children}</span>;
}