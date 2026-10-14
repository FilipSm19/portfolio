import SkillItem from "../ui/card-item";
import { H } from "../ui/text_deco";

const skillsData = {
    "Application Development": ["Flutter", ".NET MAUI"],
    "Databases": ["Cloud Firestore", "PostgreSQL"],
    "Programming Languages": ["Dart", "C#", "Python"],
    "Web Development": ["Next.JS", "HTML", "CSS"],
};

export default function Skills() {
    return (
        <div>
            <ul className="flex flex-col sm:flex-row flex-wrap gap-5 tracking-wider">
                {Object.entries(skillsData).map(([title, items]) => (
                    <SkillItem key={title} title={title} className="sm:w-[calc(50%-0.625rem)]">
                        {items.map((skill) => (
                            <li key={skill}>
                                <H className='text'>{skill}</H>
                            </li>
                        ))}
                    </SkillItem>
                ))}
            </ul>
        </div>
    );
}