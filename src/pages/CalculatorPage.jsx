import { useGearState } from '../context/GearStateContext'
import PageLayout from '../components/PageLayout'
import GearInputForm from '../components/GearInputForm'
import ResultsPanel from '../components/ResultsPanel'
import GearCanvas from '../components/GearCanvas'

export default function CalculatorPage() {
  const {
    drivingTeeth,
    setDrivingTeeth,
    drivenTeeth,
    setDrivenTeeth,
    gears,
    setGears,
  } = useGearState()

  return (
    <PageLayout
      title="Gear Simulator"
      titleId="calculator-page-heading"
      subtitle="Enter driving and driven gear tooth counts to compute ratio, speed, and torque. Adjust parameters below to update the visualization."
    >
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
      />
    </PageLayout>
  )
}
