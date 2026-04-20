import { Button, Card } from 'react-bootstrap'
import { useGearState } from '../context/GearStateContext'
import PageLayout from '../components/PageLayout'
import CompareModePanel from '../components/CompareModePanel'

export default function ComparePage() {
  const {
    setupA,
    setupB,
    getCurrentSetup,
    saveCurrentAsSetupA,
    saveCurrentAsSetupB,
    applySetup,
  } = useGearState()

  const currentSetup = getCurrentSetup()

  return (
    <PageLayout
      title="Compare"
      titleId="compare-page-heading"
      subtitle="Save simulator states as A and B, compare deltas, then optionally apply either setup back to Simulator."
    >
      <CompareModePanel
        currentSetup={currentSetup}
        setupA={setupA}
        setupB={setupB}
        onSaveA={saveCurrentAsSetupA}
        onSaveB={saveCurrentAsSetupB}
      />
      {(setupA || setupB) && (
        <Card className="mb-4 app-card">
          <Card.Header as="h2">Apply saved setup</Card.Header>
          <Card.Body className="d-flex gap-2 flex-wrap">
            <Button type="button" variant="outline-primary" disabled={!setupA} onClick={() => applySetup(setupA)}>
              Apply A to Simulator
            </Button>
            <Button type="button" variant="outline-primary" disabled={!setupB} onClick={() => applySetup(setupB)}>
              Apply B to Simulator
            </Button>
          </Card.Body>
        </Card>
      )}
    </PageLayout>
  )
}
