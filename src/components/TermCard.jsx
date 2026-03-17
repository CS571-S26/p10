import { Card } from 'react-bootstrap'

export default function TermCard({ id, title, children }) {
  return (
    <Card id={id} className="mb-4 term-card">
      <Card.Header as="h2" className="h5">
        {title}
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}
