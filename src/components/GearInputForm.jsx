import { useState, useEffect } from 'react'
import { Form, Row, Col, Card } from 'react-bootstrap'
import GearTrainEditor from './GearTrainEditor'

const MIN_TEETH = 8
const MAX_TEETH = 120

function clamp(val) {
  const n = parseInt(String(val).replace(/\D/g, '') || '0', 10)
  if (Number.isNaN(n) || n < MIN_TEETH) return MIN_TEETH
  if (n > MAX_TEETH) return MAX_TEETH
  return n
}

export default function GearInputForm({
  drivingTeeth,
  drivenTeeth,
  onDrivingTeethChange,
  onDrivenTeethChange,
  gears,
  onGearsChange,
  showTrainEditor = false,
}) {
  const [drivingDisplay, setDrivingDisplay] = useState(String(drivingTeeth))
  const [drivenDisplay, setDrivenDisplay] = useState(String(drivenTeeth))

  useEffect(() => {
    setDrivingDisplay(String(drivingTeeth))
  }, [drivingTeeth])
  useEffect(() => {
    setDrivenDisplay(String(drivenTeeth))
  }, [drivenTeeth])

  const handleDrivingChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    setDrivingDisplay(raw === '' ? '' : raw)
    const v = parseInt(raw, 10)
    if (!Number.isNaN(v) && v >= MIN_TEETH && v <= MAX_TEETH) {
      onDrivingTeethChange(v)
    }
  }
  const handleDrivingBlur = () => {
    const v = clamp(drivingDisplay)
    setDrivingDisplay(String(v))
    onDrivingTeethChange(v)
  }

  const handleDrivenChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    setDrivenDisplay(raw === '' ? '' : raw)
    const v = parseInt(raw, 10)
    if (!Number.isNaN(v) && v >= MIN_TEETH && v <= MAX_TEETH) {
      onDrivenTeethChange(v)
    }
  }
  const handleDrivenBlur = () => {
    const v = clamp(drivenDisplay)
    setDrivenDisplay(String(v))
    onDrivenTeethChange(v)
  }

  return (
    <Card className="mb-4 app-card">
      <Card.Header as="h2">Input Parameters</Card.Header>
      <Card.Body>
        <Form noValidate>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="driving-teeth">Driving gear — number of teeth</Form.Label>
                <Form.Control
                  id="driving-teeth"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={drivingDisplay}
                  onChange={handleDrivingChange}
                  onBlur={handleDrivingBlur}
                  aria-describedby="driving-teeth-desc"
                />
                <Form.Text id="driving-teeth-desc" className="text-muted">
                  Valid range: {MIN_TEETH}–{MAX_TEETH} teeth.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="driven-teeth">Driven gear — number of teeth</Form.Label>
                <Form.Control
                  id="driven-teeth"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={drivenDisplay}
                  onChange={handleDrivenChange}
                  onBlur={handleDrivenBlur}
                  aria-describedby="driven-teeth-desc"
                />
                <Form.Text id="driven-teeth-desc" className="text-muted">
                  Valid range: {MIN_TEETH}–{MAX_TEETH} teeth.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {showTrainEditor && (
          <GearTrainEditor gears={gears} onGearsChange={onGearsChange} className="mt-3" />
        )}
      </Card.Body>
    </Card>
  )
}
