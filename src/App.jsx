import { Routes, Route, Navigate } from 'react-router-dom'
import { GearStateProvider } from './context/GearStateContext'
import NavBar from './components/NavBar'
import CalculatorPage from './pages/CalculatorPage'
import LearnPage from './pages/LearnPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <GearStateProvider>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<CalculatorPage />} />
            <Route path="/visualizer" element={<Navigate to="/" replace />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </GearStateProvider>
  )
}

export default App
