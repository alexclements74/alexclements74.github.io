// Main app entry — renders the single-page portfolio.

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

// Section links for the header row
const sectionLinks = [
  {
    href: '#about',
    label: 'About',
  },
  {
    href: '#experience',
    label: 'Experience',
  },
  {
    href: '#projects',
    label: 'Projects',
  },
  {
    href: '#courses',
    label: 'Courses',
  },
  {
    href: '#skills',
    label: 'Skills',
  },
  {
    href: '#education',
    label: 'Education',
  },
  {
    href: '#contact',
    label: 'Contact',
  },
]

// Theme toggle info
const themeInfo = {
  cyber: {
    label: 'Cyber Mode',
    short: 'Cyber',
  },
  violet: {
    label: 'Violet Mode',
    short: 'Violet',
  },
}

function App() {
  // App-level refs/state:
  // - headerRef: measures header to offset anchor scrolling
  // - modalProject: which project has the AI disclaimer modal open
  // - modalRef: reference to the modal node for focus management
  // - lastFocusedRef: remember the element that opened the modal so we can return focus
  const headerRef = useRef(null)

  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme')

    if (storedTheme === 'cyber' || storedTheme === 'violet') {
      return storedTheme
    }

    return 'cyber'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const updateHeaderOffset = () => {
      if (!headerRef.current) {
        return
      }

      const computedTop = Number.parseFloat(
        window.getComputedStyle(headerRef.current).top,
      )
      const stickyTop = Number.isNaN(computedTop) ? 0 : computedTop
      const offset = Math.ceil(headerRef.current.offsetHeight + stickyTop + 14)

      document.documentElement.style.setProperty('--header-offset', `${offset}px`)
    }

    // We call this once and also observe size changes so the CSS variable

    updateHeaderOffset()

    let resizeObserver
    if (typeof window.ResizeObserver === 'function' && headerRef.current) {
      resizeObserver = new window.ResizeObserver(updateHeaderOffset)
      resizeObserver.observe(headerRef.current)
    }

    window.addEventListener('resize', updateHeaderOffset)

    return () => {
      window.removeEventListener('resize', updateHeaderOffset)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  // Figure out the other theme for the toggle label.
  const nextTheme = theme === 'cyber' ? 'violet' : 'cyber'

  // Toggle and persist theme.
  const switchTheme = () => {
    setTheme(nextTheme)
  }

  const [modalProject, setModalProject] = useState(null)
  const modalRef = useRef(null)
  const lastFocusedRef = useRef(null)

  const openDisclaimer = (project) => {
    lastFocusedRef.current = document.activeElement
    setModalProject(project)
  }

  const closeDisclaimer = () => {
    setModalProject(null)
    if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === 'function') {
      lastFocusedRef.current.focus()
    }
  }

  useEffect(() => {
    if (!modalProject) return

    const node = modalRef.current
    if (!node) return

    const focusableSelector =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusable = Array.from(node.querySelectorAll(focusableSelector))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDisclaimer()
      }
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)

    // focus first focusable element in dialog
    window.setTimeout(() => {
      if (first && typeof first.focus === 'function') first.focus()
    }, 0)

    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [modalProject])

  // Pick the first four featured projects to show on the homepage.
  const featuredProjects = projectHighlights
    .filter((project) => project.featured !== false)
    .slice(0, 4)


  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="ambient-layer" aria-hidden="true" />

      <header ref={headerRef} className="top-bar">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true" />
          {profile.name}
        </a>

        <nav className="nav-links" aria-label="Primary">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <button type="button" className="theme-toggle" onClick={switchTheme}>
          <span>{themeInfo[theme].label}</span>
          <small>Switch to {themeInfo[nextTheme].short}</small>
        </button>
      </header>

      <main id="main">
        {/* Hero / Intro section */}
        <section id="home" className="section hero-section">
          <p className="kicker">{profile.headlineTag}</p>
          <h1>{profile.headline}</h1>
          <p className="lede">{profile.intro}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              Contact Me
            </a>
          </div>

          <div className="stats-grid">
            {profile.quickFacts.map((item) => (
              <article key={item.label} className="stat-card">
                <h2>{item.value}</h2>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        {/* About section */}
        <section id="about" className="section">
          <div className="section-header">
            <p className="kicker">About</p>
            <h2>
              Developing with a mix of visual taste and practical
              engineering.
            </h2>
          </div>

          <p className="about-copy">{profile.about}</p>

          <div className="focus-grid">
            {focusAreas.map((area) => (
              <article key={area.title} className="focus-card">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Experience section */}
        <section id="experience" className="section">
          <div className="section-header">
            <p className="kicker">Experience</p>
            <h2>Specific roles and measurable outcomes</h2>
          </div>

          <div className="experience-grid">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="experience-card">
                <div className="card-title-row">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="card-subtitle">
                      {item.company} • {item.location}
                    </p>
                  </div>
                  <span>{item.period}</span>
                </div>

                <p>{item.summary}</p>

                <ul className="bullet-list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <ul className="tag-list">
                  {item.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Projects (featured) */}
        <section id="projects" className="section">
          <div className="section-header">
            <p className="kicker">Projects</p>
            <h2>Examples of featured work</h2>
            <p className="section-note">
              This homepage highlights four featured projects.
              You can view additional projects on my<b> <a href="https://github.com/alexclements74" target="_blank" rel="noreferrer">GitHub profile</a></b>.
            </p>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article key={project.title} className="project-card">
                {project.image?.src ? (
                  <figure className="project-image">
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      loading="lazy"
                    />
                  </figure>
                ) : null}

                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span>{project.year}</span>
                </div>

                <p>{project.summary}</p>
                <p className="impact">{project.impact}</p>

                <ul className="tag-list">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${link.label} - ${project.title}`}
                    >
                      {link.label}
                    </a>
                  ))}

                  {project.aiDisclaimer ? (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => openDisclaimer(project)}
                      aria-haspopup="dialog"
                    >
                      AI Disclaimer
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Courses (published) */}
        <section id="courses" className="section">
          <div className="section-header">
            <p className="kicker">Courses</p>
            <h2>Published Udemy courses</h2>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <article key={course.title} className="course-card">
                <div className="card-title-row">
                  <div>
                    <h3>{course.title}</h3>
                    <p className="card-subtitle">{course.platform}</p>
                  </div>
                  <span>{course.year}</span>
                </div>

                <p>{course.summary}</p>

                {course.stats ? <p className="course-stats">{course.stats}</p> : null}

                <ul className="tag-list">
                  {course.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>

                <div className="project-links">
                  <a href={course.url} target="_blank" rel="noreferrer">
                    View Course
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills (recruiter-friendly groups) */}
        <section id="skills" className="section">
          <div className="section-header">
            <p className="kicker">Skills</p>
            <h2>Various technologies and methodologies</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skillGroup) => (
              <article key={skillGroup.category} className="skill-card">
                <h3>{skillGroup.category}</h3>
                <ul className="tag-list">
                  {skillGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="section">
          <div className="section-header">
            <p className="kicker">Education</p>
            <h2>Formal learning</h2>
          </div>

          <div className="education-grid">
            {education.map((item) => (
              <article
                key={`${item.institution}-${item.program}`}
                className="education-card"
              >
                <div className="card-title-row">
                  <div>
                    <h3>{item.program}</h3>
                    <p className="card-subtitle">
                      {item.institution} • {item.location}
                    </p>
                  </div>
                  <span>{item.period}</span>
                </div>

                <p>{item.details}</p>

                <ul className="tag-list">
                  {item.coursework.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Contact / Social links */}
        <section id="contact" className="section contact-section">
          <p className="kicker">Contact</p>
          <h2>Have something in mind or looking to hire? Let&apos;s talk!</h2>
          <p>
            Reach me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>

          <div className="social-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      {modalProject ? (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDisclaimer()
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
          >
            <h3 id="modal-title">AI Disclaimer — {modalProject.title}</h3>
            <div className="modal-body">
              <p>{modalProject.aiDisclaimer}</p>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={closeDisclaimer}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <footer>
        <p>
          {new Date().getFullYear()} • {profile.name} • {profile.role} •{' '}
          {profile.location}
        </p>
      </footer>
    </div>
  )
}

export default App
