import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Post-hero Scale-like scrubbed reveals and parallax. */
export default function PageScrollFX() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-on-scroll:not(.display)').forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.95,
            delay: (index % 4) * 0.04,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.home-flow .display').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 48%',
              scrub: true,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.bench-media img, .news-media img, .case-media img').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.12, y: 28 },
          {
            scale: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('.bench-card, .news-card, .case-card') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      const cases = document.querySelector('.cases-stage')
      if (cases) {
        gsap.fromTo(
          cases,
          { y: 80, opacity: 0.3, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: cases,
              start: 'top 90%',
              end: 'top 45%',
              scrub: true,
            },
          },
        )
      }

      gsap.utils.toArray<HTMLElement>('.cta-band').forEach((el) => {
        const inner = el.querySelector('.cta-inner')
        if (!inner) return
        gsap.fromTo(
          inner,
          { y: 40, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 50%',
              scrub: true,
            },
          },
        )
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = window.setTimeout(refresh, 500)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(t)
      ctx.revert()
    }
  }, [])

  return null
}
