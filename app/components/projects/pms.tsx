import BtnLink from "../btnLink";

export default function PMS() {
    return <>
        <li>
            Master's Thesis
        </li>
        <li>
            Developed using .NET MAUI framework.
        </li>
        <li>
            Built API with ASP.NET Core for CRUD operations.
        </li>
        <li>
            Integrated with PostgreSQL database and managed credentials.
        </li>
        <div className='flex flex-row gap-4 items-center justify-start mt-2'>
            <BtnLink title='PDF' url='https://zir.nsk.hr/object/infri:1460/FILE0' />
        </div>
    </>;
}