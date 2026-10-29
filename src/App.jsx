import { useEffect, useRef, useState } from 'react'
import { profile, projects, experience, skillGroups, skillLogos, education, certification } from './data.js'
import { buildMailto } from './contact.js'
import { observeScrollReveals } from './scrollReveal.js'
import Icon from './Icon.jsx'
import ThemePicker from './ThemePicker.jsx'
import GithubContributions from './GithubContributions.jsx'

const sections = [
  ['home', 'Home'], ['about', 'About me'], ['skills', 'Skills & expertise'],
  ['experience', 'Work experience'], ['projects', 'Selected projects'],
  ['education', 'Education'], ['contact', 'Get in touch'],
]

function SectionHeading({ eyebrow, title, description }) {
  return <header className="section-heading" data-reveal>
    <div className="eyebrow flex items-center gap-4"><span>{eyebrow}</span><span className="h-px flex-1 bg-line" /></div>
    <h2 className="mt-5 text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-[-0.055em] leading-tight">{title}</h2>
    {description && <p className="mt-3 max-w-xl text-muted leading-relaxed">{description}</p>}
  </header>
}

function SocialLinks({ labeled = false }) {
  return <div className="flex flex-wrap gap-2.5">
    <a className={labeled ? 'social-label' : 'icon-button'} href={`mailto:${profile.email}`} aria-label="Email Diether"><Icon name="mail" />{labeled && 'Email'}</a>
    <a className={labeled ? 'social-label' : 'icon-button'} href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Diether on LinkedIn (opens in a new tab)"><Icon name="linkedin" />{labeled && 'LinkedIn'}</a>
    <a className={labeled ? 'social-label' : 'icon-button'} href={profile.resume} download aria-label="Download Diether’s resume"><Icon name="download" />{labeled && 'Resume'}</a>
  </div>
}

function ProjectCard({ project, index }) {
  const [failedImage, setFailedImage] = useState(false)
  return <article data-reveal className="project-card group overflow-hidden rounded-3xl border border-line bg-surface">
    <div className={`project-image project-tone-${index % 4}`}>
      {project.image && !failedImage ? <img src={project.image} alt={`${project.title} screenshot`} className="h-full w-full object-contain" loading="lazy" onError={() => setFailedImage(true)} /> : <div className="project-placeholder" role="img" aria-label={`${project.title}: image placeholder`}>
        <span className="preview-corner">PROJECT {String(index + 1).padStart(2, '0')}</span>
        <div className="placeholder-window"><div className="window-dots"><i /><i /><i /></div><div className="flex flex-1 flex-col items-center justify-center gap-3"><Icon name="image" className="h-8 w-8 opacity-60" /><span className="text-xs font-medium tracking-wide">Project preview</span></div></div>
        <span className="preview-caption">IMAGE COMING SOON</span>
      </div>}
    </div>
    <div className="flex flex-col justify-center p-6 sm:p-8">
      <span className="eyebrow !text-[9px] !tracking-[0.16em]">{project.category}</span>
      <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-[-0.04em]">{project.title}</h3>
      <p className="mt-3 text-sm leading-[1.8] text-muted">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">{project.tech.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}</div>
      <p className="mt-5 text-xs text-muted"><span className="mr-2 text-accent">↳</span>{project.role}</p>
    </div>
  </article>
}

export default function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [draftOpened, setDraftOpened] = useState(false)
  const menuButton = useRef(null)

  useEffect(() => observeScrollReveals(document.querySelectorAll('[data-reveal]')), [showAll])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-15% 0px -70% 0px' })
    sections.forEach(([id]) => observer.observe(document.getElementById(id)))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleEscape = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  function openDraft(event) {
    event.preventDefault()
    const fields = Object.fromEntries(new FormData(event.currentTarget))
    window.location.href = buildMailto(fields)
    setDraftOpened(true)
  }

  return <>
    <ThemePicker />
    <a href="#main" className="skip-link">Skip to content</a>
    <aside className="sidebar">
      <div className="flex items-center justify-between">
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)} aria-label="Diether Besa, home">
          <span className="brand-mark">db<span>.</span></span>
          <span className="brand-copy"><strong>Diether Besa<span className="text-accent">.</span></strong><span>Software Engineer</span></span>
        </a>
        <button ref={menuButton} type="button" className="icon-button mobile-menu-button" aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
      <div id="site-navigation" className={`sidebar-body ${menuOpen ? 'is-open' : ''}`}>
        <p className="sidebar-label">EXPLORE</p>
        <nav aria-label="Main navigation" className="flex flex-col gap-1.5">
          {sections.map(([id, label], index) => <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`} aria-current={active === id ? 'location' : undefined} onClick={() => { setActive(id); setMenuOpen(false) }}><span className="nav-line" /><span>{label}</span><span className="nav-index">0{index + 1}</span></a>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="mb-5 flex items-center gap-2 text-xs text-muted"><span className="location-dot" />Caloocan, Philippines</div>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="button button-primary w-full justify-center">Let’s talk<Icon name="diagonal" className="h-4 w-4" /></a>
          <p className="mt-6 text-[10px] tracking-wide text-muted">THOUGHTFUL CODE. REAL-WORLD IMPACT.</p>
        </div>
      </div>
    </aside>

    <main id="main" className="main-content">
      <section id="home" className="hero section-shell">
        <div className="flex items-center justify-between gap-5"><span className="intro-badge"><span className="location-dot" />BASED IN THE PHILIPPINES</span><span className="hidden sm:block text-[10px] tracking-[.16em] text-muted">PORTFOLIO / 2026</span></div>
        <div className="hero-grid">
          <div>
            <p className="mb-3 text-sm font-medium text-muted">Hello, I’m</p>
            <h1 className="text-[clamp(3.5rem,6.5vw,6rem)] leading-[1.04] font-extrabold tracking-[-0.075em]">Diether Besa<span className="text-accent">.</span></h1>
            <h2 className="mt-6 max-w-lg text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.4] font-semibold tracking-[-0.04em] text-accent">Software engineer.<br />Full-stack problem solver.</h2>
            <p className="mt-6 max-w-[470px] text-[15px] sm:text-base leading-[1.85] text-muted">I joined Ayahtek as an intern developer and was hired as a developer after my internship. I later became Lead Developer for the HR Management and Pet Booking systems, guiding intern developers on system structure and writing clean, maintainable code. I also contributed to the Music Booking Platform and Ticketing Management System, as well as Philippine government projects including the Police Pensioners Management System and Case Monitoring System.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#projects" className="button button-primary">View my work<Icon name="arrow" className="h-4 w-4" /></a><a href={profile.resume} download className="button button-secondary">Download CV<Icon name="download" className="h-4 w-4" /></a></div>
            <div className="mt-7"><SocialLinks /></div>
          </div>
          <div className="hero-art"><span className="art-coordinate coordinate-top" aria-hidden="true">IDEAS → CODE → IMPACT</span><div className="portrait-outline" aria-hidden="true" /><div className="portrait-card"><img src={profile.image} alt={profile.name} width="320" height="320" className="h-full w-full object-cover" /></div><div className="art-chip" aria-hidden="true"><Icon name="code" className="h-4 w-4" /><span>Built with purpose</span></div><span className="art-coordinate coordinate-bottom" aria-hidden="true">DEVELOPER, ALWAYS LEARNING.</span></div>
        </div>
        <div className="stats-grid">
          <div className="stat"><strong>02<span className="text-accent">.</span></strong><div><span>YEARS OF EXPERIENCE</span><p>Building full-stack applications</p></div></div>
          <div className="stat"><strong>07<span className="text-accent">.</span></strong><div><span>SELECTED PROJECTS</span><p>Practical problems, working solutions</p></div></div>
          <div className="stat"><Icon name="layers" className="h-8 w-8 text-accent" /><div><span>END-TO-END DEVELOPMENT</span><p>From interface to database</p></div></div>
        </div>
        <a href="#about" className="scroll-cue"><span className="scroll-mouse" />SCROLL TO EXPLORE<Icon name="down" className="h-3 w-3" /></a>
      </section>

      <section id="about" className="section-shell content-section">
        <SectionHeading eyebrow="01 / A LITTLE CONTEXT" title="The person behind the code." description="A practical mindset. A curiosity for how things work." />
        <div data-reveal className="mt-9 grid gap-8 xl:grid-cols-[1.25fr_1fr]">
          <div className="text-muted leading-[1.9] text-[15px]"><p>I’m Diether, a software engineer based in Caloocan City, Philippines. Over the past two years, I’ve built, maintained, and deployed web applications that help people manage their everyday work.</p><p className="mt-5">My experience spans HR systems, booking platforms, payments, and business tools. I enjoy connecting the pieces: a clear interface, a well-structured API, and a dependable database.</p><p className="mt-5">I’ve also led intern developers and use AI-assisted tools like Codex and GitHub Copilot for planning, writing code, and debugging.</p><a className="inline-link mt-6" href={profile.resume} download>More about my background<Icon name="diagonal" className="h-4 w-4" /></a></div>
          <div className="rounded-3xl border border-line bg-surface p-7 sm:p-8"><h3 className="eyebrow !text-muted">QUICK FACTS</h3><dl className="mt-6 space-y-5">{[['Name', profile.fullName], ['Based in', profile.location], ['Focus', 'Full-stack web development']].map(([label,value]) => <div key={label}><dt className="text-[10px] font-semibold uppercase tracking-[.14em] text-muted">{label}</dt><dd className="mt-1.5 text-sm font-medium">{value}</dd></div>)}<div><dt className="text-[10px] font-semibold uppercase tracking-[.14em] text-muted">Email</dt><dd className="mt-1.5"><a className="text-sm font-medium text-accent break-all hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a></dd></div></dl></div>
        </div>
        <GithubContributions />
      </section>

      <section id="skills" className="section-shell content-section">
        <SectionHeading eyebrow="02 / MY TOOLKIT" title="Skills & expertise." description="The tools I use to bring an application together, front to back." />
        <div className="mt-9 grid gap-4 sm:grid-cols-2">{skillGroups.map((group, index) => <article data-reveal key={group.title} className="skill-card rounded-3xl border border-line bg-surface p-7"><div className="flex items-center justify-between"><span className="skill-icon"><Icon name={['code','database','layers','spark'][index]} /></span><span className="text-[11px] text-muted/60">0{index+1}</span></div><h3 className="mt-5 text-lg font-bold tracking-[-.035em]">{group.title}</h3><p className="mt-2 min-h-11 text-sm leading-relaxed text-muted">{group.description}</p><div className="mt-5 flex flex-wrap gap-2">{group.skills.map(skill => <span key={skill} className="skill-tag">{skillLogos[skill] && <img src={skillLogos[skill]} alt="" width="24" height="24" className="skill-logo" loading="lazy" />}<span>{skill}</span></span>)}</div></article>)}</div>
      </section>

      <section id="experience" className="section-shell content-section">
        <SectionHeading eyebrow="03 / THE JOURNEY SO FAR" title="Work experience." description="Where I’ve worked, what I’ve built, and what I’ve learned." />
        <div className="mt-10">{experience.map((job,index) => <article data-reveal key={job.company} className="experience-row"><div className="experience-date"><span className={`timeline-dot ${index === 0 ? 'featured' : ''}`} /><p className="text-xs font-medium text-muted">{job.period}</p><p className="mt-3 text-sm font-semibold">{job.company}</p></div><div className="pb-10"><h3 className="text-xl font-bold tracking-[-.04em]">{job.role}</h3><p className="mt-3 text-sm leading-[1.85] text-muted">{job.description}</p>{job.highlights.length > 0 && <ul className="mt-4 space-y-2">{job.highlights.map(item => <li key={item} className="flex gap-3 text-sm leading-[1.8] text-muted"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />{item}</li>)}</ul>}</div></article>)}</div>
      </section>

      <section id="projects" className="section-shell content-section">
        <SectionHeading eyebrow="04 / FROM IDEA TO IMPLEMENTATION" title="Selected projects." description="A selection of the systems I’ve helped build. Different challenges, the same attention to detail." />
        <div id="project-list" className="mt-9 space-y-5">{projects.slice(0,showAll ? projects.length : 4).map((project,index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><p className="text-xs text-muted">{showAll ? projects.length : 4} of {projects.length} projects</p><button type="button" className="button button-secondary" aria-expanded={showAll} aria-controls="project-list" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show featured projects' : 'View all 7 projects'}<Icon name={showAll ? 'minus' : 'plus'} className="h-4 w-4" /></button></div>
      </section>

      <section id="education" className="section-shell content-section">
        <SectionHeading eyebrow="05 / ALWAYS LEARNING" title="A foundation to build on." />
        <div className="mt-9 grid gap-4 xl:grid-cols-[1.4fr_1fr]"><article data-reveal className="rounded-3xl border border-line bg-surface p-7 sm:p-8"><div className="flex items-center justify-between gap-3"><span className="skill-icon"><Icon name="book" /></span><span className="text-xs text-muted">{education.period}</span></div><p className="eyebrow mt-6 !text-[9px]">EDUCATION</p><h3 className="mt-3 text-xl font-bold tracking-[-.04em]">{education.degree}</h3><p className="mt-3 text-sm text-muted">{education.school}</p></article><article data-reveal className="rounded-3xl border border-accent/15 bg-lavender/40 p-7 sm:p-8"><div className="flex items-center justify-between"><span className="skill-icon !bg-surface/70"><Icon name="spark" /></span><span className="text-xs text-muted">{certification.year}</span></div><p className="eyebrow mt-6 !text-[9px]">CERTIFICATION</p><h3 className="mt-3 text-xl font-bold tracking-[-.04em]">{certification.title}</h3><p className="mt-3 text-sm text-muted">{certification.provider}</p></article></div>
      </section>

      <section id="contact" className="section-shell content-section contact-section">
        <SectionHeading eyebrow="06 / LET’S CONNECT" title="Good work starts with a hello." description="Have a project in mind, an opportunity, or just something to share? I’d love to hear from you." />
        <div data-reveal className="mt-10 grid gap-10 xl:grid-cols-[1fr_1.2fr]">
          <div><h3 className="text-xl font-bold tracking-[-.04em]">Let’s build something useful<span className="text-accent">.</span></h3><div className="mt-7 space-y-6">{[['mail','Email',profile.email,`mailto:${profile.email}`],['phone','Phone',profile.phone,profile.phoneHref],['pin','Location',profile.location,null]].map(([icon,label,value,href]) => <div key={label} className="flex items-center gap-4"><span className="icon-button shrink-0 !bg-surface"><Icon name={icon} /></span><div className="min-w-0"><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-muted">{label}</p>{href ? <a className="mt-1 block break-words text-sm hover:text-accent" href={href}>{value}</a> : <p className="mt-1 text-sm">{value}</p>}</div></div>)}</div><div className="mt-8"><SocialLinks labeled /></div></div>
          <form onSubmit={openDraft} className="rounded-3xl border border-line bg-surface p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="form-label">Your name<input name="name" required maxLength={100} autoComplete="name" placeholder="Alex Rivera" /></label><label className="form-label">Email address<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="alex@example.com" /></label></div><label className="form-label mt-5">What’s on your mind?<textarea name="message" required maxLength={3000} rows={5} placeholder="Tell me a little about your project or opportunity…" /></label><button type="submit" className="button button-primary mt-5 w-full justify-center">Let’s start a conversation<Icon name="diagonal" className="h-4 w-4" /></button><p className="mt-3 text-center text-[11px] leading-relaxed text-muted" role="status">{draftOpened ? 'Your email app was requested. Send the draft there, or use the email link.' : 'Opens a draft in your email app. Nothing is sent automatically.'}</p></form>
        </div>
      </section>
      <footer className="section-shell flex flex-wrap items-center justify-between gap-4 border-t border-line py-7"><p className="text-xs text-muted">© {new Date().getFullYear()} <span className="font-semibold text-ink">Diether Besa.</span></p><span className="text-[10px] text-muted">Thoughtfully built with React & Tailwind CSS</span><a className="inline-link !text-xs" href="#home">Back to top<Icon name="diagonal" className="h-3 w-3" /></a></footer>
    </main>
  </>
}
