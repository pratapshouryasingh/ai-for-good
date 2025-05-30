// This is a mock API service that simulates calls to the GPT API
// In a real application, you would replace this with actual API calls
//can use this code to execute
/* import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateRoadmap = async (goal, skillLevel, timeCommitment) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a learning roadmap for someone who wants to ${goal}. 
      Their current skill level is ${skillLevel} and they can commit ${timeCommitment} hours per week. 
      Include specific daily tasks and recommend free online resources for each topic.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error('Failed to generate roadmap. Please try again.');
  }
}; */

export async function generateRoadmap(formData) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock response based on the user's input
  return {
    goal: formData.goal,
    skillLevel: formData.skillLevel,
    timeCommitment: formData.timeCommitment,
    roadmap: generateMockRoadmap(formData),
    resources: generateMockResources(formData)
  }
}

function generateMockRoadmap(formData) {
  // Create a mock roadmap based on the learning goal
  const roadmap = []
  const isDaily = formData.timeCommitment.includes('daily')
  const timeUnit = isDaily ? 'Day' : 'Week'
  const goal = formData.goal.toLowerCase()
  
  // Generate different roadmaps based on the learning goal
  if (goal.includes('react')) {
    roadmap.push(
      {
        title: 'JavaScript Fundamentals Review',
        description: 'Refresh your knowledge of JavaScript fundamentals including variables, functions, arrays, and objects.',
        timeUnit,
        resources: [
          { title: 'JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
          { title: 'Modern JavaScript Tutorial', url: 'https://javascript.info/' }
        ]
      },
      {
        title: 'React Core Concepts',
        description: 'Learn about React components, JSX syntax, and props.',
        timeUnit,
        resources: [
          { title: 'React Official Documentation', url: 'https://react.dev/learn' },
          { title: 'React Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' }
        ]
      },
      {
        title: 'State and Lifecycle',
        description: 'Understand React state, hooks, and component lifecycle.',
        timeUnit,
        resources: [
          { title: 'React Hooks Documentation', url: 'https://react.dev/reference/react' },
          { title: 'useState and useEffect Explained', url: 'https://www.youtube.com/watch?v=O6P86uwfdR0' }
        ]
      },
      {
        title: 'Building Your First React App',
        description: 'Create a simple to-do application using React and practice what you\'ve learned.',
        timeUnit,
        resources: [
          { title: 'Build a Todo App with React', url: 'https://www.youtube.com/watch?v=pCA4qpQDZD8' }
        ]
      },
      {
        title: 'React Router',
        description: 'Learn about client-side routing in React applications.',
        timeUnit,
        resources: [
          { title: 'React Router Documentation', url: 'https://reactrouter.com/en/main' }
        ]
      },
      {
        title: 'State Management',
        description: 'Explore state management solutions such as Context API and Redux.',
        timeUnit,
        resources: [
          { title: 'Context API Tutorial', url: 'https://www.youtube.com/watch?v=35lXWvCuM8o' },
          { title: 'Redux Documentation', url: 'https://redux.js.org/' }
        ]
      },
      {
        title: 'React Project: Portfolio Website',
        description: 'Apply your knowledge by building a personal portfolio website with React.',
        timeUnit,
        resources: [
          { title: 'Build a Portfolio with React', url: 'https://www.youtube.com/watch?v=bmpI252DmiI' }
        ]
      }
    )
  } else if (goal.includes('python')) {
    roadmap.push(
      {
        title: 'Python Basics',
        description: 'Learn Python syntax, variables, data types, and basic operations.',
        timeUnit,
        resources: [
          { title: 'Python for Beginners', url: 'https://www.python.org/about/gettingstarted/' },
          { title: 'Python Crash Course', url: 'https://www.youtube.com/watch?v=JJmcL1N2KQs' }
        ]
      },
      {
        title: 'Control Flow and Functions',
        description: 'Master if-else statements, loops, and function definitions in Python.',
        timeUnit,
        resources: [
          { title: 'Python Control Flow', url: 'https://realpython.com/python-conditional-statements/' }
        ]
      },
      {
        title: 'Data Structures',
        description: 'Learn about lists, dictionaries, sets, and tuples in Python.',
        timeUnit,
        resources: [
          { title: 'Python Data Structures', url: 'https://docs.python.org/3/tutorial/datastructures.html' }
        ]
      },
      {
        title: 'File Handling and Exceptions',
        description: 'Understand how to read/write files and handle exceptions in Python.',
        timeUnit,
        resources: [
          { title: 'Python Exception Handling', url: 'https://realpython.com/python-exceptions/' }
        ]
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Learn about classes, objects, inheritance, and polymorphism in Python.',
        timeUnit,
        resources: [
          { title: 'OOP in Python', url: 'https://realpython.com/python3-object-oriented-programming/' }
        ]
      },
      {
        title: 'Python Project: Command Line Application',
        description: 'Build a command-line application to practice your Python skills.',
        timeUnit,
        resources: [
          { title: 'Building CLI Apps with Python', url: 'https://realpython.com/command-line-interfaces-python-argparse/' }
        ]
      }
    )
  } else {
    // Generic learning roadmap
    roadmap.push(
      {
        title: 'Understanding the Basics',
        description: `Familiarize yourself with the fundamental concepts of ${formData.goal}.`,
        timeUnit,
        resources: [
          { title: 'Introduction to the Field', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      },
      {
        title: 'Core Principles and Techniques',
        description: 'Develop a deeper understanding of the key principles.',
        timeUnit,
        resources: [
          { title: 'Core Concepts Guide', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      },
      {
        title: 'Practical Application',
        description: 'Apply what you have learned to solve real-world problems.',
        timeUnit,
        resources: [
          { title: 'Hands-on Tutorial', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      },
      {
        title: 'Advanced Topics',
        description: 'Explore more complex topics and specialized areas.',
        timeUnit,
        resources: [
          { title: 'Advanced Guide', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      },
      {
        title: 'Project Work',
        description: 'Build a project to consolidate your knowledge and skills.',
        timeUnit,
        resources: [
          { title: 'Project Ideas', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      }
    )
  }
  
  return roadmap
}

function generateMockResources(formData) {
  // Create mock resources based on the learning goal
  const goal = formData.goal.toLowerCase()
  const resources = []
  
  if (goal.includes('react')) {
    resources.push(
      {
        title: 'React Documentation',
        description: 'Official React documentation with guides and API references',
        url: 'https://react.dev',
        type: 'documentation',
        difficulty: 'all'
      },
      {
        title: 'React for Beginners',
        description: 'A complete introduction to React with practical examples',
        url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        type: 'video',
        difficulty: 'beginner'
      },
      {
        title: 'React Hooks Course',
        description: 'In-depth guide to React Hooks and functional components',
        url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
        type: 'course',
        difficulty: 'intermediate'
      },
      {
        title: 'Building a Full-Stack App with React',
        description: 'Learn to build a complete application with React and a backend',
        url: 'https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/',
        type: 'tutorial',
        difficulty: 'advanced'
      },
      {
        title: 'React Design Patterns',
        description: 'Advanced patterns and best practices for React applications',
        url: 'https://www.patterns.dev/react',
        type: 'article',
        difficulty: 'advanced'
      },
      {
        title: 'React DevTools',
        description: 'Browser extension for debugging React applications',
        url: 'https://react.dev/learn/react-developer-tools',
        type: 'tool',
        difficulty: 'all'
      }
    )
  } else if (goal.includes('python')) {
    resources.push(
      {
        title: 'Python.org',
        description: 'Official Python documentation and tutorials',
        url: 'https://www.python.org',
        type: 'documentation',
        difficulty: 'all'
      },
      {
        title: 'Python Crash Course',
        description: 'Quick introduction to Python programming',
        url: 'https://www.youtube.com/watch?v=JJmcL1N2KQs',
        type: 'video',
        difficulty: 'beginner'
      },
      {
        title: 'Automate the Boring Stuff with Python',
        description: 'Free online book teaching practical Python programming',
        url: 'https://automatetheboringstuff.com/',
        type: 'course',
        difficulty: 'beginner'
      },
      {
        title: 'Python Data Science Handbook',
        description: 'In-depth guide to data analysis with Python',
        url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
        type: 'book',
        difficulty: 'intermediate'
      },
      {
        title: 'Real Python',
        description: 'Python tutorials for all skill levels',
        url: 'https://realpython.com/',
        type: 'tutorial',
        difficulty: 'all'
      },
      {
        title: 'PyCharm IDE',
        description: 'Popular integrated development environment for Python',
        url: 'https://www.jetbrains.com/pycharm/',
        type: 'tool',
        difficulty: 'all'
      }
    )
  } else {
    // Generic resources
    resources.push(
      {
        title: 'Khan Academy',
        description: 'Free educational platform with courses on many subjects',
        url: 'https://www.khanacademy.org/',
        type: 'course',
        difficulty: 'beginner'
      },
      {
        title: 'Coursera',
        description: 'Online platform offering courses from top universities',
        url: 'https://www.coursera.org/',
        type: 'course',
        difficulty: 'all'
      },
      {
        title: 'freeCodeCamp',
        description: 'Free coding challenges and tutorials',
        url: 'https://www.freecodecamp.org/',
        type: 'tutorial',
        difficulty: 'all'
      },
      {
        title: 'edX',
        description: 'Free online courses from top universities',
        url: 'https://www.edx.org/',
        type: 'course',
        difficulty: 'all'
      },
      {
        title: 'MIT OpenCourseWare',
        description: 'Free course materials from MIT',
        url: 'https://ocw.mit.edu/',
        type: 'course',
        difficulty: 'intermediate'
      },
      {
        title: 'YouTube Learning',
        description: 'Educational content on a wide range of topics',
        url: 'https://www.youtube.com/learning',
        type: 'video',
        difficulty: 'all'
      }
    )
  }
  
  return resources
}