import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { applications, dataEngine, hero, stackSection } from '../data'
import HeroVideo from './HeroVideo'
import WordReveal from './WordReveal'
import { ArrowDown, ChevronRight } from './Icons'

gsap.registerPlugin(ScrollTrigger)

type Band = -1 | 0 | 1 | 2

/**
 * Scale HomeHero recreation:
 * 450dvh shell → GSAP pin (pinSpacing:false) → title out →
 * video morphs into stack panes → 3 PullApart overlays with word reveals.
 */
export default function PinnedHero() {
  const shellRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const pullRefs = useRef<(HTMLDivElement | null)[]>([])
  const bandRef = useRef<Band>(-1)
  const [band, setBand] = useState<Band>(-1)

  useLayoutEffect(() => {
    const shell = shellRef.current
    const stage = stageRef.current
    const parallax = parallaxRef.current
    const title = titleRef.current
    const hint = hintRef.current
    const media = mediaRef.current
    const stack = stackRef.current
    if (!shell || !stage || !parallax || !title || !media || !stack) return

    const panes = stack.querySelectorAll('.morph-pane')
    const stackVideo = stack.querySelector('.morph-video')
    const pulls = pullRefs.current.filter(Boolean) as HTMLDivElement[]

    const showBand = (next: Band) => {
      if (bandRef.current === next) return
      const prev = bandRef.current
      bandRef.current = next
      setBand(next)

      pulls.forEach((el, i) => {
        const on = i === next
        if (on) {
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out', overwrite: true })
        } else if (i === prev || prev === -1) {
          gsap.to(el, { autoAlpha: 0, y: -18, duration: 0.45, ease: 'power1.in', overwrite: true })
        } else {
          gsap.set(el, { autoAlpha: 0, y: 24 })
        }
      })
    }

    const ctx = gsap.context(() => {
      gsap.set(title, { autoAlpha: 1 })
      if (hint) gsap.set(hint, { autoAlpha: 1 })
      gsap.set(parallax, { yPercent: 0 })
      gsap.set(stage, { backgroundColor: '#ffffff' })
      gsap.set(media, { scale: 1, borderRadius: 24, opacity: 1 })
      gsap.set(stack, { autoAlpha: 0, scale: 0.92, rotateX: 28 })
      gsap.set(panes, { opacity: 0, y: 40 })
      if (stackVideo) gsap.set(stackVideo, { opacity: 0 })
      gsap.set(pulls, { autoAlpha: 0, y: 28 })

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${shell.offsetHeight - window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })

      const morphTL = gsap.timeline({ paused: true })
      morphTL
        // White letterbox → black stage as the video morphs into the stack.
        .to(stage, { backgroundColor: '#000000', ease: 'none', duration: 0.08 }, 0)
        .to(media, { scale: 0.9, borderRadius: 16, opacity: 0, ease: 'power2.inOut', duration: 0.14 }, 0)
        .to(stack, { autoAlpha: 1, scale: 1, rotateX: 0, ease: 'power2.inOut', duration: 0.16 }, 0.02)
        .to(panes, { opacity: 1, y: 0, stagger: 0.03, ease: 'power2.out', duration: 0.14 }, 0.04)
        .to(stackVideo, { opacity: 0.75, duration: 0.12, ease: 'none' }, 0.06)
        .to(stack, { rotateX: -10, y: -20, scale: 1.04, ease: 'none', duration: 0.45 }, 0.2)
        .to(panes, { y: (i: number) => i * -14, ease: 'none', duration: 0.45 }, 0.2)
        .to(stack, { autoAlpha: 0, y: -48, ease: 'power1.in', duration: 0.14 }, 0.86)

      const parallaxTL = gsap.timeline({ paused: true })
      parallaxTL.to(parallax, { yPercent: -10, ease: 'power2.inOut', duration: 0.2 }, 0.8)

      let titleHidden = false

      ScrollTrigger.create({
        trigger: shell,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          morphTL.progress(p)
          parallaxTL.progress(p)

          if (p > 0.035 && !titleHidden) {
            titleHidden = true
            gsap.to(title, { autoAlpha: 0, duration: 0.25, overwrite: true })
            if (hint) gsap.to(hint, { autoAlpha: 0, duration: 0.2, overwrite: true })
          } else if (p <= 0.035 && titleHidden) {
            titleHidden = false
            gsap.to(title, { autoAlpha: 1, duration: 0.25, overwrite: true })
            if (hint) gsap.to(hint, { autoAlpha: 1, duration: 0.2, overwrite: true })
          }

          let next: Band = -1
          if (p >= 0.1 && p < 0.3) next = 0
          else if (p >= 0.3 && p < 0.6) next = 1
          else if (p >= 0.6 && p < 0.88) next = 2
          showBand(next)
        },
      })
    }, shell)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = window.setTimeout(refresh, 400)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(t)
      ctx.revert()
    }
  }, [])

  const scrollNext = () => {
    const shell = shellRef.current
    if (!shell) return
    window.scrollTo({ top: shell.offsetHeight * 0.12, behavior: 'smooth' })
  }

  return (
    <section ref={shellRef} className="home-hero" aria-label="Hero">
      <div ref={stageRef} className="home-hero-stage">
        <div ref={parallaxRef} className="hero-parallax">
          <div ref={mediaRef} className="hero-media-frame">
            <HeroVideo />
            <div className="hero-shade" aria-hidden="true" />
            <div ref={titleRef} className="hero-title-layer">
              <h1 className="hero-title">{hero.title}</h1>
            </div>
            <div ref={hintRef} className="hero-hint">
              <p className="hero-scroll-label">Scroll to explore</p>
              <button type="button" className="hero-scroll" aria-label="Scroll to content" onClick={scrollNext}>
                <ArrowDown />
              </button>
            </div>
          </div>

          <div ref={stackRef} className="hero-morph-stack" aria-hidden="true">
            <video className="morph-video" src={stackSection.video} muted playsInline loop autoPlay />
            <div className="morph-pane pane-a" />
            <div className="morph-pane pane-b" />
            <div className="morph-pane pane-c" />
          </div>

          <div
            ref={(el) => {
              pullRefs.current[0] = el
            }}
            className="pull-apart"
            aria-hidden={band !== 0}
          >
            <div className="pull-apart-inner pull-center">
              <WordReveal text={stackSection.title} active={band === 0} tone="green" className="pa-title" />
              <WordReveal text={stackSection.body} active={band === 0} tone="body" as="p" className="pa-body" />
            </div>
          </div>

          <div
            ref={(el) => {
              pullRefs.current[1] = el
            }}
            className="pull-apart"
            aria-hidden={band !== 1}
          >
            <div className="pull-apart-inner pull-center">
              <p className="pa-label">
                <span className="caret">▼</span> {applications.label}
              </p>
              <WordReveal text={applications.title} active={band === 1} tone="green" className="pa-title" />
              <WordReveal text={applications.body} active={band === 1} tone="body" as="p" className="pa-body" />
              <Link to={applications.cta.to} className="btn btn-green pa-cta">
                {applications.cta.label} <ChevronRight />
              </Link>
            </div>
          </div>

          <div
            ref={(el) => {
              pullRefs.current[2] = el
            }}
            className="pull-apart"
            aria-hidden={band !== 2}
          >
            <div className="pull-apart-inner pull-split">
              <div className="pull-copy">
                <p className="pa-label">
                  <span className="caret">▼</span> {dataEngine.label}
                </p>
                <WordReveal text={dataEngine.title} active={band === 2} tone="green" className="pa-title left" />
                <WordReveal text={dataEngine.body} active={band === 2} tone="body" as="p" className="pa-body left" />
                <Link to={dataEngine.cta.to} className="btn btn-green pa-cta">
                  {dataEngine.cta.label} <ChevronRight />
                </Link>
              </div>
              <div className="pull-media">
                <video src={dataEngine.video} muted playsInline loop autoPlay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
