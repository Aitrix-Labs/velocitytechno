import { useMemo } from 'react'

type Props = {
  text: string
  progress: number
  className?: string
}

/** Scale-style scroll-scrubbed word reveal (words light up with progress 0–1). */
export default function ScrollWords({ text, progress, className = '' }: Props) {
  const words = useMemo(() => text.trim().split(/\s+/), [text])

  return (
    <p className={`scroll-words ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length
        const end = (index + 0.85) / words.length
        const local = Math.min(1, Math.max(0, (progress - start) / (end - start || 1)))
        const opacity = 0.12 + local * 0.88
        return (
          <span key={`${word}-${index}`} style={{ opacity }}>
            {word}{' '}
          </span>
        )
      })}
    </p>
  )
}
