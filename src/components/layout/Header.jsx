import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-[var(--bg-secondary)] shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="text-primary-600 text-2xl font-bold">LearningPath</span>
          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-md">AI</span>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)]"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>
        </div>
      </div>
    </header>
  )
}