import { useRef, useEffect, useCallback } from 'react'
import { gearCenters, fitInView } from '../lib/gearGeometry'

function drawGear(ctx, cx, cy, radius, teeth, rotation) {
  const n = Math.max(8, Math.min(120, Math.round(teeth)))
  const outerR = radius
  const rootR = radius * 0.72
  const hubR = radius * 0.38
  const toothTipAngle = (2 * Math.PI) / n

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rotation)
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  // Gear body — metallic gray gradient (top-left light, bottom-right dark)
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const a0 = i * toothTipAngle - toothTipAngle / 2
    const a1 = i * toothTipAngle
    const a2 = i * toothTipAngle + toothTipAngle / 2
    if (i === 0) ctx.moveTo(outerR * Math.cos(a0), outerR * Math.sin(a0))
    ctx.lineTo(outerR * Math.cos(a0), outerR * Math.sin(a0))
    ctx.lineTo(outerR * Math.cos(a1), outerR * Math.sin(a1))
    ctx.lineTo(rootR * Math.cos(a2), rootR * Math.sin(a2))
  }
  ctx.closePath()
  const bodyGradient = ctx.createLinearGradient(-radius * 0.8, -radius * 0.8, radius * 0.8, radius * 0.8)
  bodyGradient.addColorStop(0, '#cbd5e1')
  bodyGradient.addColorStop(0.35, '#94a3b8')
  bodyGradient.addColorStop(0.65, '#64748b')
  bodyGradient.addColorStop(1, '#475569')
  ctx.fillStyle = bodyGradient
  ctx.fill()
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 1
  ctx.stroke()

  // Outer rim highlight (thin arc for metallic edge)
  ctx.beginPath()
  ctx.arc(0, 0, outerR, 0, 2 * Math.PI)
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  // Center hub — darker gray, slightly recessed look
  ctx.beginPath()
  ctx.arc(0, 0, hubR, 0, 2 * Math.PI)
  const hubGradient = ctx.createRadialGradient(-hubR * 0.4, -hubR * 0.4, 0, 0, 0, hubR)
  hubGradient.addColorStop(0, '#94a3b8')
  hubGradient.addColorStop(0.6, '#64748b')
  hubGradient.addColorStop(1, '#475569')
  ctx.fillStyle = hubGradient
  ctx.fill()
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 1
  ctx.stroke()

  // Center hole (shaft bore)
  ctx.beginPath()
  ctx.arc(0, 0, hubR * 0.5, 0, 2 * Math.PI)
  ctx.fillStyle = '#1e293b'
  ctx.fill()
  ctx.strokeStyle = '#0f172a'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.restore()
}

export default function GearCanvas({ gears }) {
  const canvasRef = useRef(null)
  const animRef = useRef(0)
  const rotationRef = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !gears || gears.length === 0) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const teethList = gears.map((g) => g.teeth)
    const centers = gearCenters(teethList)
    const { centers: scaled, scale } = fitInView(centers, width, height)
    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.scale(scale, scale)
    const t = rotationRef.current
    scaled.forEach((c, i) => {
      let angle = t
      if (i > 0) {
        const ratio = teethList[0] / teethList[i]
        angle = (i % 2 === 0 ? 1 : -1) * t * ratio
      }
      drawGear(ctx, c.x, c.y, c.radius, teethList[i], angle)
    })
    ctx.restore()
  }, [gears])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      draw()
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [draw])

  useEffect(() => {
    const tick = () => {
      rotationRef.current += 0.02
      draw()
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  if (!gears || gears.length === 0) {
    return (
      <p className="text-muted" role="status">
        Enter at least two gears above to view the visualization.
      </p>
    )
  }

  return (
    <div className="gear-canvas-wrapper border rounded bg-light" style={{ minHeight: 280 }}>
      <canvas
        ref={canvasRef}
        className="w-100"
        style={{ display: 'block', width: '100%', height: 280 }}
        aria-label="Live animation of meshing gears rotating according to the calculated gear ratio"
        role="img"
      />
    </div>
  )
}
