import BtnLink from "../ui/btn-link";

export default function Restaurant() {
    return <>
        <li>
            Flutter Project
        </li>
        <li>
            Independently designed application functionalities and layout, created the technical solution and database
        </li>
        <li>
            Integrated with the Cloud Firebase
        </li>
        <li>
            Bachelor's Thesis
        </li>
        <div className='flex flex-row gap-4 items-center justify-start mt-2 pb-2.5'>
            <BtnLink title="GitHub" url='https://github.com/FilipSm19/restoranapp' />
            <BtnLink title="PDF" url='https://zir.nsk.hr/object/infri:1083/FILE0' />
        </div>
    </>;
}