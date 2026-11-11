import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { products, solutions } from '../data'

function PageShell({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow?: string
  title: string
  body?: string
  children?: ReactNode
}) {
  return (
    <section className="page-shell">
      <div className="page-hero">
        {eyebrow ? <p className="mono-label quiet">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {body ? <p className="lead">{body}</p> : null}
      </div>
      {children}
    </section>
  )
}

export function ProductsPage() {
  return (
    <PageShell eyebrow="Products" title="Build reliable AI from data to deployment.">
      <div className="page-grid">
        {products.map((p) => (
          <Link key={p.slug} to={`/products/${p.slug}`} className="page-card">
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}

export function ProductPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug) ?? products[0]
  return (
    <PageShell eyebrow="Product" title={product.title} body={product.body}>
      <div className="page-actions">
        <Link to="/contact" className="btn btn-dark">
          Get Started
        </Link>
        <Link to="/products" className="btn btn-ghost">
          All products
        </Link>
      </div>
    </PageShell>
  )
}

export function SolutionsPage() {
  return (
    <PageShell eyebrow="Solutions" title="AI that works where it matters most.">
      <div className="page-grid">
        {solutions.map((s) => (
          <Link key={s.slug} to={`/solutions/${s.slug}`} className="page-card">
            <h2>{s.title}</h2>
            <p>{s.summary}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}

export function SolutionPage() {
  const { slug } = useParams()
  const solution = solutions.find((s) => s.slug === slug) ?? solutions[0]
  return (
    <PageShell eyebrow="Solution" title={solution.title} body={solution.body}>
      <div className="page-actions">
        <Link to="/contact" className="btn btn-dark">
          Talk to us
        </Link>
        <Link to="/solutions" className="btn btn-ghost">
          All solutions
        </Link>
      </div>
    </PageShell>
  )
}

export function CompanyPage() {
  const { slug } = useParams()
  const titles: Record<string, { title: string; body: string }> = {
    about: {
      title: 'About VelocityTechno',
      body: 'We build reliable AI systems for critical decisions — pairing frontier data, rigorous evaluation, and real-world deployment.',
    },
    careers: {
      title: 'Careers',
      body: 'Join a team building AI that governments and enterprises trust with their hardest problems.',
    },
    security: {
      title: 'Security',
      body: 'Security and privacy are foundational. Our platforms are designed for sensitive data and high-assurance environments.',
    },
  }
  const page = titles[slug ?? 'about'] ?? titles.about
  return (
    <PageShell eyebrow="Company" title={page.title} body={page.body}>
      <div className="page-actions">
        <Link to="/contact" className="btn btn-dark">
          Contact
        </Link>
      </div>
    </PageShell>
  )
}

export function CareersPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Careers"
      body="Join VelocityTechno and help build AI systems the world can trust."
    >
      <div className="page-actions">
        <Link to="/contact" className="btn btn-dark">
          Get in touch
        </Link>
      </div>
    </PageShell>
  )
}

export function BlogPage() {
  return (
    <PageShell
      eyebrow="Resources"
      title="From the lab to the real world."
      body="Research, customer stories, and policy insights from VelocityTechno."
    />
  )
}

export function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Guides and documentation"
      body="Practical guides for data labeling, model training, evaluation, and deploying reliable AI."
    />
  )
}

export function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-layout">
        <div className="contact-copy">
          <h1>Let’s build together</h1>
          <p className="lead">
            Join leading enterprises partnering with VelocityTechno. Book a 1:1 intro call with us to
            get started.
          </p>
          <ContactForm />
        </div>
        <aside className="contact-aside" aria-label="Customer perspective">
          <blockquote className="contact-quote">
            <p>
              We’re going to need a lot more investment in high-quality evals and benchmarks to help
              us understand the actual comparative utility of the various models. Private evals and
              leaderboards from partners like VelocityTechno are essential.
            </p>
            <footer>
              <strong>Field leaders</strong>
              <span>Enterprise AI &amp; evaluation teams</span>
            </footer>
          </blockquote>
          <p className="contact-trusted">Trusted by teams deploying AI where outcomes matter</p>
        </aside>
      </div>
    </section>
  )
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  return (
    <PageShell
      eyebrow="Legal"
      title={kind === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
      body={
        kind === 'privacy'
          ? 'We respect your privacy. This site collects only the information you submit through forms, used to respond to your inquiries.'
          : 'By using this website you agree to use it for lawful purposes. Content is provided for informational purposes.'
      }
    />
  )
}
