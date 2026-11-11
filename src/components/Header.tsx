import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { brand, megaMenus, navKeys, type MegaKey } from '../data'
import { CloseIcon, LogoMark, MenuIcon } from './Icons'

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MegaKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120)
  }

  const open = (key: MegaKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpenMenu(key)
  }

  return (
    <header
      className={`site-header${scrolled || openMenu ? ' is-solid' : ''}${openMenu ? ' is-mega' : ''}`}
      onMouseLeave={scheduleClose}
    >
      <div className="header-inner">
        <Link to="/" className="brand" aria-label={`${brand.name} home`} onClick={() => setOpenMenu(null)}>
          <LogoMark className="brand-mark" />
          <span className="brand-name">{brand.short}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {navKeys.map((key) => (
            <button
              key={key}
              type="button"
              className={`nav-link${openMenu === key ? ' is-active' : ''}${openMenu && openMenu !== key ? ' is-dim' : ''}`}
              aria-expanded={openMenu === key}
              onMouseEnter={() => open(key)}
              onFocus={() => open(key)}
              onClick={() => open(key)}
            >
              {key}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="btn btn-login" onClick={() => setOpenMenu(null)}>
            Log In
          </button>
          <Link to="/contact" className="btn btn-started" onClick={() => setOpenMenu(null)}>
            Get Started
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v)
              setOpenMenu(null)
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <div
        className={`mega${openMenu ? ' is-open' : ''}`}
        onMouseEnter={() => openMenu && open(openMenu)}
      >
        {openMenu ? (
          <div className="mega-inner">
            <div className="mega-cols">
              {megaMenus[openMenu].columns.map((col) => (
                <div key={col.label} className="mega-col">
                  <p className="mega-label">{col.label}</p>
                  <ul>
                    {col.links.map((link) => (
                      <li key={col.label + link.label}>
                        <Link to={link.to} onClick={() => setOpenMenu(null)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link to={megaMenus[openMenu].feature.to} className="mega-feature" onClick={() => setOpenMenu(null)}>
              <img src={megaMenus[openMenu].feature.image} alt="" />
              <span>{megaMenus[openMenu].feature.title}</span>
            </Link>
          </div>
        ) : null}
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="mobile-drawer">
          {navKeys.map((key) => (
            <div key={key} className="mobile-group">
              <p className="mega-label">{key}</p>
              {megaMenus[key].columns.flatMap((col) =>
                col.links.map((link) => (
                  <Link key={key + link.label} to={link.to} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                )),
              )}
            </div>
          ))}
          <div className="mobile-actions">
            <button type="button" className="btn btn-login" onClick={() => setMobileOpen(false)}>
              Log In
            </button>
            <Link to="/contact" className="btn btn-started mobile-cta" onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
