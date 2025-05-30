import React from 'react'

export default function RoadmapCard({ item, dayNumber, isCompleted, isExpanded }) {
  // Determine if we're showing days or weeks based on the roadmap structure
  const timeUnit = item.timeUnit || 'Day'
  
  return (
    <div className={`${isCompleted ? 'opacity-80' : ''}`}>
      <div className="flex items-center mb-1">
        <span className={`
          text-xs font-medium px-2 py-0.5 rounded-full mr-2
          ${isCompleted 
            ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200' 
            : 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'}
        `}>
          {timeUnit} {dayNumber}
        </span>
        <h3 className={`font-medium ${isCompleted ? 'line-through' : ''}`}>
          {item.title}
        </h3>
      </div>
      
      {!isExpanded && (
        <p className="text-[var(--text-secondary)] text-sm truncate">
          {item.description}
        </p>
      )}
    </div>
  )
}