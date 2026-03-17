/**
 * Pure functions for gear ratio, speed ratio, and torque relationships.
 * Gear ratio = driven teeth / driving teeth.
 * Speed: driving RPM / driven RPM = gear ratio (driven spins slower if ratio > 1).
 * Torque: torque ratio is inverse of speed ratio (conservation of power).
 */

/**
 * @param {number} drivingTeeth - Number of teeth on driving gear
 * @param {number} drivenTeeth - Number of teeth on driven gear
 * @returns {{ gearRatio: number, speedRatio: number, torqueRatio: number, drivenRpmFor1Driving: number } | null}
 */
export function calculateGearRelations(drivingTeeth, drivenTeeth) {
  if (
    typeof drivingTeeth !== 'number' ||
    typeof drivenTeeth !== 'number' ||
    drivingTeeth <= 0 ||
    drivenTeeth <= 0 ||
    !Number.isFinite(drivingTeeth) ||
    !Number.isFinite(drivenTeeth)
  ) {
    return null
  }
  const gearRatio = drivenTeeth / drivingTeeth
  const speedRatio = gearRatio
  const torqueRatio = 1 / speedRatio
  const drivenRpmFor1Driving = 1 / gearRatio
  return {
    gearRatio,
    speedRatio,
    torqueRatio,
    drivenRpmFor1Driving,
  }
}

/**
 * Cumulative ratio for a gear train (first gear drives last).
 * @param {number[]} teethPerGear - Teeth count for each gear in order
 * @returns {{ totalRatio: number, outputRpmFactor: number } | null}
 */
export function calculateGearTrain(teethPerGear) {
  if (!Array.isArray(teethPerGear) || teethPerGear.length < 2) return null
  if (teethPerGear.some((t) => typeof t !== 'number' || t <= 0 || !Number.isFinite(t))) return null
  let totalRatio = 1
  for (let i = 0; i < teethPerGear.length - 1; i++) {
    totalRatio *= teethPerGear[i + 1] / teethPerGear[i]
  }
  return {
    totalRatio,
    outputRpmFactor: 1 / totalRatio,
  }
}
