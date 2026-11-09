import { useEffect, useRef, useState } from 'react'
import { hero } from '../data'

/** Layered muted hero videos — GSAP owns opacity while scrolling. */
export default function HeroVideo() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  const scrolling = useRef(false)

  useEffect(() => {
    let idle = 0
    const onScroll = () => {
      scrolling.current = true
      window.clearTimeout(idle)
      idle = window.setTimeout(() => {
        scrolling.current = false
      }, 180)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idle)
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (scrolling.current || window.scrollY > 40) return
      setActive((i) => (i + 1) % hero.videos.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    refs.current.forEach((video, index) => {
      if (!video) return
      const play = () => {
        video.play().catch(() => undefined)
      }
      if (index === active || index === 0) {
        if (video.readyState >= 2) play()
        else video.addEventListener('loadeddata', play, { once: true })
      }
    })
  }, [active])

  return (
    <div className="hero-media-stack" aria-hidden="true">
      <img className="hero-poster" src={hero.poster} alt="" />
      {hero.videos.map((src, index) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[index] = el
          }}
          className={`hero-video${index === active ? ' is-active' : ''}`}
          src={src}
          muted
          playsInline
          loop
          autoPlay={index === 0}
          preload={index <= 1 ? 'auto' : 'metadata'}
        />
      ))}
    </div>
  )
}
