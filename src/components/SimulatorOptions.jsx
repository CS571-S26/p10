import { Form, Row, Col, Card } from 'react-bootstrap'

export default function SimulatorOptions({
  drivingRpm,
  onDrivingRpmChange,
  moduleMm,
  onModuleMmChange,
  stageEfficiency,
  onStageEfficiencyChange,
}) {
  return (
    <Card className="mb-4 app-card">
      <Card.Header as="h2">Simulation options</Card.Header>
      <Card.Body>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor="driving-rpm">Driving gear RPM (gear 1)</Form.Label>
              <Form.Control
                id="driving-rpm"
                type="number"
                min={0.001}
                step="any"
                value={drivingRpm}
                onChange={(e) => {
                  const v = parseFloat(e.target.value, 10)
                  if (!Number.isNaN(v) && v !== 0) onDrivingRpmChange(v)
                }}
                aria-describedby="driving-rpm-desc"
              />
              <Form.Text id="driving-rpm-desc" className="text-muted">
                Used for the train analysis table and output speed. Must be non-zero.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor="module-mm">Module m (mm)</Form.Label>
              <Form.Control
                id="module-mm"
                type="number"
                min={0.01}
                step="any"
                value={moduleMm}
                onChange={(e) => {
                  const v = parseFloat(e.target.value, 10)
                  if (!Number.isNaN(v) && v > 0) onModuleMmChange(v)
                }}
                aria-describedby="module-mm-desc"
              />
              <Form.Text id="module-mm-desc" className="text-muted">
                For center distance between adjacent gears: a = m/2 × (N₁ + N₂).
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor="stage-efficiency">Stage efficiency per mesh (0–1)</Form.Label>
              <Form.Control
                id="stage-efficiency"
                type="number"
                min={0.01}
                max={1}
                step="any"
                value={stageEfficiency}
                onChange={(e) => {
                  const v = parseFloat(e.target.value, 10)
                  if (!Number.isNaN(v) && v > 0 && v <= 1) onStageEfficiencyChange(v)
                }}
                aria-describedby="stage-efficiency-desc"
              />
              <Form.Text id="stage-efficiency-desc" className="text-muted">
                Models friction/losses; total efficiency multiplies across meshes.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
