import { useGearState } from '../context/GearStateContext'
import PageLayout from '../components/PageLayout'
import GearInputForm from '../components/GearInputForm'
import GearCanvas from '../components/GearCanvas'
import { useEffect } from 'react'

export default function VisualizerPage() {
  const {
    drivingTeeth,
    setDrivingTeeth,
    drivenTeeth,
    setDrivenTeeth,
    gears,
    setGears,
    syncFromTwoGears,
  } = useGearState()

  useEffect(() => {
    syncFromTwoGears()
  }, [drivingTeeth, drivenTeeth, syncFromTwoGears])

  return (
    <PageLayout title="Gear visualizer" titleId="visualizer-page-heading">
      <p className="lead text-muted mb-4">
        See meshing gears rotate according to the gear ratio. Adjust teeth counts below; the animation reflects the speed relationship.
      </p>
      <GearInputForm
        drivingTeeth={drivingTeeth}
        drivenTeeth={drivenTeeth}
        onDrivingTeethChange={setDrivingTeeth}
        onDrivenTeethChange={setDrivenTeeth}
        gears={gears}
        onGearsChange={setGears}
        showTrainEditor
      />
      <h2 className="h4 mb-3">Animation</h2>
      <GearCanvas gears={gears} />
    </PageLayout>
  )
}
