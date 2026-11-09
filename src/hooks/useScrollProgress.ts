import { useEffect, useState, type RefObject } from 'react'

/** 0–1 progress of an element through the viewport (pinned-section friendly). */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, opts?: { start?: number; end?: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const startOffset = opts?.start ?? 0
    const endOffset = opts?.end ?? 1

    const update = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) {
        const visible = 1 - rect.top / window.innerHeight
        setProgress(clamp((visible - startOffset) / (endOffset - startOffset)))
        return
      }
      const raw = -rect.top / total
      setProgress(clamp((raw - startOffset) / (endOffset - startOffset)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref, opts?.start, opts?.end])

  return progress
}

function clamp(n: number) {
  return Math.min(1, Math.max(0, n))
}

export function useRevealOnScroll(selector = '.reveal-on-scroll') {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector))
    if (!nodes.length) return

    const reveal = (el: Element) => el.classList.add('is-in')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((n) => {
      const rect = n.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) reveal(n)
      else io.observe(n)
    })

    return () => io.disconnect()
  }, [selector])
}
