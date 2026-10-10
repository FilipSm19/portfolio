import Projects from "./components/sections/projects";
import SectionCard from "./components/ui/card-section";
import Skills from "./components/sections/skills";
import Exp from "./components/sections/exp";
import Contact from "./components/sections/contact";
import ThemeSwitch from "./components/ui/themeSwitch";
import TechMatrixBg from "./components/ui/techmatrix";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans relative">
      <div className="fixed inset-0 -z-1 pointer-events-none hidden sm:block">
        <TechMatrixBg />
      </div>
      <ThemeSwitch />
      <div className='w-full max-w-3xl'>
        <header className='bg-navbar sticky top-0 z-50'>
          <nav className="border rounded-t-sm border-border md:rounded-t-none md:border-t-0 px-4 sm:px-16 text-center" id='navbar'>
            <div className="flex text-xs items-center font-mono tracking-normal sm:tracking-widest text-secondary">
              <a href="#projects" className="w-full py-4">Projects</a>
              <a href="#skills" className="w-full py-4">Skills</a>
              <a href="#experience" className="w-full py-4">Experience</a>
              <a href="#contact" className="w-full py-4">Contact</a>
            </div>
          </nav>
        </header>
        <main className="flex flex-1 flex-col items-center py-16 sm:py-24 px-4 sm:px-16 rounded-b-md sm:items-start gap-16 z-5 bg-bg_text/70 backdrop-blur-xs border-x border-b border-outer_border">
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
      </div>
      <footer className="pt-4 pb-24">
        <p className="text-neutral-500 text-xs select-none">
          Self-designed and developed using Next.js & Tailwind CSS
        </p>
      </footer>
    </div >
  );
}
