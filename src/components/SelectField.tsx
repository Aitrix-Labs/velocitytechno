import { useEffect, useId, useRef, useState } from 'react'

type Props = {
  name: string
  label: string
  placeholder: string
  value: string
  options: string[]
  required?: boolean
  error?: string
  onChange: (value: string) => void
}

export default function SelectField({
  name,
  label,
  placeholder,
  value,
  options,
  required,
  error,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={`select-field${error ? ' has-error' : ''}${open ? ' is-open' : ''}`}
    >
      <span className="sr-only" id={`${listId}-label`}>
        {label}
      </span>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        className={`select-trigger${!value ? ' is-placeholder' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${listId}-label`}
        aria-controls={listId}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{value || placeholder}</span>
      </button>
      {open ? (
        <ul id={listId} className="select-menu" role="listbox" aria-labelledby={`${listId}-label`}>
          {options.map((option) => {
            const selected = option === value
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`select-option${selected ? ' is-selected' : ''}`}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  {option}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
      {error ? <span className="field-error">{error}</span> : null}
    </div>
  )
}
