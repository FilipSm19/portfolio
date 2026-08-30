import Projects from "./components/sections/projects";
import SectionCard from "./components/card-section";
import Skills from "./components/sections/skills";
import Exp from "./components/sections/exp";
import Contact from "./components/sections/contact";
import ThemeSwitch from "./components/themeSwitch";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background">
      <ThemeSwitch />
      <header className='bg-navbar w-full max-w-3xl mx-16 sticky top-0 z-50'>
        <nav className="flex flex-col gap-6 border rounded-t-sm border-border md:rounded-t-none md:border-t-0 px-4 sm:px-16 text-center" id='navbar'>
          <div className="flex text-xs items-center font-mono tracking-normal sm:tracking-widest text-secondary">
            <a href="#projects" className="w-full py-4">Projects</a>
            <a href="#skills" className="w-full py-4">Skills</a>
            <a href="#experience" className="w-full py-4">Experience</a>
            <a href="#contact" className="w-full py-4">Contact</a>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-16 sm:py-24 px-4 sm:px-16 bg-bg_text border-x border-b sm:rounded-b-sm border-border sm:items-start gap-16">
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

      </main >
      <footer className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6 pt-4 pb-12 text-center">
        <p className="text-neutral-500 text-xs select-none">
          Self-designed and developed using Next.js & Tailwind CSS
        </p>
      </footer>
    </div >
  );
}
