import Footer from "./footer";
import ThemeSwitch from "./themeSwitch";

export default function MainLayout({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans relative">
            <ThemeSwitch />
            {children}
            <Footer />
        </div>);
}