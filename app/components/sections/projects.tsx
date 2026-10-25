"use client";
import PMS from "../projects/pms";
import PeerSupp from "../projects/peersupp";
import HauntEsc from "../projects/hauntesc";
import Restaurant from "../projects/restaurant";
import Link from "next/link";
import ProjectItem from "../ui/cards/card-item-interactive";
import { FilesIcon } from "../ui/icons/icons";

export default function Projects() {
    return <div>
        <ul className='flex flex-col gap-5 tracking-wider'>
            <ProjectItem title="Project Management System Development">
                <PMS />
            </ProjectItem>
            <ProjectItem title='Development of the Flutter application Restaurant'>
                <Restaurant />
            </ProjectItem>
            <ProjectItem title="Peer Support Application">
                <PeerSupp />
            </ProjectItem>
            <ProjectItem title='3D Computer Video Game - "The Haunting Escape"'>
                <HauntEsc />
            </ProjectItem>
            <Link href="pdfmerger"><ProjectItem title={<div className='flex-center gap-1'>{<FilesIcon className='not-group-hover/item:animate-primary size-5 mb-0.5' />} Online PDF Merger</div>} canInteract={false}></ProjectItem></Link>
        </ul>
    </div>;
}

