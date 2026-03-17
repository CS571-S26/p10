import PageLayout from '../components/PageLayout'
import EducationSection from '../components/EducationSection'

export default function LearnPage() {
  return (
    <PageLayout
      title="Gear Terminology"
      titleId="learn-page-heading"
      subtitle="Definitions and relationships for gear ratio, speed ratio, torque, and pitch circle."
    >
      <EducationSection />
    </PageLayout>
  )
}
