import { useEffect } from 'react'
import { educationSections } from '../data/educationContent'
import TermCard from './TermCard'

export default function EducationSection() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section aria-labelledby="learn-heading">
      <h2 id="learn-heading" className="section-heading">
        Key Concepts
      </h2>
      <p className="page-subtitle mb-4">
        Use these definitions to interpret calculation results and apply them to gear system design.
      </p>
      {educationSections.map((sec) => (
        <TermCard key={sec.id} id={sec.id} title={sec.title}>
          {sec.content}
        </TermCard>
      ))}
    </section>
  )
}
