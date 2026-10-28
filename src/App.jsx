import { useEffect, useRef, useState } from 'react'
import './App.css'
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
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#courses', label: 'Courses' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

const themeInfo = {
  violet: 'Violet',
  light: 'Light',
}

const themeOrder = ['violet', 'light']

const statusLabels = {
  'in-progress': 'In Progress',
  completed: 'Completed',
  'on-hold': 'On Hold',
}

function SectionHeading({ title, note }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {note ? <p className="section-note">{note}</p> : null}
    </div>
  )
}

function ProjectEntry({ project, index, onOpenDisclaimer }) {
  return (
    <article className={`project-entry project-entry-${(index % 2) + 1}`}>
      <figure className="project-image">
        {project.image?.src ? (
          <img
            src={project.image.src}
            alt={project.image.alt || `${project.title} screenshot`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ) : <div className="image-fallback">No preview available</div>}
      </figure>

      <div className="project-copy">
        <div className="project-heading">
          <p className="project-year">{project.year}</p>
          <h3>{project.title}</h3>
          {project.status && statusLabels[project.status] ? (
            <span className={`project-status status-${project.status}`}>{statusLabels[project.status]}</span>
          ) : null}
        </div>
        <p>{project.summary}</p>
        <p className="project-stack">{project.stack.join(' / ')}</p>
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
          {project.aiDisclaimer ? (
            <button type="button" className="text-button" onClick={() => onOpenDisclaimer(project)} aria-haspopup="dialog">
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
  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme')
    return themeOrder.includes(storedTheme) ? storedTheme : 'violet'
  })
  const [modalProject, setModalProject] = useState(null)

  const nextTheme = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length]
  const featuredProjects = projectHighlights.filter((project) => project.featured !== false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const updateHeaderOffset = () => {
      if (!headerRef.current) return
      document.documentElement.style.setProperty('--header-offset', `${headerRef.current.offsetHeight + 20}px`)
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
        event.preventDefault()
        setModalProject(null)
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

      <header ref={headerRef} className="top-bar">
        <a className="brand" href="#home" aria-label={`${profile.name} home`}>
          <span className="brand-mark" aria-hidden="true" />
          <span>{profile.name}</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {sectionLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>

        <div className="header-actions">
          <a className="resume-link" href={socialLinks.find((link) => link.label === 'Resume')?.url} target="_blank" rel="noreferrer">Résumé</a>
          <button type="button" className="theme-toggle" onClick={() => setTheme(nextTheme)} aria-label={`Switch to ${themeInfo[nextTheme]} theme, currently ${themeInfo[theme]}`}>
            <span className="theme-dot" aria-hidden="true" />
            <span>{themeInfo[theme]}</span>
          </button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="intro-section section-frame">
          <div className="intro-copy">
            <p className="eyebrow">{profile.headlineTag}</p>
            <h1>{profile.headline}</h1>
            <p className="intro-text">{profile.intro}</p>
            <div className="intro-links">
              <a className="primary-link" href="#projects">View projects</a>
              <a className="secondary-link" href={`mailto:${profile.email}`}>Email me</a>
            </div>
          </div>
          <aside className="intro-aside" aria-label="Profile details">
            <p>Based in</p>
            <strong>{profile.location}</strong>
            <p>Working across</p>
            <strong>Web, mobile, games, and teaching</strong>
          </aside>
        </section>

        <section id="about" className="content-section section-frame">
          <SectionHeading eyebrow="About" title="About" />
          <div className="about-layout">
            <p className="about-lede">{profile.about}</p>
            <div className="focus-list">
              {focusAreas.map((area) => (
                <article key={area.title} className="focus-item">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section section-frame">
          <SectionHeading eyebrow="Projects" title="Projects" note="A selection of software, games, and applications from my recent work." />
          <div className="project-list">
            {featuredProjects.map((project, index) => (
              <ProjectEntry key={project.title} project={project} index={index} onOpenDisclaimer={openDisclaimer} />
            ))}
          </div>
        </section>

        <section id="experience" className="content-section section-frame">
          <SectionHeading eyebrow="Experience" title="Experience" />
          <div className="experience-list">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="experience-item">
                <div className="experience-meta">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
                <div>
                  <p className="item-label">{item.company}</p>
                  <h3>{item.role}</h3>
                  <p>{item.summary}</p>
                  <ul>
                    {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <p className="experience-stack">{item.stack.join(' / ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="courses" className="content-section section-frame">
          <SectionHeading eyebrow="Courses" title="Courses" />
          <div className="course-list">
            {courses.map((course) => (
              <article key={course.title} className="course-item">
                <div>
                  <p className="item-label">{course.platform} / {course.year}</p>
                  <h3>{course.title}</h3>
                  <p>{course.summary}</p>
                  <p className="course-topics">{course.topics.join(' / ')}</p>
                </div>
                <a className="text-link" href={course.url} target="_blank" rel="noreferrer">View course</a>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section section-frame">
          <SectionHeading eyebrow="Skills" title="Skills" />
          <div className="skills-list">
            {skills.map((group) => (
              <div key={group.category} className="skill-row">
                <h3>{group.category}</h3>
                <p>{group.items.join(' / ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="content-section section-frame">
          <SectionHeading eyebrow="Education" title="Education" />
          <div className="education-list">
            {education.map((item) => (
              <article key={`${item.institution}-${item.program}`} className="education-item">
                <p className="education-period">{item.period}</p>
                <div>
                  <p className="item-label">{item.institution} / {item.location}</p>
                  <h3>{item.program}</h3>
                  <p>{item.details}</p>
                  <p className="course-topics">{item.coursework.join(' / ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section section-frame">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Contact</h2>
            <p>For work, collaboration, or a useful conversation about software.</p>
          </div>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {socialLinks.filter((link) => link.label !== 'Resume').map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
            ))}
          </div>
        </section>
      </main>

      {modalProject ? (
        <div className="modal-overlay" role="presentation" onClick={(event) => event.target === event.currentTarget && closeDisclaimer()}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
            <p className="eyebrow">Project note</p>
            <h2 id="modal-title">AI note: {modalProject.title}</h2>
            <p>{modalProject.aiDisclaimer}</p>
            <button type="button" className="primary-link button-link" onClick={closeDisclaimer}>Close note</button>
          </div>
        </div>
      ) : null}

      <footer>
        <span>{new Date().getFullYear()} / {profile.name}</span>
        <span>{profile.role}</span>
      </footer>
    </div>
  )
}

export default App
