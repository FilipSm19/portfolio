"use client";
import PMS from "./projects/pms";
import PeerSupp from "./projects/peersupp";
import HauntEsc from "./projects/hauntesc";
import Restaurant from "./projects/restaurant";
import ProjectItem from "./interact-item-card";

export default function Projects() {
    return <div>
        <ul className='flex flex-col gap-5 tracking-wider'>
            <ProjectItem title='Development of the Flutter application Restaurant'>
                <Restaurant />
            </ProjectItem>
            <ProjectItem title="Peer Support Application">
                <PeerSupp />
            </ProjectItem>
            <ProjectItem title='3D Computer Video Game - "The Haunting Escape"'>
                <HauntEsc />
            </ProjectItem>
            <ProjectItem title="Project Management System Development">
                <PMS />
            </ProjectItem>
        </ul>
    </div>;
}

