import Projects from "./components/sections/projects";
import SectionCard from "./components/ui/cards/card-section";
import Skills from "./components/sections/skills";
import Exp from "./components/sections/exp";
import Contact from "./components/sections/contact";
import Navbar from "./components/ui/navbar";
import MainLayout from "./components/ui/mainLayout";
import MainContainer from "./components/ui/main";

export default function Home() {
  return <MainLayout>
    <div className='w-full max-w-3xl 2k:max-w-4xl'>
      <header className='bg-navbar sticky top-0 z-50'>
        <Navbar className="[&>a]:w-full [&>a]:p-4">
          <a href="#projects" title="Projects">Projects</a>
          <a href="#skills" title="Skills">Skills</a>
          <a href="#experience" title="Experience">Experience</a>
          <a href="#contact" title="Contact">Contact</a>
        </Navbar>

      </header>
      <MainContainer>
        <div className='flex flex-col gap-3 self-center items-center text-center select-none'>
          <div className='tracking-widest font-mono text-xl'>Hi, my name is <span className='shrink-0 badge text-primary text-[1em] whitespace-nowrap leading-[2.5em] sm:leading-[2em] rounded-md normal-case tracking-[0.15em]'>Filip Smojver</span></div><div className="text-secondary tracking-wide text-sm sm:text-[1em]">Welcome to my software development journey.</div>
        </div>

        <SectionCard title='Projects' id='projects'>
          <Projects />
        </SectionCard>

        <SectionCard title='Skills & Tech Stack' id='skills'>
          <Skills />
        </SectionCard>

        <SectionCard title='Work Experience' id='experience'>
          <Exp />
        </SectionCard>

        <SectionCard title='Contact' id='contact'>
          <Contact />
        </SectionCard>

      </MainContainer>
    </div>
  </MainLayout>
}
