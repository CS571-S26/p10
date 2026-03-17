import { Row, Col } from 'react-bootstrap'
import { calculateGearRelations, calculateGearTrain } from '../lib/gearCalculations'
import ResultCard from './ResultCard'

export default function ResultsPanel({ drivingTeeth, drivenTeeth, gears }) {
  const twoGear = calculateGearRelations(drivingTeeth, drivenTeeth)
  const teethList = gears.map((g) => g.teeth)
  const train = gears.length >= 2 ? calculateGearTrain(teethList) : null
  const results = twoGear ?? { gearRatio: 0, speedRatio: 0, torqueRatio: 0, drivenRpmFor1Driving: 0 }

  return (
    <section aria-labelledby="results-heading">
      <h2 id="results-heading" className="section-heading">
        Calculation Results
      </h2>
      <Row xs={1} md={2} lg={4} className="g-3">
        <Col>
          <ResultCard
            title="Gear Ratio"
            value={results.gearRatio}
            learnTerm="gear ratio"
            learnAnchor="gear-ratio"
          />
        </Col>
        <Col>
          <ResultCard
            title="Speed Ratio"
            value={results.speedRatio}
            learnTerm="speed ratio"
            learnAnchor="speed-ratio"
          />
        </Col>
        <Col>
          <ResultCard
            title="Torque Ratio"
            value={results.torqueRatio}
            learnTerm="torque"
            learnAnchor="torque"
          />
        </Col>
        <Col>
          <ResultCard
            title="Output Speed (1 RPM input)"
            value={results.drivenRpmFor1Driving}
            learnTerm="speed relationship"
            learnAnchor="speed-ratio"
          />
        </Col>
      </Row>
      {train && gears.length > 2 && (
        <Row className="mt-3">
          <Col>
            <ResultCard title="Gear Train Total Ratio" value={train.totalRatio} />
          </Col>
        </Row>
      )}
    </section>
  )
}
