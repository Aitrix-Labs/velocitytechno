import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  text: string
  active: boolean
  tone?: 'green' | 'body'
  className?: string
  as?: 'h2' | 'p'
}

/** Scale PullApart word reveal — green titles slide from x:30%, body fades in. */
export default function WordReveal({ text, active, tone = 'green', className = '', as = 'h2' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const played = useRef(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.wr-word')

    if (!active) {
      if (!played.current) {
        gsap.set(words, {
          opacity: 0,
          xPercent: tone === 'green' ? 30 : 0,
        })
      }
      return
    }

    if (played.current) {
      gsap.to(words, { opacity: 1, xPercent: 0, duration: 0.2, stagger: 0.02, overwrite: true })
      return
    }

    played.current = true
    gsap.fromTo(
      words,
      {
        opacity: 0,
        xPercent: tone === 'green' ? 30 : 0,
      },
      {
        opacity: 1,
        xPercent: 0,
        duration: tone === 'green' ? 0.55 : 0.4,
        stagger: tone === 'green' ? 0.06 : 0.03,
        ease: 'power2.out',
        overwrite: true,
      },
    )
  }, [active, tone])

  const words = text.trim().split(/\s+/)
  const Tag = as

  return (
    <Tag ref={ref as never} className={`word-reveal tone-${tone} ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="wr-word">
          {word}&nbsp;
        </span>
      ))}
    </Tag>
  )
}
