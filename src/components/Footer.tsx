import { Link } from 'react-router-dom'
import { brand, footerColumns } from '../data'
import { LogoMark } from './Icons'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Link to="/" className="brand footer-brand">
            <LogoMark className="brand-mark" />
            <span className="brand-name">{brand.short}</span>
          </Link>
          <p className="footer-tagline">{brand.tagline}</p>
        </div>

        <div className="footer-grid">
          {footerColumns.map((col) => (
            <div key={col.title} className="footer-col">
              <p className="footer-col-title">{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={col.title + link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>Copyright © {new Date().getFullYear()} VelocityTechno. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/terms">Terms of Use</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
