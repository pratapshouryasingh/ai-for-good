import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBookOpen, FiClock, FiUser, FiSend } from 'react-icons/fi'

const skillLevels = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' }
]

const timeOptions = [
  { id: '1-hour-daily', label: '1 hour daily' },
  { id: '2-hours-daily', label: 'About 2 hours daily' },
  { id: '5-hours-weekly', label: 'About 5 hours weekly' },
  { id: '10-hours-weekly', label: 'About 10 hours weekly' },
  { id: 'weekends-only', label: 'Weekends only' },
  { id: 'custom', label: 'Custom' }
]

export default function UserForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    goal: '',
    skillLevel: 'beginner',
    timeCommitment: '1-hour-daily',
    customTime: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Format time commitment
    let timeCommitment = formData.timeCommitment
    if (timeCommitment === 'custom' && formData.customTime) {
      timeCommitment = formData.customTime
    } else {
      timeCommitment = timeOptions.find(option => option.id === formData.timeCommitment)?.label
    }
    
    onSubmit({
      goal: formData.goal,
      skillLevel: skillLevels.find(level => level.id === formData.skillLevel)?.label,
      timeCommitment
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="goal" className="block text-[var(--text-primary)] font-medium mb-2">
            <div className="flex items-center">
              <FiBookOpen className="mr-2 text-primary-500" />
              What do you want to learn?
            </div>
          </label>
          <textarea
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            placeholder="I want to learn React.js to build web applications"
            required
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200 resize-none"
          />
        </div>

        <div>
          <label htmlFor="skillLevel" className="block text-[var(--text-primary)] font-medium mb-2">
            <div className="flex items-center">
              <FiUser className="mr-2 text-secondary-500" />
              Your current skill level
            </div>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {skillLevels.map((level) => (
              <label 
                key={level.id}
                className={`
                  flex items-center justify-center px-4 py-3 rounded-lg border transition-all duration-200 cursor-pointer
                  ${formData.skillLevel === level.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'border-neutral-300 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700'}
                `}
              >
                <input
                  type="radio"
                  name="skillLevel"
                  value={level.id}
                  checked={formData.skillLevel === level.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="timeCommitment" className="block text-[var(--text-primary)] font-medium mb-2">
            <div className="flex items-center">
              <FiClock className="mr-2 text-accent-500" />
              How much time can you commit?
            </div>
          </label>
          <select
            id="timeCommitment"
            name="timeCommitment"
            value={formData.timeCommitment}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
          >
            {timeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          
          {formData.timeCommitment === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <input
                type="text"
                name="customTime"
                value={formData.customTime}
                onChange={handleChange}
                placeholder="e.g., 3 hours on weekdays, 5 hours on weekends"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
              />
            </motion.div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading || !formData.goal.trim()}
          className={`
            w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center space-x-2
            ${isLoading || !formData.goal.trim() 
              ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-700 text-white transition-colors'}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4\" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating Roadmap...</span>
            </>
          ) : (
            <>
              <FiSend size={18} />
              <span>Generate Your Roadmap</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}