import Footer from "./footer";
import ThemeSwitch from "./themeSwitch";

export default function MainLayout({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-1 items-center justify-start font-sans relative">
            <ThemeSwitch />
            <div className='w-full max-w-3xl 2k:max-w-4xl'>
                {children}
            </div>
            <Footer />
        </div>);
}