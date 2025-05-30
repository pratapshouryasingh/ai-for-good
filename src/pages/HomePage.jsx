import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import UserForm from '../components/form/UserForm'
import { generateRoadmap } from '../services/api'

export default function HomePage({ onRoadmapGenerated }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    try {
      // In a real application, you would call the GPT API here
      const roadmap = await generateRoadmap(formData)
      onRoadmapGenerated(roadmap)
      navigate('/roadmap')
    } catch (error) {
      console.error('Error generating roadmap:', error)
      alert('Failed to generate roadmap. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
          Your Personalized Learning Journey
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Tell us what you want to learn, and we'll create a custom roadmap with free resources to help you succeed.
        </p>
      </motion.div>

      <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 bg-[var(--bg-secondary)] p-6 rounded-lg shadow-sm"
      >
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 mb-4">1</div>
            <h3 className="text-lg font-medium mb-2">Share Your Goal</h3>
            <p className="text-[var(--text-secondary)]">Tell us what you want to learn and your current skill level.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center text-secondary-600 mb-4">2</div>
            <h3 className="text-lg font-medium mb-2">Set Your Schedule</h3>
            <p className="text-[var(--text-secondary)]">Let us know how much time you can commit to learning.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center text-accent-600 mb-4">3</div>
            <h3 className="text-lg font-medium mb-2">Get Your Roadmap</h3>
            <p className="text-[var(--text-secondary)]">Receive a personalized learning plan with free resources.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}