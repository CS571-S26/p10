import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

export default function ExportPdfButton({
  teethList,
  drivingTeeth,
  drivenTeeth,
  drivingRpm,
  moduleMm,
  stageEfficiency,
  className = 'mb-3',
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const { downloadGearReportPdf } = await import('../lib/pdfExport')
      downloadGearReportPdf({
        teethList,
        drivingTeeth,
        drivenTeeth,
        drivingRpm,
        moduleMm,
        stageEfficiency,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline-dark"
      className={className}
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <Spinner animation="border" size="sm" className="me-2" aria-hidden />
          Preparing PDF…
        </>
      ) : (
        'Download PDF report'
      )}
    </Button>
  )
}
