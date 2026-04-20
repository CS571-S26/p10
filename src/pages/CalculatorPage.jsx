import { Button, Card } from 'react-bootstrap'
import { useGearState } from '../context/GearStateContext'
import PageLayout from '../components/PageLayout'
import GearInputForm from '../components/GearInputForm'
import ResultsPanel from '../components/ResultsPanel'
import GearCanvas from '../components/GearCanvas'
import ExportPdfButton from '../components/ExportPdfButton'

export default function CalculatorPage() {
  const {
    drivingTeeth,
    setDrivingTeeth,
    drivenTeeth,
    setDrivenTeeth,
    gears,
    setGears,
    drivingRpm,
    moduleMm,
    stageEfficiency,
    saveCurrentAsSetupA,
    saveCurrentAsSetupB,
    resetSimulator,
  } = useGearState()
  const teethList = gears.map((g) => g.teeth)

  return (
    <PageLayout
      title="Simulator"
      titleId="calculator-page-heading"
      subtitle="Quickly set up driver and driven gears, then read the key outputs. Use Analyze for deeper engineering checks and Compare for A/B workflows."
    >
      <Card className="mb-4 app-card quick-actions-card">
        <Card.Header as="h2">Quick actions</Card.Header>
        <Card.Body className="d-flex gap-2 flex-wrap align-items-center">
          <Button type="button" variant="outline-secondary" onClick={resetSimulator}>
            Reset
          </Button>
          <Button type="button" variant="outline-primary" onClick={saveCurrentAsSetupA}>
            Save A
          </Button>
          <Button type="button" variant="outline-primary" onClick={saveCurrentAsSetupB}>
            Save B
          </Button>
          <ExportPdfButton
            teethList={teethList}
            drivingTeeth={drivingTeeth}
            drivenTeeth={drivenTeeth}
            drivingRpm={drivingRpm}
            moduleMm={moduleMm}
            stageEfficiency={stageEfficiency}
            className="mb-0"
          />
        </Card.Body>
      </Card>
      <h2 className="section-heading">Live Gear Visualization</h2>
      <GearCanvas gears={gears} />
      <GearInputForm
        drivingTeeth={drivingTeeth}
        drivenTeeth={drivenTeeth}
        onDrivingTeethChange={setDrivingTeeth}
        onDrivenTeethChange={setDrivenTeeth}
        gears={gears}
        onGearsChange={(g) => {
          setGears(g)
          if (g.length === 2) {
            setDrivingTeeth(g[0].teeth)
            setDrivenTeeth(g[1].teeth)
          }
        }}
        showTrainEditor
      />
      <ResultsPanel
        drivingTeeth={drivingTeeth}
        drivenTeeth={drivenTeeth}
        gears={gears}
        drivingRpm={drivingRpm}
        stageEfficiency={stageEfficiency}
        compact
      />
    </PageLayout>
  )
}
