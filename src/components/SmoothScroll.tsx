import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Lenis + ScrollTrigger — disabled on form pages (native select popups break under transforms). */
export default function SmoothScroll() {
  const { pathname } = useLocation()
  const enabled = !pathname.startsWith('/contact')

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('lenis')
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis')

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
    }
  }, [enabled])

  return null
}
