import BtnLink from "../btnLink";


export default function PeerSupp() {
    return <>
        <li>
            Student project, Software Engineering course
        </li>
        <li>
            Designed and developed app functionalities collaboratively.
        </li>
        <li>
            Set up Flutter environment and integrated with Cloud Firebase.
        </li>
        <li>
            Built user, chat, admin, and mentor interfaces.
        </li>
        <div className='flex flex-row gap-4 items-center justify-start mt-2'>
            <BtnLink title='GitHub' url='https://github.com/FilipSm19/pi_app' />
        </div>
    </>;
}