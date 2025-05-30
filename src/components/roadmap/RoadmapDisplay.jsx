import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import RoadmapCard from './RoadmapCard'

export default function RoadmapDisplay({ roadmap }) {
  const [completedItems, setCompletedItems] = useState([])
  const [expandedItems, setExpandedItems] = useState([])

  const handleToggleComplete = (index) => {
    setCompletedItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const handleToggleExpand = (index) => {
    setExpandedItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const calculateProgress = () => {
    if (!roadmap.length) return 0
    return Math.round((completedItems.length / roadmap.length) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Progress</h3>
          <span className="text-sm text-[var(--text-secondary)]">
            {completedItems.length} of {roadmap.length} completed
          </span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
          <motion.div 
            className="bg-primary-600 h-2.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {roadmap.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              border rounded-lg overflow-hidden transition-all duration-300
              ${completedItems.includes(index) 
                ? 'border-success-500 bg-success-50/50 dark:bg-success-900/10' 
                : 'border-neutral-200 dark:border-neutral-700 bg-[var(--bg-primary)]'}
            `}
          >
            <div className="flex items-start p-4">
              <button 
                onClick={() => handleToggleComplete(index)}
                className={`
                  flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 mt-1
                  ${completedItems.includes(index) 
                    ? 'bg-success-500 border-success-500 text-white' 
                    : 'border-neutral-300 dark:border-neutral-600'}
                `}
                aria-label={completedItems.includes(index) ? "Mark as incomplete" : "Mark as complete"}
              >
                {completedItems.includes(index) && <FiCheck size={14} />}
              </button>
              
              <div className="flex-grow">
                <RoadmapCard 
                  item={item} 
                  dayNumber={index + 1}
                  isCompleted={completedItems.includes(index)}
                  isExpanded={expandedItems.includes(index)}
                />
              </div>
              
              <button
                onClick={() => handleToggleExpand(index)}
                className="flex-shrink-0 p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mt-1"
                aria-label={expandedItems.includes(index) ? "Collapse" : "Expand"}
              >
                {expandedItems.includes(index) ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </button>
            </div>
            
            <AnimatePresence>
              {expandedItems.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 ml-9"
                >
                  <p className="text-[var(--text-secondary)] mb-3">{item.description}</p>
                  
                  {item.resources && item.resources.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-2">Resources:</h4>
                      <ul className="space-y-1">
                        {item.resources.map((resource, idx) => (
                          <li key={idx}>
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm transition-colors"
                            >
                              {resource.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}