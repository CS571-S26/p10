import React from 'react'

export const educationSections = [
  {
    id: 'gear-ratio',
    title: 'Gear Ratio',
    content: (
      <>
        <p>
          The <strong>gear ratio</strong> is the ratio of the number of teeth on the driven gear to the number of teeth on the driving gear.
          Formula: gear ratio = driven teeth ÷ driving teeth.
        </p>
        <p>
          A ratio greater than 1 means the driven gear is larger and will rotate more slowly than the driving gear.
          A ratio less than 1 means the driven gear is smaller and will rotate faster.
        </p>
      </>
    ),
  },
  {
    id: 'speed-ratio',
    title: 'Speed Ratio',
    content: (
      <>
        <p>
          The <strong>speed ratio</strong> describes how rotational speed (RPM) changes between gears.
          For two meshing gears, driving RPM ÷ driven RPM = gear ratio.
        </p>
        <p>
          So if the driving gear has 20 teeth and the driven has 40, the ratio is 2. The driven gear turns at half the speed of the driver.
        </p>
      </>
    ),
  },
  {
    id: 'torque',
    title: 'Torque',
    content: (
      <>
        <p>
          <strong>Torque</strong> is the rotational equivalent of force. In a gear pair, power is conserved (ignoring losses),
          so torque on the driven gear is related to torque on the driving gear by the gear ratio.
        </p>
        <p>
          Torque ratio = driving torque ÷ driven torque = gear ratio. So a higher gear ratio means the driven gear has higher torque and lower speed.
        </p>
      </>
    ),
  },
  {
    id: 'pitch-circle',
    title: 'Pitch Circle',
    content: (
      <>
        <p>
          The <strong>pitch circle</strong> is an imaginary circle on a gear where the teeth effectively mesh.
          The pitch circles of two meshing gears are tangent. Their diameters are proportional to the number of teeth when gears share the same module (size scale).
        </p>
      </>
    ),
  },
]
