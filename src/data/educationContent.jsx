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
  {
    id: 'equations',
    title: 'Equations (Gear Pair)',
    content: (
      <>
        <p>
          For two external gears in mesh, <strong>Gear 1</strong> is the <strong>driver</strong> and <strong>Gear 2</strong> is the{' '}
          <strong>driven</strong>. Let tooth counts be <code>N₁</code>, <code>N₂</code>, pitch diameters be <code>d₁</code>, <code>d₂</code>,
          angular velocities be <code>ω₁</code>, <code>ω₂</code>, and torques be <code>τ₁</code>, <code>τ₂</code>.
        </p>
        <ul className="equation-list">
          <li className="equation-item">
            <div className="equation-label">Geometry (same tooth size/module)</div>
            <div className="equation-block" aria-label="d one over d two equals N one over N two">
              <span className="equation-expr">
                <span className="frac">
                  <span className="num">
                    <span className="math-var">
                      d<sub>1</sub>
                    </span>
                  </span>
                  <span className="den">
                    <span className="math-var">
                      d<sub>2</sub>
                    </span>
                  </span>
                </span>
                <span className="op">=</span>
                <span className="frac">
                  <span className="num">
                    <span className="math-var">
                      N<sub>1</sub>
                    </span>
                  </span>
                  <span className="den">
                    <span className="math-var">
                      N<sub>2</sub>
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </li>
          <li className="equation-item">
            <div className="equation-label">Speed (external gears rotate opposite)</div>
            <div className="equation-block" aria-label="omega two equals negative N one over N two times omega one">
              <span className="equation-expr">
                <span className="math-var">
                  ω<sub>2</sub>
                </span>
                <span className="op">=</span>
                <span className="op">−</span>
                <span className="op">(</span>
                <span className="frac">
                  <span className="num">
                    <span className="math-var">
                      N<sub>1</sub>
                    </span>
                  </span>
                  <span className="den">
                    <span className="math-var">
                      N<sub>2</sub>
                    </span>
                  </span>
                </span>
                <span className="op">)</span>
                <span className="op">·</span>
                <span className="math-var">
                  ω<sub>1</sub>
                </span>
              </span>
            </div>
          </li>
          <li className="equation-item">
            <div className="equation-label">Speed magnitude (same for RPM)</div>
            <div className="equation-block" aria-label="magnitude omega two over magnitude omega one equals N one over N two">
              <span className="equation-expr">
                <span className="frac">
                  <span className="num">
                    |<span className="math-var">
                      ω<sub>2</sub>
                    </span>
                    |
                  </span>
                  <span className="den">
                    |<span className="math-var">
                      ω<sub>1</sub>
                    </span>
                    |
                  </span>
                </span>
                <span className="op">=</span>
                <span className="frac">
                  <span className="num">
                    <span className="math-var">
                      N<sub>1</sub>
                    </span>
                  </span>
                  <span className="den">
                    <span className="math-var">
                      N<sub>2</sub>
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </li>
          <li className="equation-item">
            <div className="equation-label">Torque (ideal, ignoring losses)</div>
            <div className="equation-block" aria-label="tau two equals negative N two over N one times tau one">
              <span className="equation-expr">
                <span className="math-var">
                  τ<sub>2</sub>
                </span>
                <span className="op">=</span>
                <span className="op">−</span>
                <span className="op">(</span>
                <span className="frac">
                  <span className="num">
                    <span className="math-var">
                      N<sub>2</sub>
                    </span>
                  </span>
                  <span className="den">
                    <span className="math-var">
                      N<sub>1</sub>
                    </span>
                  </span>
                </span>
                <span className="op">)</span>
                <span className="op">·</span>
                <span className="math-var">
                  τ<sub>1</sub>
                </span>
              </span>
            </div>
          </li>
          <li className="equation-item">
            <div className="equation-label">Power consistency (ideal)</div>
            <div className="equation-block" aria-label="P equals tau omega and tau one omega one approximately equals tau two omega two">
              <span className="equation-expr">
                <span className="math-var">P</span>
                <span className="op">=</span>
                <span className="math-var">τ</span>
                <span className="op">·</span>
                <span className="math-var">ω</span>
                <span className="op">,</span>
                <span className="op">so</span>
                <span className="math-var">
                  τ<sub>1</sub>
                </span>
                <span className="op">·</span>
                <span className="math-var">
                  ω<sub>1</sub>
                </span>
                <span className="op">≈</span>
                <span className="math-var">
                  τ<sub>2</sub>
                </span>
                <span className="op">·</span>
                <span className="math-var">
                  ω<sub>2</sub>
                </span>
              </span>
            </div>
          </li>
        </ul>
      </>
    ),
  },
]
