import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dataEngine } from '../data'
import { ChevronRight } from './Icons'

gsap.registerPlugin(ScrollTrigger)

/** Scale “90%” pinned scrub — words light up with scroll. */
export default function StatScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  const text = `${dataEngine.stat} of the world’s leading generative AI model builders are powered by VelocityTechno.`
  const words = text.trim().split(/\s+/)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const wordsEl = wordsRef.current
    if (!section || !wordsEl) return

    const spans = wordsEl.querySelectorAll('span')
    const ctx = gsap.context(() => {
      gsap.set(spans, { opacity: 0.12 })
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 16 })
      if (mediaRef.current) gsap.set(mediaRef.current, { scale: 0.94 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%',
          pin: true,
          pinType: 'fixed',
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(
        spans,
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
        },
        0,
      )

      if (mediaRef.current) {
        tl.fromTo(mediaRef.current, { scale: 0.9, y: 24 }, { scale: 1, y: 0, ease: 'none' }, 0)
      }
      if (ctaRef.current) {
        tl.to(ctaRef.current, { opacity: 1, y: 0, ease: 'none' }, 0.62)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="stat-pin" aria-label="Impact">
      <div className="stat-pin-inner">
        <div className="stat-layout">
          <div ref={mediaRef} className="stat-media">
            <video src={dataEngine.video} muted playsInline loop autoPlay />
          </div>
          <div className="stat-card">
            <p ref={wordsRef} className="scroll-words stat-words">
              {words.map((word, index) => (
                <span key={`${word}-${index}`}>{word} </span>
              ))}
            </p>
            <Link ref={ctaRef} to={dataEngine.cta.to} className="btn btn-green stat-cta">
              {dataEngine.cta.label} <ChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
