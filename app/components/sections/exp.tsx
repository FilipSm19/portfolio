import ExpItem from "../ui/card-item";
import { H as BaseH } from "../ui/text_deco";

const H = ({ children }: { children: React.ReactNode }) => (<BaseH className="font-medium text-foreground">{children}</BaseH>)
export default function Exp() {
    return (
        <div>
            <ul className="flex flex-col sm:flex-row flex-wrap gap-5 tracking-wider">
                <ExpItem
                    title={"FULL-STACK DEVELOPER - AppScaled (sole proprietorship)\n[April 2026. - August 2026.]"}>
                    <AppScaled />
                </ExpItem>
                <ExpItem
                    title={"WEB DEVELOPER - NetCom d.o.o.\n[March 2026. - April 2026.]"}>
                    <NetCom />
                </ExpItem>
                <ExpItem
                    title={"WEB DEVELOPER - Nekretnine1 j.d.o.o.\n[November 2024. - October 2025.]"}>
                    <Nekretnine1 />
                </ExpItem>
            </ul>
        </div>
    );
}

export function AppScaled() {
    return (
        <>
            {/* MOBILE VIEW */}
            <div className="contents sm:hidden">
                <li>
                    Developed <H>mobile app MVP</H> (<H>Flutter</H> & <H>Firebase</H>) including architecture, database, and UI.
                </li>
                <li>
                    Implemented <H>authentication, CRUD</H> operations, and user photo <H>gallery</H> (with reordering/date sorting).
                </li>
                <li>
                    Built profile search, <H>push notifications</H>, public post <H>feed</H>, and managed <H>Firebase security rules</H>.
                </li>
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden sm:contents">
                <li>
                    Independently developed a <H>mobile application MVP</H> using the <H>Flutter</H> framework, with integrated <H>Firebase</H> cloud services for data and file storage, including the <H>design</H> of the application architecture, database, and user interface based on <H>client</H> requirements.
                </li>
                <li>
                    Implemented <H>authentication</H>, <H>CRUD operations</H> for user data and photo management, and a user <H>gallery</H> with custom <H>reordering and date sorting</H> features.
                </li>
                <li>
                    Developed a user profile search feature, a <H>push notification system</H>, a <H>feed</H> displaying public posts, and the configuration of <H>security rules</H> for the Firebase database and storage.
                </li>
                <li>
                    Set up the <H>Git repository</H> and established a version control system for the codebase.
                </li>
            </div>
        </>
    );
}

function NetCom() {
    return (
        <>
            {/* MOBILE VIEW */}
            <div className="contents sm:hidden">
                <li>
                    Built features for <H>Laravel (PHP)</H> web apps with code testing and <H>SQL queries</H>.
                </li>
                <li>
                    Used <H>Git</H> for versioning, branch management, and development ticket resolution.
                </li>
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden sm:contents">
                <li>
                    Maintained and implemented new features for <H>Laravel (PHP)</H> web applications, including code testing and writing <H>SQL queries</H> for relational databases.
                </li>
                <li>
                    Utilized <H>Git</H> for code versioning and branch management, alongside systematic resolution of <H>development tickets</H>.
                </li>
            </div>
        </>
    );
}

function Nekretnine1() {
    return (
        <>
            {/* MOBILE VIEW */}
            <div className="contents sm:hidden">
                <li>
                    Maintained <H>HTML/CSS</H> CMS websites and resolved client tech requests (real estate/e-commerce).
                </li>
                <li>
                    Automated data collection via <H>Python tools for web scraping</H>.
                </li>
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden sm:contents">
                <li>
                    Maintained and visually designed websites (<H>HTML/CSS</H>) within CMS, while managing and resolving technical requests for <H>clients</H> in the real estate and e-commerce sectors.
                </li>
                <li>
                    Automated data collection processes by developing <H>Python</H> tools for <H>web scraping</H>.
                </li>
            </div>
        </>
    );
}