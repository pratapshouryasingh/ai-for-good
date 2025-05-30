import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiFilter } from 'react-icons/fi'

export default function ResourceList({ resources }) {
  const [filter, setFilter] = useState('all')
  
  if (!resources || resources.length === 0) {
    return (
      <p className="text-[var(--text-secondary)]">No resources available.</p>
    )
  }

  // Get unique resource types
  const resourceTypes = ['all', ...new Set(resources.map(resource => resource.type))]
  
  // Filter resources based on selected type
  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === filter)

  return (
    <div>
      <div className="flex items-center mb-4 overflow-x-auto pb-2">
        <FiFilter className="mr-2 text-[var(--text-secondary)]" />
        
        {resourceTypes.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`
              mr-2 px-3 py-1 text-sm rounded-full whitespace-nowrap
              ${filter === type 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'}
            `}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource, index) => (
          <motion.a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 bg-[var(--bg-primary)]"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium group-hover:text-primary-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mt-1">
                  {resource.description}
                </p>
              </div>
              <FiExternalLink className="text-[var(--text-secondary)] group-hover:text-primary-600 transition-colors" />
            </div>
            <div className="mt-3 flex items-center">
              <span className={`
                text-xs font-medium px-2 py-0.5 rounded-full
                ${getResourceTypeColor(resource.type)}
              `}>
                {resource.type}
              </span>
              {resource.difficulty && (
                <span className="text-xs text-[var(--text-secondary)] ml-2">
                  {resource.difficulty} level
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

function getResourceTypeColor(type) {
  switch (type?.toLowerCase()) {
    case 'video':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'article':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'tutorial':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'course':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'documentation':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'tool':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
}