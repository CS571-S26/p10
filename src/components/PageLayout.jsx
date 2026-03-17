import { Container } from 'react-bootstrap'

export default function PageLayout({ children, title, titleId, subtitle }) {
  return (
    <Container as="main" className="py-5" id="main-content">
      {title && (
        <header className="mb-4">
          <h1 id={titleId} className="page-title">
            {title}
          </h1>
          {subtitle && <p className="page-subtitle mb-0">{subtitle}</p>}
        </header>
      )}
      {children}
    </Container>
  )
}
