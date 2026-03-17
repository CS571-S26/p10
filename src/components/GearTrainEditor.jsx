import { Button, Form, Row, Col } from 'react-bootstrap'

const MIN_TEETH = 8
const MAX_TEETH = 120

export default function GearTrainEditor({ gears, onGearsChange, className = '' }) {
  const addGear = () => {
    const last = gears[gears.length - 1]
    onGearsChange([...gears, { teeth: last ? last.teeth : 20 }])
  }
  const removeGear = () => {
    if (gears.length <= 2) return
    onGearsChange(gears.slice(0, -1))
  }
  const setTeeth = (index, teeth) => {
    const v = parseInt(teeth, 10)
    if (Number.isNaN(v) || v < MIN_TEETH || v > MAX_TEETH) return
    const next = [...gears]
    next[index] = { teeth: v }
    onGearsChange(next)
  }

  return (
    <div className={className}>
      <h3 className="h4 mb-2">Gear Train (Optional)</h3>
      <p className="text-muted small mb-2">
        Add or remove gears to compute cumulative ratio. Each gear drives the next in sequence.
      </p>
      {gears.map((g, i) => (
        <Row key={i} className="align-items-center mb-2">
          <Col xs="auto">
            <label htmlFor={`gear-teeth-${i}`} className="me-2">
              Gear {i + 1} teeth:
            </label>
          </Col>
          <Col xs="auto">
            <Form.Control
              id={`gear-teeth-${i}`}
              type="number"
              min={MIN_TEETH}
              max={MAX_TEETH}
              value={g.teeth}
              onChange={(e) => setTeeth(i, e.target.value)}
              aria-label={`Gear ${i + 1} number of teeth`}
              style={{ width: '5rem' }}
            />
          </Col>
        </Row>
      ))}
      <div className="mt-2">
        <Button variant="outline-primary" size="sm" onClick={addGear} className="me-2">
          Add gear
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={removeGear}
          disabled={gears.length <= 2}
          aria-disabled={gears.length <= 2}
        >
          Remove last gear
        </Button>
      </div>
    </div>
  )
}
