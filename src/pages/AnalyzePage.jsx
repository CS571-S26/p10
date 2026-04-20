import { Accordion } from 'react-bootstrap'
import { useGearState } from '../context/GearStateContext'
import PageLayout from '../components/PageLayout'
import SimulatorOptions from '../components/SimulatorOptions'
import GearTrainTable from '../components/GearTrainTable'
import DesignWarnings from '../components/DesignWarnings'
import ReverseRatioPanel from '../components/ReverseRatioPanel'
import ResultsPanel from '../components/ResultsPanel'

export default function AnalyzePage() {
  const {
    drivingTeeth,
    drivenTeeth,
    gears,
    drivingRpm,
    setDrivingRpm,
    moduleMm,
    setModuleMm,
    stageEfficiency,
    setStageEfficiency,
    setDrivingTeeth,
    setDrivenTeeth,
    setGears,
  } = useGearState()

  const teethList = gears.map((g) => g.teeth)

  const applyPair = (driver, driven) => {
    setDrivingTeeth(driver)
    setDrivenTeeth(driven)
    setGears([{ teeth: driver }, { teeth: driven }])
  }

  return (
    <PageLayout
      title="Analyze"
      titleId="analyze-page-heading"
      subtitle="Inspect engineering depth: per-gear train behavior, efficiency assumptions, and design checks."
    >
      <SimulatorOptions
        drivingRpm={drivingRpm}
        onDrivingRpmChange={setDrivingRpm}
        moduleMm={moduleMm}
        onModuleMmChange={setModuleMm}
        stageEfficiency={stageEfficiency}
        onStageEfficiencyChange={setStageEfficiency}
      />
      <GearTrainTable teethList={teethList} inputRpm={drivingRpm} />
      <DesignWarnings teethList={teethList} moduleMm={moduleMm} />
      <ResultsPanel
        drivingTeeth={drivingTeeth}
        drivenTeeth={drivenTeeth}
        gears={gears}
        drivingRpm={drivingRpm}
        stageEfficiency={stageEfficiency}
      />
      <Accordion className="mt-4 mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Reverse calculator</Accordion.Header>
          <Accordion.Body>
            <ReverseRatioPanel onApplyPair={applyPair} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </PageLayout>
  )
}
