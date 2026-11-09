import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { industries } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function IndustryScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const wordsEl = wordsRef.current
    const photo = photoRef.current
    if (!section || !wordsEl || !photo) return

    const wordNodes = Array.from(wordsEl.querySelectorAll('.industry-word')) as HTMLElement[]
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=280%',
          pin: true,
          pinType: 'fixed',
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(industries.length - 1, Math.floor(self.progress * industries.length))
            wordNodes.forEach((node, i) => node.classList.toggle('is-live', i === idx))
            const next = industries[idx]
            if (photo.getAttribute('src') !== next.image) {
              gsap.to(photo, {
                opacity: 0,
                duration: 0.15,
                onComplete: () => {
                  photo.src = next.image
                  gsap.to(photo, { opacity: 1, duration: 0.35 })
                },
              })
            }
          },
        },
      })

      tl.fromTo(
        photo.parentElement,
        { scale: 0.88, opacity: 0.4, y: 40 },
        { scale: 1, opacity: 1, y: 0, ease: 'none' },
        0,
      )
      tl.fromTo(
        wordsEl,
        { y: 60, opacity: 0.35 },
        { y: 0, opacity: 1, ease: 'none' },
        0,
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="industry-pin" aria-label="Industries">
      <div className="industry-pin-inner">
        <h2 className="display industries-title">Proven across every industry.</h2>
        <div className="industry-stage">
          <div className="industry-photo">
            <img ref={photoRef} src={industries[0].image} alt="" />
          </div>
          <div ref={wordsRef} className="industry-cloud">
            {industries.map((item, i) => (
              <span key={item.name} className={`industry-word w${(i % 5) + 1}${i === 0 ? ' is-live' : ''}`}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
