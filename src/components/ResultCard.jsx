import { Link } from 'react-router-dom'

export default function ResultCard({ title, value, learnTerm, learnAnchor }) {
  const valueStr = typeof value === 'number' ? (Number.isInteger(value) ? String(value) : value.toFixed(4)) : String(value)
  return (
    <div className="result-card">
      <h3 className="result-title">{title}</h3>
      <p className="result-value mb-0" aria-live="polite">
        {valueStr}
      </p>
      {learnTerm && (
        <Link to={learnAnchor ? `/learn#${learnAnchor}` : '/learn'} className="result-link mt-2 d-inline-block">
          Learn: {learnTerm}
        </Link>
      )}
    </div>
  )
}
