import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  BookOpen,
  ListChecks,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'

const release = {
  title: 'Torren 1.1',
}

const workflowSteps = [
  {
    title: 'Scan',
    description:
      'Torren checks what is running and separates Windows components from optional background apps.',
    icon: Search,
  },
  {
    title: 'Explain',
    description:
      'Each item gets a plain-English purpose, publisher, and resource summary.',
    icon: BookOpen,
  },
  {
    title: 'Choose',
    description:
      'You decide what stays open, what can close, and what Torren should always leave alone.',
    icon: ListChecks,
  },
  {
    title: 'Apply',
    description:
      'Torren carries out only your approved choices and leaves protected processes untouched.',
    icon: ShieldCheck,
  },
]

const questions = [
  {
    question: 'What is Torren?',
    answer:
      'Torren is a planned Windows desktop app that explains running processes in plain language and helps you review unnecessary background applications.',
  },
  {
    question: 'Will Torren close Windows processes?',
    answer:
      'Torren is being designed to protect known Windows components and pause when a process cannot be classified confidently. You remain in control of approved actions.',
  },
  {
    question: 'Is this a RAM cleaner or FPS booster?',
    answer:
      'No. Torren will not make inflated performance promises. Its purpose is clarity, conservative recommendations, and easier control over background software.',
  },
  {
    question: 'Does Torren collect my data?',
    answer:
      'Torren is being designed to analyze processes locally on your computer. It will not upload your process information or personal data without your knowledge.',
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="logo" href="#top" aria-label="Torren home">
        Torren
      </a>
      <div className="header-actions">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#release">Release</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-cta-wrap">
          <a className="header-cta" href="#release">
            <span className="header-cta-label">Try Torren</span>
            <span className="header-cta-icon">
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-controls="mobile-navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <div
        className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <a href="#product" onClick={closeMenu}>Product</a>
          <a href="#release" onClick={closeMenu}>Release</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a className="mobile-cta" href="#release" onClick={closeMenu}>
            Try Torren <ArrowRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-main">
        <div className="hero-title">
          <h1 aria-label="Know what’s running. Keep what matters.">
            <span className="hero-line">
              <span>Know what’s running.</span>
            </span>
            <span className="hero-line hero-line--second">
              <span>Keep what matters.</span>
            </span>
          </h1>
        </div>

        <div className="hero-lower">
          <p>
            See what is running in the background, understand what each process
            does, and safely close the apps you do not need.
          </p>
        </div>
      </div>
    </section>
  )
}

function ProcessRibbon() {
  return (
    <div className="process-ribbon" aria-hidden="true">
      <span className="ribbon-status">System activity</span>
      <div className="ribbon-window">
        <div className="ribbon-track">
          {[0, 1].map((group) => (
            <div className="ribbon-group" key={group}>
              <span className="process--keep">explorer.exe</span>
              <span className="process--choice">OneDrive.exe</span>
              <span className="process--review">AdobeUpdateService.exe</span>
              <span className="process--review">EpicGamesLauncher.exe</span>
              <span className="process--keep">BackgroundTaskHost.exe</span>
              <span className="process--choice">Discord.exe</span>
              <span className="process--review">Wallpaper32.exe</span>
              <span className="process--keep">SecurityHealthSystray.exe</span>
              <span className="process--choice">chrome.exe</span>
              <span className="process--keep">NVIDIA Container</span>
            </div>
          ))}
        </div>
      </div>
      <span className="ribbon-count">200+ can appear after startup</span>
    </div>
  )
}

function ProductPanel() {
  const stageRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const activityBars = [
    [78, 0.58], [48, 0.36], [88, 0.7], [64, 0.48], [40, 0.18],
    [72, 0.62], [54, 0.42], [92, 0.72], [68, 0.54], [46, 0.24],
    [82, 0.66], [58, 0.4], [74, 0.56], [50, 0.32], [86, 0.68],
    [62, 0.46], [44, 0.2], [70, 0.52],
  ]

  useEffect(() => {
    let frame = 0
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      frame = requestAnimationFrame(() => setProgress(1))
      return () => cancelAnimationFrame(frame)
    }

    const update = () => {
      const stage = stageRef.current
      if (!stage) return
      const stageTop = stage.getBoundingClientRect().top + window.scrollY
      const start = Math.max(0, stageTop - window.innerHeight * 0.62)
      const travel = Math.min(520, Math.max(340, stage.offsetHeight * 0.72))
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / travel))
      setProgress(next)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const panelStyle = { '--cpu-progress': progress } as CSSProperties
  const cpuUsage = Math.round(28 - progress * 19)

  return (
    <section className="product-stage" id="product" ref={stageRef}>
      <div className="product-panel" style={panelStyle}>
        <ProcessRibbon />

        <div className="panel-copy">
          <h2>Improve CPU headroom.</h2>
        </div>

        <div className="cpu-visual" aria-label={`Illustrative CPU usage at ${cpuUsage} percent`}>
          <div className="cpu-reading">
            <span>CPU usage</span>
            <strong>{cpuUsage}%</strong>
          </div>

          <div className="cpu-chart" aria-hidden="true">
            <div className="cpu-bars">
              {activityBars.map(([height, drop], index) => (
                <i
                  key={index}
                  style={{
                    height: `${height}%`,
                    transform: `scaleY(${1 - progress * drop})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReleaseAndFaq() {
  const [activeStage, setActiveStage] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const activeStep = workflowSteps[activeStage]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const timer = window.setTimeout(() => {
      setActiveStage((current) => (current + 1) % workflowSteps.length)
    }, 10000)

    return () => window.clearTimeout(timer)
  }, [activeStage, cycleKey])

  const chooseStage = (index: number) => {
    setActiveStage(index)
    setCycleKey((current) => current + 1)
  }

  return (
    <section className="release-section" id="release">
      <div className="workflow">
        <div className="workflow-heading">
          <h2>How Torren works</h2>
        </div>

        <div className="workflow-showcase">
          <ol className="workflow-list" aria-label="How Torren works">
            {workflowSteps.map(({ title, icon: Icon }, index) => (
              <li
                className={index === activeStage ? 'is-active' : ''}
                key={title}
              >
                <button
                  type="button"
                  aria-pressed={index === activeStage}
                  onClick={() => chooseStage(index)}
                >
                  <span className="workflow-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="workflow-step-label">
                    <strong>{title}</strong>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div
            className="stage-panel"
            key={`${activeStage}-${cycleKey}`}
            aria-label={`${activeStep.title}: ${activeStep.description}`}
          >
            <div className="stage-panel-copy">
              <h3>{activeStep.title}</h3>
              <p>{activeStep.description}</p>
            </div>

            <div
              className={`stage-motion stage-motion--${activeStep.title.toLowerCase()}`}
              aria-hidden="true"
            >
              {activeStage === 0 && (
                <div className="motion-scan">
                  <span className="scan-beam" />
                  {Array.from({ length: 7 }, (_, index) => (
                    <i key={index} />
                  ))}
                </div>
              )}

              {activeStage === 1 && (
                <div className="motion-explain">
                  <div className="explain-technical">
                    <span>AdobeUpdateService.exe</span>
                    <span>EpicGamesLauncher.exe</span>
                    <span>BackgroundTaskHost.exe</span>
                  </div>
                  <span className="explain-switch">
                    <ArrowRight />
                  </span>
                  <div className="explain-clear">
                    <span>Background updater</span>
                    <span>Game launcher</span>
                    <span>Windows service</span>
                  </div>
                </div>
              )}

              {activeStage === 2 && (
                <div className="motion-choose">
                  <div>
                    {Array.from({ length: 12 }, (_, index) => (
                      <i key={index} />
                    ))}
                  </div>
                  <span />
                </div>
              )}

              {activeStage === 3 && (
                <div className="motion-apply">
                  <span className="apply-core">
                    <ShieldCheck />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="release-separator" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <article className="release-card">
        <div className="release-copy">
          <h3>{release.title}</h3>
        </div>

        <div className="release-meta">
          <div>
            <span>Released</span>
            <strong>July 18, 2026</strong>
          </div>
          <div>
            <span>Runs on</span>
            <strong>Windows 10 / 11</strong>
          </div>
        </div>

        <button className="release-download" type="button">
          <span>Download</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </article>

      <div className="faq" id="faq">
        <div className="faq-heading">
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                <strong>{item.question}</strong>
                <Plus aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="footer-logo" href="#top">Torren</a>
        <nav aria-label="Footer navigation">
          <a href="#product">Product</a>
          <a href="#release">Release</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Torren</span>
        <span>Understand first. Act second.</span>
        <span>Built for Windows</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductPanel />
        <ReleaseAndFaq />
      </main>
      <Footer />
    </>
  )
}
