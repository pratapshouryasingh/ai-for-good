import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import RoadmapDisplay from '../components/roadmap/RoadmapDisplay'
import ResourceList from '../components/resources/ResourceList'
import { FiArrowLeft, FiDownload, FiCopy } from 'react-icons/fi'

export default function RoadmapPage({ roadmapData }) {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to home if no roadmap data is available
    if (!roadmapData) {
      navigate('/')
    }
  }, [roadmapData, navigate])

  if (!roadmapData) return null

  const handleCopyToClipboard = () => {
    // Format roadmap data as text for clipboard
    const roadmapText = formatRoadmapAsText(roadmapData)
    navigator.clipboard.writeText(roadmapText)
      .then(() => alert('Roadmap copied to clipboard!'))
      .catch(err => console.error('Failed to copy roadmap:', err))
  }

  const handleDownload = () => {
    // Format roadmap data as text for download
    const roadmapText = formatRoadmapAsText(roadmapData)
    const blob = new Blob([roadmapText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'learning-roadmap.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatRoadmapAsText = (data) => {
    // Convert roadmap data to plain text format
    let text = `LEARNING ROADMAP: ${data.goal}\n\n`
    text += `Skill Level: ${data.skillLevel}\n`
    text += `Time Commitment: ${data.timeCommitment}\n\n`
    
    data.roadmap.forEach((item, index) => {
      text += `DAY/WEEK ${index + 1}: ${item.title}\n`
      text += `${item.description}\n`
      if (item.resources && item.resources.length) {
        text += 'Resources:\n'
        item.resources.forEach(resource => {
          text += `- ${resource.title}: ${resource.url}\n`
        })
      }
      text += '\n'
    })
    
    return text
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Form
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6 mb-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{roadmapData.goal}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-sm px-3 py-1 rounded-full">
                {roadmapData.skillLevel}
              </span>
              <span className="bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200 text-sm px-3 py-1 rounded-full">
                {roadmapData.timeCommitment}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyToClipboard}
              className="flex items-center px-3 py-2 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Copy to clipboard"
            >
              <FiCopy className="mr-2" /> Copy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
              aria-label="Download roadmap"
            >
              <FiDownload className="mr-2" /> Download
            </motion.button>
          </div>
        </div>

        <RoadmapDisplay roadmap={roadmapData.roadmap} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Recommended Resources</h2>
        <ResourceList resources={roadmapData.resources} />
      </motion.div>
    </div>
  )
}