/**
 * Geometry for drawing meshing gears: pitch radii and center positions.
 * Assumes same module (diametral pitch) so radius is proportional to tooth count.
 */

const BASE_RADIUS = 25
const MIN_TEETH = 8
const MAX_TEETH = 120

/**
 * Pitch radius for a gear (proportional to tooth count for same module).
 * @param {number} teeth
 * @returns {number}
 */
export function pitchRadius(teeth) {
  const t = Math.max(MIN_TEETH, Math.min(MAX_TEETH, teeth))
  return BASE_RADIUS * (t / 20)
}

/**
 * Centers for N meshing gears in a row (external mesh, tangent pitch circles).
 * @param {number[]} teethPerGear
 * @returns {{ x: number, y: number, radius: number }[]}
 */
export function gearCenters(teethPerGear) {
  if (!teethPerGear || teethPerGear.length === 0) return []
  const radii = teethPerGear.map(pitchRadius)
  const centers = []
  let x = radii[0]
  const y = 0
  for (let i = 0; i < radii.length; i++) {
    centers.push({ x, y, radius: radii[i] })
    if (i < radii.length - 1) {
      x += radii[i] + radii[i + 1]
    }
  }
  return centers
}

/**
 * Scale and offset to fit a list of centers into a given width/height.
 * @param {{ x: number, y: number, radius: number }[]} centers
 * @param {number} width
 * @param {number} height
 * @returns {{ centers: { x: number, y: number, radius: number }[], scale: number }}
 */
export function fitInView(centers, width, height) {
  if (centers.length === 0) return { centers: [], scale: 1 }
  const totalWidth = centers.length > 0
    ? centers[centers.length - 1].x + centers[centers.length - 1].radius - (centers[0].x - centers[0].radius)
    : 0
  const maxRadius = Math.max(...centers.map((c) => c.radius))
  const needHeight = maxRadius * 2 + 40
  const needWidth = totalWidth + 80
  const scale = Math.min(width / needWidth, height / needHeight, 2)
  const minX = centers[0].x - centers[0].radius
  const offsetX = (width / scale - totalWidth - 80) / 2 + 40 - minX
  const offsetY = height / scale / 2
  const scaled = centers.map((c) => ({
    x: c.x + offsetX,
    y: c.y + offsetY,
    radius: c.radius,
  }))
  return { centers: scaled, scale }
}
