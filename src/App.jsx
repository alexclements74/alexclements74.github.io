import { useEffect, useRef, useState } from 'react'
import './App.css'
import ProjectAtlas from './components/ProjectAtlas'
import {
  courses,
  education,
  experience,
  focusAreas,
  profile,
  projectHighlights,
  skills,
  socialLinks,
} from './data/portfolioData'

const sectionLinks = [
  { href: '#atlas', label: 'Project Map' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="section-heading">
      <span className="kicker">{eyebrow}</span>
      <h2>{title}</h2>
      {note ? <p className="section-note">{note}</p> : null}
    </div>
  )
}

function Header() {
  const resumeUrl = socialLinks.find((link) => link.label === 'Resume')?.url

  return (
    <header className="top-bar">
      <a className="brand" href="#home" aria-label={`${profile.name} home`}>
        <span className="brand-mark" aria-hidden="true" />
        <span>{profile.name}</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {sectionLinks.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <a className="header-resume" href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>
    </header>
  )
}

function ProjectPreview({ project }) {
  const primaryLink = project.links[0]

  return (
    <aside className="atlas-preview" aria-live="polite">
      {project.image?.src ? (
        <div className="preview-image-wrap">
          <img src={project.image.src} alt={project.image.alt || `${project.title} project screenshot`} />
        </div>
      ) : <div className="preview-no-image">No project image available.</div>}
      <p className="preview-index">{project.year}</p>
      <h3>{project.title}</h3>
      <p className="preview-summary">{project.summary}</p>
      {project.impact ? <p className="preview-impact">{project.impact}</p> : null}
      <ul className="tag-list" aria-label={`${project.title} technologies`}>
        {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
      </ul>
      <a className="text-link" href={primaryLink.url} target="_blank" rel="noreferrer">
        {primaryLink.label} <span aria-hidden="true">-&gt;</span>
      </a>
    </aside>
  )
}

function ProjectShowcase({ project, index, onOpenDisclaimer }) {
  return (
    <article className={`showcase showcase-${index + 1}`}>
      <div className="showcase-image-wrap">
        <img
          src={project.image?.src}
          alt={project.image?.alt || `${project.title} project screenshot`}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
      <div className="showcase-copy">
        <div className="showcase-heading">
          <span className="project-year">{project.year}</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label} <span aria-hidden="true">-&gt;</span>
            </a>
          ))}
          {project.aiDisclaimer ? (
            <button type="button" className="inline-button" onClick={() => onOpenDisclaimer(project)}>
              AI note
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function App() {
  const headerRef = useRef(null)
  const modalRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [modalProject, setModalProject] = useState(null)

  const featuredProjects = projectHighlights
    .filter((project) => project.featured !== false)
  const safeSelectedProjectIndex = Math.min(selectedProjectIndex, Math.max(featuredProjects.length - 1, 0))
  const selectedProject = featuredProjects[safeSelectedProjectIndex]

  useEffect(() => {
    const updateHeaderOffset = () => {
      if (!headerRef.current) return
      document.documentElement.style.setProperty('--header-offset', `${headerRef.current.offsetHeight + 24}px`)
    }

    updateHeaderOffset()
    const observer = typeof ResizeObserver === 'function' && headerRef.current
      ? new ResizeObserver(updateHeaderOffset)
      : null
    if (observer) observer.observe(headerRef.current)
    window.addEventListener('resize', updateHeaderOffset)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateHeaderOffset)
    }
  }, [])

  useEffect(() => {
    if (!modalProject) return undefined
    const node = modalRef.current
    const focusable = node ? Array.from(node.querySelectorAll('button, a[href]')) : []

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setModalProject(null)
        return
      }
      if (event.key === 'Tab' && focusable.length > 0) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    window.setTimeout(() => focusable[0]?.focus(), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [modalProject])

  const openDisclaimer = (project) => {
    lastFocusedRef.current = document.activeElement
    setModalProject(project)
  }

  const closeDisclaimer = () => {
    setModalProject(null)
    lastFocusedRef.current?.focus?.()
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to main content</a>

      <div ref={headerRef} className="header-wrap">
        <Header />
      </div>

      <main id="main">
        <section id="home" className="hero section-frame">
          <div className="hero-copy">
            <p className="atlas-label">Full-stack developer / Ottawa</p>
            <h1>Alex Clements.<br /><span>Software Developer.</span></h1>
            <p className="hero-lede">I build a variety of digital experiences that help people learn, work, and play.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#atlas">View projects <span aria-hidden="true">-&gt;</span></a>
              <a className="button button-secondary" href="#about">About me</a>
            </div>
            <div className="hero-facts" aria-label="Quick facts">
              {profile.quickFacts.map((fact) => (
                <div key={fact.label} className="hero-fact">
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="atlas" className="atlas-section section-frame">
          <SectionHeading eyebrow="Project Atlas" title="Things I've built." note="Choose a project to see what it does, how it was made, and where to find it." />
          <div className="atlas-layout">
            <ProjectAtlas projects={featuredProjects} selectedIndex={safeSelectedProjectIndex} onSelect={setSelectedProjectIndex} />
            <ProjectPreview project={selectedProject} />
          </div>
        </section>

        <section id="about" className="notes-section section-frame">
          <SectionHeading eyebrow="About" title="Helping people through software." />
          <div className="notes-layout">
            <p className="notes-lede">{profile.about}</p>
            <div className="focus-grid">
              {focusAreas.map((area, index) => (
                <article key={area.title} className="focus-note">
                  <span className="note-number">0{index + 1}</span>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="log-section section-frame">
          <SectionHeading eyebrow="Experience" title="Where I have worked." />
          <div className="experience-list">
            {experience.map((item, index) => (
              <article key={`${item.company}-${item.role}`} className="log-entry">
                <div className="log-index">0{index + 1}</div>
                <div className="log-period">{item.period}</div>
                <div className="log-content">
                  <p className="log-company">{item.company} / {item.location}</p>
                  <h3>{item.role}</h3>
                  <p>{item.summary}</p>
                  <ul className="bullet-list">
                    {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <ul className="tag-list">
                    {item.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work-section section-frame">
          <SectionHeading eyebrow="More detail" title="A closer look at the work." note="A few projects, with the context that is available today." />
          <div className="showcase-list">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <ProjectShowcase key={project.title} project={project} index={index} onOpenDisclaimer={openDisclaimer} />
            ))}
          </div>
        </section>

        <section className="learning-section section-frame">
          <SectionHeading eyebrow="Skills and courses" title="What I work with and teach." />
          <div className="learning-layout">
            <div className="skills-groups">
              {skills.map((group) => (
                <div key={group.category} className="skill-group">
                  <h3>{group.category}</h3>
                  <p>{group.items.join(' / ')}</p>
                </div>
              ))}
            </div>
            <div className="course-list">
              {courses.map((course) => (
                <article key={course.title} className="course-entry">
                  <div>
                    <span className="course-platform">{course.platform} / {course.year}</span>
                    <h3>{course.title}</h3>
                    <p>{course.summary}</p>
                  </div>
                  <a className="text-link" href={course.url} target="_blank" rel="noreferrer">View course -&gt;</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="education-section section-frame">
          <SectionHeading eyebrow="Education" title="Education." />
          <div className="education-list">
            {education.map((item) => (
              <article key={`${item.institution}-${item.program}`} className="education-entry">
                <span>{item.period}</span>
                <div>
                  <p className="log-company">{item.institution} / {item.location}</p>
                  <h3>{item.program}</h3>
                  <p>{item.details}</p>
                </div>
                <ul className="tag-list">
                  {item.coursework.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section section-frame">
          <div>
            <p className="atlas-label">Contact</p>
            <h2>Have something in mind?<br /><span>Let's talk.</span></h2>
            <p>Reach me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
          </div>
          <div className="contact-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                <span>{link.label}</span><span aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {modalProject ? (
        <div className="modal-overlay" role="presentation" onClick={(event) => event.target === event.currentTarget && closeDisclaimer()}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
            <p className="atlas-label">FIELD NOTE / CONTENT CONTEXT</p>
            <h3 id="modal-title">AI note: {modalProject.title}</h3>
            <p>{modalProject.aiDisclaimer}</p>
            <button type="button" className="button button-primary" onClick={closeDisclaimer}>Close note</button>
          </div>
        </div>
      ) : null}

      <footer>
        <span>{new Date().getFullYear()} / {profile.name}</span>
        <span>Built with React, Vite, and CSS.</span>
      </footer>
    </div>
  )
}

export default App
