import { useState, useEffect } from 'react'
import './App.css'
import projectImage from './assets/project-placeholder.svg'
import headerBg from './assets/header-bg.svg'
import headerBgDark from './assets/header-bg-dark.svg'
import AOS from 'aos'

// Technology icons mapping function
const getTechIcon = (tech) => {
  switch(tech.toLowerCase()) {
    case 'haskell':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M0 0l12 12L0 24h9l12-12L9 0H0z"/>
          <path d="M13.5 0L9 6h5l4.5-6h-5zM9 12l4.5 6h5L14 12H9z"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      );
    case 'c#':
    case 'csharp':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm0 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm4.75 10c0 1.38-.56 2.62-1.47 3.53a4.994 4.994 0 0 1-7.06 0 4.994 4.994 0 0 1 0-7.06 4.994 4.994 0 0 1 7.06 0A4.998 4.998 0 0 1 16.75 12zm-9-2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1.5 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1.5 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1.5 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
        </svg>
      );
    case 'unity':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M19.9 19.2L15.6 12l4.3-7.2L22 12l-2.1 7.2zm-9.5-.7L5.1 12l5.2-6.5L13 12l-2.6 6.5zm5-12.5L12.9 0h-6zm-7.2 18l2.9 5.1 5.8-1.1.3-6.5z"/>
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 0C5.9 0 6.215 2.667 6.215 2.667l.01 2.766h5.855v.833H3.855S0 5.927 0 12.001c0 6.075 3.37 5.851 3.37 5.851h2.01v-2.816s-.108-3.369 3.31-3.369h5.693s3.2.056 3.2-3.094V3.717S18.163 0 12 0zm-3.333 1.515c.582 0 1.054.472 1.054 1.054s-.472 1.054-1.054 1.054c-.582 0-1.054-.472-1.054-1.054.001-.582.472-1.054 1.054-1.054z"/>
          <path d="M12 24c6.1 0 5.785-2.667 5.785-2.667l-.01-2.766h-5.855v-.833h8.225S24 18.074 24 12.001c0-6.075-3.37-5.851-3.37-5.851h-2.01v2.816s.108 3.369-3.31 3.369H9.617s-3.2-.056-3.2 3.094v4.856S5.836 24 12 24zm3.333-1.515c-.582 0-.619.365-.619.816 0 .451.212.817.618.817.405 0 .619-.366.619-.817 0-.451-.214-.816-.619-.816zm-7.264 0v-1.68l-.576.096-.17-.584 1.159-.313v2.48h-.413z"/>
        </svg>
      );
    case 'go':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 12.714V3.429L.286 12 12 20.571v-9.286L24 20.571 12 3.429v9.285z"/>
        </svg>
      );
    case 'c++':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M10.465 12a2.53 2.53 0 1 1-5.06 0 2.53 2.53 0 0 1 5.06 0zM13.5 8.5h1v1h-1v1h1v1h-1v1h2v-5h-2v1zm3 0h1v1h-1v1h1v1h-1v1h2v-5h-2v1z"/>
          <path d="M22.097 12l-2.475-4.289c-.293-.507-.59-.996-.885-1.553-.296.557-.593 1.046-.886 1.553L15.376 12l2.475 4.289c.293.507.59.996.885 1.553.296-.557.593-1.046.886-1.553L22.097 12z"/>
          <path d="M15.375 12l-2.475-4.289c-.293-.507-.59-.996-.885-1.553-.296.557-.593 1.046-.886 1.553L8.654 12l2.475 4.289c.293.507.59.996.885 1.553.296-.557.593-1.046.886-1.553L15.375 12z"/>
          <path d="M8.654 12l-2.475-4.289c-.293-.507-.59-.996-.885-1.553-.296.557-.593 1.046-.886 1.553L1.933 12l2.475 4.289c.293.507.59.996.885 1.553.296-.557.593-1.046.886-1.553L8.654 12z"/>
        </svg>
      );
    case 'scala':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M4.589 24c4.537 0 13.81-1.516 14.821-3v-5.729c-.957 1.408-10.284 2.912-14.821 2.912V24" />
          <path d="M4.589 14.898c4.537 0 13.81-1.516 14.821-3V6.141c-.957 1.408-10.284 2.912-14.821 2.912v5.845" />
          <path d="M4.589 5.767c4.537 0 13.81-1.516 14.821-3V0c-.957 1.408-10.284 2.912-14.821 2.912v2.855" />
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M16.405 5.676c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.87h-.927c-.03-1.562-.063-3.03-.063-4.59h-.01l-1.38 4.59h-.7l-1.36-4.59h-.01c0 1.395-.02 2.863-.04 4.59h-.86C.460 15.402.49 11.96.53 8.799h1.15l1.31 4.142h.01L4.3 8.798h1.13c.05 2.874.097 6.316.34 10.072zM10.388 18.87c-.407-1.202-.663-2.462-.926-3.677-.145.636-.325 1.272-.536 1.89-.193.636-.42 1.272-.63 1.787h-1.13c-.28-1.92-.537-3.524-.807-5.25.3-1.727.4-3.613.503-5.593h1.078c.106 2.473.206 4.42.29 5.83.243-.908.456-1.908.663-3 .19-1.09.372-2.08.562-2.93h.98c.145.77.3 1.727.434 2.87.136 1.145.27 2.244.417 3.313.08-2.627.175-4.472.28-5.986h1.027c.04 1.846.195 3.755.366 5.694.188 1.94.388 3.63.624 5.054h-1.046zm5.01-10.072c.64 0 1.17.134 1.59.398.416.254.83.687 1.237 1.272.406.585.69 1.25.835 2.006.142.746.216 1.613.216 2.642v.38h-4.638c0 .89.194 1.656.583 2.336.388.67 1.157 1.006 2.308 1.006.754 0 1.642-.107 2.66-.333v.944c-.84.34-1.89.508-3.168.508-1.34 0-2.344-.43-3.03-1.297-.684-.86-1.025-2.188-1.025-3.982 0-1.073.204-1.998.606-2.787.4-.78.93-1.39 1.585-1.803.654-.417 1.387-.626 2.19-.626zm-2.453 3.964h3.527c0-.2-.037-.443-.072-.69-.074-.57-.24-1.043-.5-1.424-.26-.375-.596-.563-1.032-.563-.435 0-.835.178-1.188.55-.348.373-.555.88-.613 1.518-.02.3-.023.436-.033.61zm8.99 1.34c0 .656.076 1.203.23 1.652.15.44.336.794.563 1.05.225.254.488.446.784.563.298.12.598.18.913.18.165 0 .35-.02.574-.06.224-.04.35-.06.38-.06v-6.31c-.196-.067-.457-.123-.778-.18-.32-.05-.598-.073-.84-.073-.784 0-1.347.33-1.693 1.004-.34.672-.51 1.493-.51 2.454zm5.347 4.77v-9.662h.997v1.09c.26-.403.575-.726.944-.962.37-.245.795-.37 1.28-.37.815 0 1.547.328 2.255.98.703.654 1.065 1.777 1.065 3.34 0 .87-.11 1.61-.336 2.226-.226.62-.518 1.102-.888 1.462-.37.352-.77.612-1.218.778-.445.166-.87.25-1.284.25-.255 0-.527-.03-.8-.088-.27-.055-.552-.156-.845-.3v3.544h-1.168v-2.29zM23.922 13.5c0-.85-.128-1.553-.388-2.13-.26-.575-.737-.862-1.433-.862-.545 0-.994.205-1.35.61-.354.404-.61.903-.77 1.497v3.924c.187.05.394.074.625.074.87 0 1.508-.352 1.908-1.05.4-.706.598-1.54.598-2.497v-.436l.01-.126z" />
        </svg>
      );
    case 'ejs':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M2.6 11.13l.848 4.82 3.991-4.82z"/>
          <path d="M17.5 1.9l-6.5 15.68L12.49 23l9.1-21.1z"/>
          <path d="M4.89 1H2.6l11.8 21.57 1.4-3.57z"/>
        </svg>
      );
    case 'bash scripts':
    case 'bash':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M3 1.875v20.25A.375.375 0 0 0 3.375 22.5h17.25a.375.375 0 0 0 .375-.375V1.875A.375.375 0 0 0 20.625 1.5H3.375A.375.375 0 0 0 3 1.875zm8.058 4.56l2.432.809.8 2.432 2.213-1.28-.8-2.432 2.432-.809-1.28-2.212-2.432.809-.809-2.432-2.212 1.28.809 2.432-2.432.809zm-5.803 8.037c.083-.209.313-.328.584-.328.708 0 1.184.576 1.184 1.439 0 .864-.476 1.439-1.184 1.439-.271 0-.5-.119-.584-.328v.246h-.672v-3.858h.672zm.618.295c-.406 0-.618.365-.618.816 0 .451.212.817.618.817.405 0 .619-.366.619-.817 0-.451-.214-.816-.619-.816zm1.796-.295h.672v3.858h-.672zm2.407-.328c.083-.209.312-.328.583-.328.708 0 1.184.576 1.184 1.439 0 .864-.476 1.439-1.184 1.439-.271 0-.5-.119-.583-.328v.246h-.673v-3.858h.673zm.618.295c-.407 0-.619.365-.619.816 0 .451.212.817.619.817.404 0 .618-.366.618-.817 0-.451-.214-.816-.618-.816zm-7.264 0v-1.68l-.576.096-.17-.584 1.159-.313v2.48h-.413z"/>
        </svg>
      );
    case 'happy':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 13a4 4 0 008 0h-8z"/>
          <circle cx="8.5" cy="9.5" r="1.5"/>
          <circle cx="15.5" cy="9.5" r="1.5"/>
        </svg>
      );
    case 'alex':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 2l9 4v12l-9 4-9-4V6z"/>
          <path d="M12 5l6 2.5v9L12 19l-6-2.5v-9z" fill="none"/>
          <circle cx="7.5" cy="9" r="1.5"/>
          <circle cx="16.5" cy="9" r="1.5"/>
          <path d="M12 14l-1.5 1 1.5 1 1.5-1z"/>
        </svg>
      );
    case 'tor':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 1c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm3.5 4L12 10.5 8.5 7 6 9.5 9.5 13 6 16.5 8.5 19l3.5-3.5 3.5 3.5 2.5-2.5-3.5-3.5 3.5-3.5-2.5-2.5z"/>
        </svg>
      );
    case 'vpn':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
          <path d="M17 9h-3.5v6H15v-2h2c1.103 0 2-.897 2-2s-.897-2-2-2zm0 3h-1.5v-2H17c.275 0 .5.225.5.5s-.225.5-.5.5z"/>
          <path d="M11 9H7v1.5h1.5v4.5H10v-4.5h1z"/>
          <path d="M7 13.5h3V15H7z"/>
        </svg>
      );
    case 'pixelmator pro':
    case 'pixelmator':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"/>
        </svg>
      );
    case 'metals':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.311L19.669 8 12 12.389 4.331 8 12 4.311zM4 9.831l7 4.098v6.24l-7-3.5V9.83zm16 0v6.838l-7 3.5v-6.24l7-4.098z"/>
        </svg>
      );
    case 'kahli linux vm':
    case 'kali linux vm':
    case 'kali linux':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 1c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm3.5 4L12 10.5 8.5 7 6 9.5 9.5 13 6 16.5 8.5 19l3.5-3.5 3.5 3.5 2.5-2.5-3.5-3.5 3.5-3.5-2.5-2.5z"/>
        </svg>
      );
    case 'multiple languages':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
    default:
      return null;
  }
};

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState(false)

  // Handle section changes with smooth scrolling
  const changeSection = (section) => {
    setActiveSection(section)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    // Refresh AOS animations when changing sections
    setTimeout(() => {
      AOS.refresh()
    }, 200)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Initialize AOS when component mounts or section changes
  useEffect(() => {
    AOS.refresh();
  }, [activeSection]);

  // Add or remove dark-mode class on the document body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Check for user's system preference for dark mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDarkMode)
  }, [])

  return (
    <div className="portfolio">
      <header>
        <h1>William Welden</h1>
        <nav>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <button onClick={() => changeSection('home')}>Home</button>
            </li>
            <li className={activeSection === 'projects' ? 'active' : ''}>
              <button onClick={() => changeSection('projects')}>Projects</button>
            </li>
            <li className={activeSection === 'skills' ? 'active' : ''}>
              <button onClick={() => changeSection('skills')}>Skills</button>
            </li>
            <li className={activeSection === 'experience' ? 'active' : ''}>
              <button onClick={() => changeSection('experience')}>Experience</button>
            </li>
            <li className={activeSection === 'education' ? 'active' : ''}>
              <button onClick={() => changeSection('education')}>Education</button>
            </li>
            <li className={activeSection === 'contact' ? 'active' : ''}>
              <button onClick={() => changeSection('contact')}>Contact</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {activeSection === 'home' && <Home changeSection={changeSection} darkMode={darkMode} />}
        {activeSection === 'projects' && <Projects />}
        {activeSection === 'skills' && <Skills />}
        {activeSection === 'experience' && <Experience />}
        {activeSection === 'education' && <Education />}
        {activeSection === 'contact' && <Contact />}
      </main>

      <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zm0-4V3c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1zm0 18v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1zm8-9h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM3 12h2c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1zm14.24-7.76a.996.996 0 0 0-1.41 0l-1.42 1.42c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l1.42-1.42c.39-.39.39-1.02 0-1.41zm-12.48 12.48a.996.996 0 0 0-1.41 0l-1.42 1.42c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l1.42-1.42c.39-.39.39-1.02 0-1.41zm12.48 0c-.39-.39-1.02-.39-1.41 0l-1.42 1.42c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l1.42-1.42c.39-.39.39-1.02 0-1.41zM7.76 7.76c.39-.39.39-1.02 0-1.41L6.34 4.93a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l1.42 1.42c.39.39 1.02.39 1.41 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z" />
          </svg>
        )}
      </button>

      <footer>
        <p>&copy; {new Date().getFullYear()} William Welden</p>
        <div className="social-links">
          <a href="https://github.com/wwelden" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/william-welden-256294292/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

function Home({ changeSection, darkMode }) {
  // Use the darkMode prop directly
  const currentHeaderBg = darkMode ? headerBgDark : headerBg

  return (
    <section className="home">
      <div className="hero" style={{ backgroundImage: `url(${currentHeaderBg})` }}>
        <div className="hero-content" data-aos="fade-up" data-aos-duration="1000">
          <h2>Software Developer & Computer Science Student</h2>
          <p>Welcome to my portfolio! I'm a Computer Science student at Trinity University with experience in a variety of programming languages and technologies.</p>
          <div className="cta-buttons">
            <button
              className="cta-button"
              onClick={() => changeSection('projects')}
            >
              View My Projects
            </button>
            <a href="mailto:wwelden@trinity.edu" className="cta-button secondary">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  // Group projects to manage animations better
  const calculateDelay = (index) => {
    // Create a staggered effect with a reasonable max delay
    return Math.min(index % 4, 3) * 150
  }

  const projects = [
    {
      title: "British Programming Language",
      description: "An esoteric programming language developed in Haskell featuring British-inspired keywords, complete with lexer, parser, and evaluator components.",
      techStack: ["Haskell", "Happy", "Alex"],
      github: "https://github.com/wwelden/British",
      skills: ["Functional programming", "Lambda calculus", "Type Systems", "Language design", "Grammar Specification"]
    },
    {
      title: "Chefs Vs. Aliens",
      description: "A parody tower defense game developed with Unity in C# based on Plants Vs. Zombies with a twist.",
      techStack: ["C#", "Unity", "Pixelmator pro"],
      github: "https://github.com/JorgeFLarach/CVA",
      skills: ["Team work", "Git", "Object oriented programming", "Resolving merge conflicts", "Git ignore files", "Using game engines"]
    },
    {
      title: "Blue Dog Shopping",
      description: "A simulation of a pet store website with a vendor page to add, remove, and adjust product information accessible through login only.",
      techStack: ["JavaScript", "mySQL", "EJS"],
      github: "https://github.com/jbrigham01/PetSmartest",
      skills: ["Web servers", "Frontend Web Dev", "Managing a git hub project"]
    },
    {
      title: "Keystroke",
      description: "A markdown parser that converts markdown to HTML.",
      techStack: ["TypeScript"],
      github: "https://github.com/wwelden/Keystroke",
      skills: ["Interpreter design"]
    },
    {
      title: "Black Jack",
      description: "A black jack game with card animations and card type selector.",
      techStack: ["C#", "Unity"],
      github: "https://github.com/GameDevelopment-F24/Welden-Blackjack",
      skills: ["Sprite animations", "Game development"]
    },
    {
      title: "Asteroids",
      description: "A clone of the classic arcade game Asteroids.",
      techStack: ["C#", "Unity"],
      github: "https://github.com/GameDevelopment-F24/Welden-Asteroids",
      skills: ["Game physics", "Collision detection", "Game development"]
    },
    {
      title: "Sokoban",
      description: "A clone of the classic arcade game Sokoban featuring puzzle mechanics.",
      techStack: ["C#", "Unity"],
      github: "https://github.com/GameDevelopment-F24/Welden-Sokoban",
      skills: ["Tilemaps", "Game development", "Puzzle design"]
    },
    {
      title: "Space Game",
      description: "A Galaga clone with additional features built without a game engine.",
      techStack: ["Scala", "Metals"],
      github: "https://github.com/wwelden/SpaceGame",
      skills: ["Game development without a game engine", "Data structures", "Game architecture"]
    },
    {
      title: "DarkWeb Scraper",
      description: "A web scraper for securely searching leaked data on the dark web, developed for a Computer and Network Security course.",
      techStack: ["Python", "Tor", "VPN", "Kahli Linux VM", "Bash scripts"],
      github: "https://github.com/wwelden/Dark-Web-Crawler",
      skills: ["Bash scripts", "Team work", "Web scraping", "Cyber Security"]
    },
    {
      title: "TIPC Compiler",
      description: "A compiler project that transforms low-level ILOC instructions into optimized assembly code with register allocation and dependency-based scheduling.",
      techStack: ["C++"],
      github: "https://github.com/wwelden/Compilers",
      skills: ["Compiler design", "Code optimization", "Assembly"]
    },
    {
      title: "Go Interpreter",
      description: "An interpreter written in Go supporting a C++-like language called Monkey, following Thorsten Ball's book.",
      techStack: ["Go"],
      github: "https://github.com/wwelden/Go-Interpreter",
      skills: ["Reinforcing compiler design concepts", "Interpreter design", "Language parsing"]
    },
    {
      title: "Connect 4",
      description: "A terminal-based Connect 4 game with AI opponent developed in Haskell.",
      techStack: ["Haskell"],
      github: "https://github.com",
      skills: ["Github", "Git", "Functional Programming", "Game AI"]
    },
    {
      title: "Programming Language Benchmark",
      description: "Comparative study of 21 different programming languages by implementing the same program and timing execution.",
      techStack: ["Multiple languages", "Bash scripts"],
      github: "https://github.com/wwelden/Loop-Speed-Benchmark",
      skills: ["Bash scripts", "Executable files", "Setting up multiple languages and compilers"]
    }
  ]

  return (
    <section className="projects">
      <h2 data-aos="fade-right" data-aos-once="true">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            className="project-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={calculateDelay(index)}
            data-aos-duration="800"
            data-aos-once="true"
          >
            <div className="project-image">
              <img src={projectImage} alt={project.title} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.techStack.map((tech, i) => (
                <span className="tech-tag" key={i}>
                  {getTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const skillCategories = [
    {
      category: "Proficient Languages",
      skills: ["Go", "C#", "Haskell", "JavaScript", "Java", "Scala"]
    },
    {
      category: "Somewhat Proficient Languages",
      skills: ["Rust", "C++", "Python", "TypeScript", "Lua"]
    },
    {
      category: "Technologies",
      skills: ["Unity", "GitHub", "GitHub Actions", "Bash scripts", "Google Cloud"]
    }
  ]

  return (
    <section className="skills">
      <h2 data-aos="fade-right" data-aos-once="true">Skills & Technologies</h2>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div
            className="skill-category"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            data-aos-duration="800"
            data-aos-once="true"
          >
            <h3>{category.category}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, i) => (
                <span className="skill-tag" key={i}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience">
      <h2 data-aos="fade-right" data-aos-once="true">Professional Experience</h2>
      <div
        className="experience-card"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <h3>Open Source Contributor</h3>
        <p className="company">Blue Button Project</p>
        <p className="duration">One Semester</p>
        <p>Contributed to the <a href="https://github.com/TU-SSP-blue-button/blue-button" target="_blank" rel="noopener noreferrer">Blue Button</a> open source XML/JSON conversion library:</p>
        <ul>
          <li>Updated dependencies to modernize the codebase</li>
          <li>Fixed bugs to improve functionality</li>
          <li>Implemented GitHub Actions for automated CI/CD</li>
          <li>Collaborated with team members on project goals</li>
        </ul>
      </div>
    </section>
  )
}

function Education() {
  const courses = [
    "Discrete Structures",
    "Principles of Computer Science",
    "Principles of Computer Science 2",
    "Principles of Data Abstraction",
    "Principles of Functional Languages",
    "Engineering Analysis & Design",
    "Principles of Computer Design",
    "Principles of Theoretical Computer Science",
    "Compiler Construction",
    "Principles of Programming Languages",
    "Principles of Algorithms",
    "Calculus I",
    "Web Application Design",
    "Principles of Software Engineering",
    "Intro to Game Development",
    "Senior Software Project I",
    "Principles of Operating Systems",
    "Computer and Network Security"
  ]

  // Function to calculate reasonable delays for course items
  const calculateCourseDelay = (index) => {
    return Math.min(index % 6, 5) * 50
  }

  return (
    <section className="education">
      <h2 data-aos="fade-right" data-aos-once="true">Education</h2>
      <div
        className="education-card"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <h3>Bachelor of Science in Computer Science</h3>
        <p className="institution">Trinity University</p>
        <p>Expected Graduation: May, 2026</p>
      </div>

      <h3 data-aos="fade-right" data-aos-once="true">Relevant Coursework</h3>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div
            className="course-item"
            key={index}
            data-aos="fade-up"
            data-aos-delay={calculateCourseDelay(index)}
            data-aos-duration="600"
            data-aos-once="true"
          >
            {course}
          </div>
        ))}
      </div>

      <h3 data-aos="fade-right" data-aos-once="true">Certifications</h3>
      <div
        className="certification-item"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <p>Expert Excel Certified</p>
      </div>
    </section>
  )
}

function Contact() {
  const downloadResume = () => {
    // Create a link to download the Resume.html file
    const link = document.createElement('a');
    link.href = '/resume.html'; // Assuming you'll place it in the public folder
    link.download = 'William_Welden_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="contact">
      <h2 data-aos="fade-right" data-aos-once="true">Contact Me</h2>
      <div className="contact-info">
        <div
          className="contact-item"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <h3>Email</h3>
          <p><a href="mailto:wwelden@trinity.edu">wwelden@trinity.edu</a></p>
        </div>
        <div
          className="contact-item"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <h3>Phone</h3>
          <p>(404) 432-3353</p>
        </div>
        <div
          className="contact-item"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <h3>Location</h3>
          <p>San Antonio, TX</p>
        </div>
      </div>
      <div
        className="download-resume"
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <button onClick={downloadResume} className="resume-button">
          Download Resume
        </button>
      </div>
      <div
        className="social-links-large"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <a href="https://github.com/wwelden" target="_blank" rel="noopener noreferrer" className="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon-large">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/william-welden-256294292/" target="_blank" rel="noopener noreferrer" className="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon-large">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export default App
