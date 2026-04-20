import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()
  const isActive = (path) => (location.pathname === path ? 'active' : '')

  return (
    <Navbar as="nav" bg="primary" variant="dark" expand="md" className="navbar-main">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mechanical Gear Simulator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" aria-label="Toggle navigation menu" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto" role="navigation" aria-label="Primary">
            <Nav.Link as={Link} to="/" className={isActive('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>
              Simulator
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/analyze"
              className={isActive('/analyze')}
              aria-current={location.pathname === '/analyze' ? 'page' : undefined}
            >
              Analyze
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/compare"
              className={isActive('/compare')}
              aria-current={location.pathname === '/compare' ? 'page' : undefined}
            >
              Compare
            </Nav.Link>
            <Nav.Link as={Link} to="/learn" className={isActive('/learn')} aria-current={location.pathname === '/learn' ? 'page' : undefined}>
              Learn
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={isActive('/about')} aria-current={location.pathname === '/about' ? 'page' : undefined}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
