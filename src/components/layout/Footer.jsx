import { FiGithub, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] py-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--text-secondary)] text-sm">
            © {new Date().getFullYear()} LearningPath AI. All rights reserved.
          </p>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-primary-500 transition duration-300"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <span className="text-[var(--text-secondary)] text-sm flex items-center">
              Made with <FiHeart className="mx-1 text-error-500" /> for lifelong learners
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}