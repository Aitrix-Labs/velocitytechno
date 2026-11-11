import { useState, type ChangeEvent, type FormEvent } from 'react'
import SelectField from './SelectField'

const regions = [
  'North America',
  'Europe',
  'Middle East',
  'Asia Pacific',
  'Latin America',
  'Other',
]

const companyTypes = [
  'Enterprise',
  'AI / ML Lab',
  'Government / Public Sector',
  'Healthcare',
  'Defense / National Security',
  'Startup',
  'Other',
]

const hearAboutOptions = [
  'Search',
  'Referral',
  'Event / Conference',
  'Social media',
  'Press / Blog',
  'Existing customer',
  'Other',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FormState = {
  firstName: string
  lastName: string
  company: string
  jobTitle: string
  email: string
  region: string
  companyType: string
  hearAbout: string
  message: string
}

const empty: FormState = {
  firstName: '',
  lastName: '',
  company: '',
  jobTitle: '',
  email: '',
  region: '',
  companyType: '',
  hearAbout: '',
  message: '',
}

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(empty)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const setField = (key: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setField(key, e.target.value)
    }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!values.firstName.trim()) next.firstName = 'Required'
    if (!values.lastName.trim()) next.lastName = 'Required'
    if (!values.company.trim()) next.company = 'Required'
    if (!values.jobTitle.trim()) next.jobTitle = 'Required'
    if (!values.email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid work email'
    if (!values.region) next.region = 'Required'
    if (!values.companyType) next.companyType = 'Required'
    return next
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length) {
      setErrors(next)
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrors({})

    try {
      await new Promise((r) => window.setTimeout(r, 700))
      const payload = { ...values, submittedAt: new Date().toISOString() }
      const key = 'velocitytechno-contact-leads'
      const prev = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
      localStorage.setItem(key, JSON.stringify([payload, ...prev].slice(0, 50)))
      setStatus('success')
      setValues(empty)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success" role="status">
        <p className="contact-success-title">Thanks — you are on our calendar queue.</p>
        <p className="contact-success-body">
          A VelocityTechno specialist will reach out shortly to schedule your intro call.
        </p>
        <button type="button" className="btn btn-dark" onClick={() => setStatus('idle')}>
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-row">
        <label className={errors.firstName ? 'has-error' : ''}>
          <span className="sr-only">First name</span>
          <input
            name="firstName"
            autoComplete="given-name"
            placeholder="First name*"
            value={values.firstName}
            onChange={set('firstName')}
            aria-invalid={Boolean(errors.firstName)}
          />
          {errors.firstName ? <span className="field-error">{errors.firstName}</span> : null}
        </label>
        <label className={errors.lastName ? 'has-error' : ''}>
          <span className="sr-only">Last name</span>
          <input
            name="lastName"
            autoComplete="family-name"
            placeholder="Last name*"
            value={values.lastName}
            onChange={set('lastName')}
            aria-invalid={Boolean(errors.lastName)}
          />
          {errors.lastName ? <span className="field-error">{errors.lastName}</span> : null}
        </label>
      </div>

      <label className={errors.company ? 'has-error' : ''}>
        <span className="sr-only">Company name</span>
        <input
          name="company"
          autoComplete="organization"
          placeholder="Company name*"
          value={values.company}
          onChange={set('company')}
          aria-invalid={Boolean(errors.company)}
        />
        {errors.company ? <span className="field-error">{errors.company}</span> : null}
      </label>

      <label className={errors.jobTitle ? 'has-error' : ''}>
        <span className="sr-only">Job title</span>
        <input
          name="jobTitle"
          autoComplete="organization-title"
          placeholder="Job title*"
          value={values.jobTitle}
          onChange={set('jobTitle')}
          aria-invalid={Boolean(errors.jobTitle)}
        />
        {errors.jobTitle ? <span className="field-error">{errors.jobTitle}</span> : null}
      </label>

      <label className={errors.email ? 'has-error' : ''}>
        <span className="sr-only">Work email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Work email*"
          value={values.email}
          onChange={set('email')}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </label>

      <SelectField
        name="region"
        label="Region"
        placeholder="Region*"
        value={values.region}
        options={regions}
        required
        error={errors.region}
        onChange={(v) => setField('region', v)}
      />

      <SelectField
        name="companyType"
        label="What best describes your company"
        placeholder="What best describes your company?*"
        value={values.companyType}
        options={companyTypes}
        required
        error={errors.companyType}
        onChange={(v) => setField('companyType', v)}
      />

      <SelectField
        name="hearAbout"
        label="How did you hear about VelocityTechno"
        placeholder="How did you hear about VelocityTechno?"
        value={values.hearAbout}
        options={hearAboutOptions}
        onChange={(v) => setField('hearAbout', v)}
      />

      <label>
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your use case (optional)"
          value={values.message}
          onChange={set('message')}
        />
      </label>

      <button type="submit" className="btn btn-dark contact-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit'}
      </button>

      {status === 'error' && Object.keys(errors).length === 0 ? (
        <p className="form-banner error" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  )
}
