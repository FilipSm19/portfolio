import SkillItem from "../ui/card-item";

export default function Skills() {
    return <div>
        <ul className='flex flex-col sm:flex-row flex-wrap gap-5 tracking-wider'>
            <SkillItem title='Application Development' className='sm:w-[calc(50%-0.625rem)]'><AppDev /></SkillItem>
            <SkillItem title='Databases' className='sm:w-[calc(50%-0.625rem)]'><Databases /></SkillItem>
            <SkillItem title='Web Development' className='sm:w-[calc(50%-0.625rem)]'><WebDev /></SkillItem>
            <SkillItem title='Programming Languages' className='sm:w-[calc(50%-0.625rem)]'><ProgLang /></SkillItem>
        </ul>
    </div>;
}


function AppDev() {
    return <>
        <li>
            Flutter
        </li>
        <li>
            .NET MAUI
        </li>
    </>;
}

function WebDev() {
    return <>
        <li>
            Next.JS
        </li>
        <li>
            HTML
        </li>
        <li>
            CSS
        </li>
    </>;
}


function ProgLang({
}) {
    return <>
        <li>
            Dart
        </li>
        <li>
            C#
        </li>
        <li>
            Python
        </li>
    </>;
}

function Databases() {
    return <>
        <li>
            Cloud Firestore
        </li>
        <li>
            PostgreSQL
        </li>
    </>;
}