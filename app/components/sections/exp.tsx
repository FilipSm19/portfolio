import ExpItem from "../card-item";

export default function Exp() {
    return <div>
        <ul className='flex flex-col sm:flex-row flex-wrap gap-5 tracking-wider'>
            <ExpItem title={'FULL-STACK DEVELOPER - AppScaled (sole proprietorship)\n[April 2026. - August 2026.]'}>
                <AppScaled />
            </ExpItem>
            <ExpItem title={'WEB DEVELOPER - NetCom d.o.o.\n[March 2026. - April 2026.]'}>
                <NetCom />
            </ExpItem>
            <ExpItem title={'WEB DEVELOPER - Nekretnine1 j.d.o.o.\n[November 2024. - October 2025.]'}>
                <Nekretnine1 />
            </ExpItem>
        </ul>
    </div>;
}


function AppScaled() {
    return <>
        <li>Mobile application development (Flutter & Firebase)</li>
        <li>Direct client communication and requirement gathering</li>
        <li>Database architecture and schema design</li>
        <li>Implementation of clean, responsive UIs directly during development</li>
    </>;
}

function NetCom() {
    return <>
        <li>
            Developing web applications (Laravel, PHP, SQL)
        </li>
        <li>
            Editing websites (HTML, CSS, JavaScript)
        </li>
        <li>
            Testing web applications and bug fixing
        </li>
    </>;
}


function Nekretnine1({
}) {
    return <>
        <li>
            Developing websites using CMS (HTML & CSS)
        </li>
        <li>
            Working with clients - real estate agencies
        </li>
        <li>
            Scrapping (Python)
        </li>
        <li>
            Mobile app development (Flutter)
        </li>
    </>;
}
