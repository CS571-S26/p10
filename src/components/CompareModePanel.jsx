import { useMemo } from 'react'
import { Button, Card, Table, Row, Col } from 'react-bootstrap'
import { buildSetupSummary } from '../lib/gearCalculations'
import GearCanvas from './GearCanvas'

function fmt(n, decimals = 4) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return '—'
  return n.toFixed(decimals)
}

function fmtTeeth(list) {
  if (!Array.isArray(list) || list.length === 0) return '—'
  return list.join(' → ')
}

function delta(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || !Number.isFinite(a) || !Number.isFinite(b)) return '—'
  const d = a - b
  const sign = d > 0 ? '+' : ''
  return `${sign}${d.toFixed(4)}`
}

export default function CompareModePanel({
  currentSetup,
  setupA,
  setupB,
  onSaveA,
  onSaveB,
}) {
  const currentSummary = useMemo(() => buildSetupSummary(currentSetup), [currentSetup])
  const summaryA = useMemo(() => (setupA ? buildSetupSummary(setupA) : null), [setupA])
  const summaryB = useMemo(() => (setupB ? buildSetupSummary(setupB) : null), [setupB])

  return (
    <Card className="mb-4 app-card">
      <Card.Header as="h2">Compare mode (A/B)</Card.Header>
      <Card.Body>
        <p className="text-muted small">
          Save the current simulator state into Setup A or Setup B, then compare key engineering outputs side-by-side.
        </p>
        <div className="d-flex gap-2 flex-wrap mb-3">
          <Button type="button" variant="outline-primary" onClick={onSaveA}>
            Save current as Setup A
          </Button>
          <Button type="button" variant="outline-primary" onClick={onSaveB}>
            Save current as Setup B
          </Button>
        </div>

        {summaryA && summaryB ? (
          <>
            <Row className="g-3 mb-3">
              <Col md={6}>
                <h3 className="h6 mb-2">Setup A preview</h3>
                <GearCanvas
                  gears={summaryA.teethList.map((teeth) => ({ teeth }))}
                  height={180}
                  animate={false}
                />
              </Col>
              <Col md={6}>
                <h3 className="h6 mb-2">Setup B preview</h3>
                <GearCanvas
                  gears={summaryB.teethList.map((teeth) => ({ teeth }))}
                  height={180}
                  animate={false}
                />
              </Col>
            </Row>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Setup A</th>
                  <th>Setup B</th>
                  <th>A − B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Teeth train</th>
                  <td>{fmtTeeth(summaryA.teethList)}</td>
                  <td>{fmtTeeth(summaryB.teethList)}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <th scope="row">Driving RPM</th>
                  <td>{fmt(summaryA.drivingRpm, 2)}</td>
                  <td>{fmt(summaryB.drivingRpm, 2)}</td>
                  <td>{delta(summaryA.drivingRpm, summaryB.drivingRpm)}</td>
                </tr>
                <tr>
                  <th scope="row">Primary gear ratio</th>
                  <td>{fmt(summaryA.gearRatio)}</td>
                  <td>{fmt(summaryB.gearRatio)}</td>
                  <td>{delta(summaryA.gearRatio, summaryB.gearRatio)}</td>
                </tr>
                <tr>
                  <th scope="row">Driven RPM</th>
                  <td>{fmt(summaryA.drivenRpm)}</td>
                  <td>{fmt(summaryB.drivenRpm)}</td>
                  <td>{delta(summaryA.drivenRpm, summaryB.drivenRpm)}</td>
                </tr>
                <tr>
                  <th scope="row">Total train ratio</th>
                  <td>{fmt(summaryA.trainRatio)}</td>
                  <td>{fmt(summaryB.trainRatio)}</td>
                  <td>{delta(summaryA.trainRatio, summaryB.trainRatio)}</td>
                </tr>
                <tr>
                  <th scope="row">Total efficiency</th>
                  <td>{fmt(summaryA.totalEfficiency)}</td>
                  <td>{fmt(summaryB.totalEfficiency)}</td>
                  <td>{delta(summaryA.totalEfficiency, summaryB.totalEfficiency)}</td>
                </tr>
                <tr>
                  <th scope="row">Loss-adjusted torque factor</th>
                  <td>{fmt(summaryA.lossAdjustedTorqueFactor)}</td>
                  <td>{fmt(summaryB.lossAdjustedTorqueFactor)}</td>
                  <td>{delta(summaryA.lossAdjustedTorqueFactor, summaryB.lossAdjustedTorqueFactor)}</td>
                </tr>
                <tr>
                  <th scope="row">Power loss (%)</th>
                  <td>{fmt(summaryA.powerLossPercent, 2)}</td>
                  <td>{fmt(summaryB.powerLossPercent, 2)}</td>
                  <td>{delta(summaryA.powerLossPercent, summaryB.powerLossPercent)}</td>
                </tr>
              </tbody>
            </Table>
          </>
        ) : (
          <p className="mb-0 text-muted">
            Save both Setup A and Setup B to enable comparison.
          </p>
        )}

        <p className="text-muted small mt-3 mb-0">
          Current unsaved setup ratio: {fmt(currentSummary.gearRatio)}, driven RPM: {fmt(currentSummary.drivenRpm)}.
        </p>
      </Card.Body>
    </Card>
  )
}
