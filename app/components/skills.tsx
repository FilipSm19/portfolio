import SkillItem from "./item-card";

export default function Skills() {
    return <div>
        <ul className='flex flex-col sm:flex-row flex-wrap gap-5 tracking-wider'>
            <SkillItem title='Application Development' className='sm:w-[calc(50%-10px)]'><AppDev /></SkillItem>
            <SkillItem title='Web Development' className='sm:w-[calc(50%-10px)]'><WebDev /></SkillItem>
            <SkillItem title='Programming Languages' className='sm:w-[calc(50%-10px)]' classNameList="sm:gap-2.5"><ProgLang /></SkillItem>
            <ul className='sm:w-[calc(50%-10px)] flex flex-col gap-5'>
                <SkillItem title='Databases'><Databases /></SkillItem>
                <SkillItem title='Other'><Other /></SkillItem>
            </ul>

        </ul>
    </div>;
}


function AppDev() {
    return <>
        <li>
            Flutter
        </li>
        <li>
            Firebase
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
            C++
        </li>
        <li>
            Python
        </li>
        <li>
            TypeScript
        </li>
        <li>
            JavaScript
        </li>

    </>;
}

function Databases() {
    return <>
        <li>
            Firebase
        </li>
        <li>
            PostgreSQL
        </li>
        <li>
            MongoDB
        </li>
    </>;
}

function Other() {
    return <>
        <li>
            Git
        </li>
        <li>
            GIMP
        </li>
    </>;
}