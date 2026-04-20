import { createContext, useContext, useState, useCallback } from 'react'

const GearStateContext = createContext(null)

export function GearStateProvider({ children }) {
  const [drivingTeeth, setDrivingTeeth] = useState(20)
  const [drivenTeeth, setDrivenTeeth] = useState(40)
  const [gears, setGears] = useState([{ teeth: 20 }, { teeth: 40 }])
  const [drivingRpm, setDrivingRpm] = useState(100)
  const [moduleMm, setModuleMm] = useState(2)
  const [stageEfficiency, setStageEfficiency] = useState(0.97)
  const [setupA, setSetupA] = useState(null)
  const [setupB, setSetupB] = useState(null)

  const syncFromTwoGears = useCallback(() => {
    setGears([{ teeth: drivingTeeth }, { teeth: drivenTeeth }])
  }, [drivingTeeth, drivenTeeth])

  const getCurrentSetup = useCallback(
    () => ({
      teethList: gears.map((g) => g.teeth),
      drivingTeeth,
      drivenTeeth,
      drivingRpm,
      moduleMm,
      stageEfficiency,
    }),
    [gears, drivingTeeth, drivenTeeth, drivingRpm, moduleMm, stageEfficiency],
  )

  const applySetup = useCallback((setup) => {
    if (!setup) return
    const nextTeethList = Array.isArray(setup.teethList) && setup.teethList.length >= 2
      ? setup.teethList
      : [setup.drivingTeeth, setup.drivenTeeth]
    const nextDrivingTeeth = nextTeethList?.[0]
    const nextDrivenTeeth = nextTeethList?.[1]

    if (Number.isFinite(nextDrivingTeeth)) setDrivingTeeth(nextDrivingTeeth)
    if (Number.isFinite(nextDrivenTeeth)) setDrivenTeeth(nextDrivenTeeth)
    if (Array.isArray(nextTeethList) && nextTeethList.length >= 2) {
      setGears(nextTeethList.map((teeth) => ({ teeth })))
    }
    if (Number.isFinite(setup.drivingRpm)) setDrivingRpm(setup.drivingRpm)
    if (Number.isFinite(setup.moduleMm) && setup.moduleMm > 0) setModuleMm(setup.moduleMm)
    if (Number.isFinite(setup.stageEfficiency) && setup.stageEfficiency > 0 && setup.stageEfficiency <= 1) {
      setStageEfficiency(setup.stageEfficiency)
    }
  }, [])

  const saveCurrentAsSetupA = useCallback(() => {
    setSetupA(getCurrentSetup())
  }, [getCurrentSetup])

  const saveCurrentAsSetupB = useCallback(() => {
    setSetupB(getCurrentSetup())
  }, [getCurrentSetup])

  const resetSimulator = useCallback(() => {
    setDrivingTeeth(20)
    setDrivenTeeth(40)
    setGears([{ teeth: 20 }, { teeth: 40 }])
    setDrivingRpm(100)
    setModuleMm(2)
    setStageEfficiency(0.97)
  }, [])

  const value = {
    drivingTeeth,
    setDrivingTeeth,
    drivenTeeth,
    setDrivenTeeth,
    gears,
    setGears,
    syncFromTwoGears,
    drivingRpm,
    setDrivingRpm,
    moduleMm,
    setModuleMm,
    stageEfficiency,
    setStageEfficiency,
    setupA,
    setSetupA,
    setupB,
    setSetupB,
    getCurrentSetup,
    applySetup,
    saveCurrentAsSetupA,
    saveCurrentAsSetupB,
    resetSimulator,
  }
  return (
    <GearStateContext.Provider value={value}>
      {children}
    </GearStateContext.Provider>
  )
}

export function useGearState() {
  const ctx = useContext(GearStateContext)
  if (!ctx) throw new Error('useGearState must be used within GearStateProvider')
  return ctx
}
