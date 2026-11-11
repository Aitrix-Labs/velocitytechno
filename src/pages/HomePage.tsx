import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { benchmarks, caseStudies, ctaBand, news } from '../data'
import PinnedHero from '../components/PinnedHero'
import StatScrollSection from '../components/StatScrollSection'
import IndustryScroll from '../components/IndustryScroll'
import PageScrollFX from '../components/PageScrollFX'
import { ArrowLeft, ArrowRight, ChevronRight } from '../components/Icons'

export default function HomePage() {
  const [caseIndex, setCaseIndex] = useState(0)
  const caseTimer = useRef<number | null>(null)

  useEffect(() => {
    caseTimer.current = window.setInterval(() => {
      setCaseIndex((i) => (i + 1) % caseStudies.length)
    }, 5500)
    return () => {
      if (caseTimer.current) window.clearInterval(caseTimer.current)
    }
  }, [])

  const shiftCase = (dir: -1 | 1) => {
    setCaseIndex((i) => (i + dir + caseStudies.length) % caseStudies.length)
  }

  return (
    <>
      <PageScrollFX />
      <PinnedHero />

      <div className="home-flow">
        <StatScrollSection />

        <section className="section section-dark cases-section" aria-roledescription="carousel" aria-label="Customer stories">
          <div className="cases-stage">
            {caseStudies.map((item, index) => {
              let dist = index - caseIndex
              if (dist > caseStudies.length / 2) dist -= caseStudies.length
              if (dist < -caseStudies.length / 2) dist += caseStudies.length
              if (Math.abs(dist) > 1) return null
              const active = dist === 0
              return (
                <Link
                  key={item.id}
                  to="/solutions/enterprise"
                  className={`case-card${active ? ' is-active' : ''}${dist < 0 ? ' is-prev' : ''}${dist > 0 ? ' is-next' : ''}`}
                  aria-hidden={!active}
                  tabIndex={active ? 0 : -1}
                >
                  <div className="case-media">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="case-copy">
                    <h3>{item.title}</h3>
                    <p className="case-client">{item.client}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="cases-controls">
            <button type="button" aria-label="Previous slide" onClick={() => shiftCase(-1)}>
              <ArrowLeft />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => shiftCase(1)}>
              <ArrowRight />
            </button>
          </div>
        </section>

        <IndustryScroll />

        <section className="section section-light bench-section">
          <div className="section-inner">
            <h2 className="display dark reveal-on-scroll">{benchmarks.title}</h2>
            <div className="bench-grid">
              {benchmarks.items.map((item) => (
                <Link key={item.title} to={item.to} className="bench-card reveal-on-scroll">
                  <div className="bench-media">
                    <img src={item.image} alt="" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="text-link">
                    Learn more <ChevronRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-light news-section">
          <div className="section-inner">
            <p className="news-eyebrow reveal-on-scroll">{news.eyebrow}</p>
            <div className="news-grid">
              {news.items.map((item) => (
                <Link key={item.title} to={item.to} className="news-card reveal-on-scroll">
                  <div className="news-media">
                    <img src={item.image} alt="" />
                  </div>
                  <p className="mono-label quiet">{item.category}</p>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="cta-inner reveal-on-scroll">
            <h2 className="display">{ctaBand.title}</h2>
            <p className="lead">{ctaBand.body}</p>
            <Link to={ctaBand.cta.to} className="btn btn-light">
              {ctaBand.cta.label}
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
