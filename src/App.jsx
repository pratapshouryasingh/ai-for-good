import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'
import ThemeProvider from './context/ThemeContext'
import './styles/App.css'

function App() {
  const [roadmapData, setRoadmapData] = useState(null)

  const handleRoadmapGenerated = (data) => {
    setRoadmapData(data)
  }

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage onRoadmapGenerated={handleRoadmapGenerated} />
                } 
              />
              <Route 
                path="/roadmap" 
                element={
                  <RoadmapPage roadmapData={roadmapData} />
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App