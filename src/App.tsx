import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Reader } from './components/Reader';
import { Settings } from './components/Settings';
import type { Course, ReaderSettings } from './types';

// Sample data - replace with your actual content
const sampleCourses: Course[] = [
  {
    id: 'react-basics',
    title: 'React Basics',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction to React',
        content: `# Introduction to React

React is a JavaScript library for building user interfaces. Let's explore its core concepts:

## Components

Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

## State and Props

React components can have state and receive props:

- **Props** are read-only and passed from parent to child
- **State** is managed within the component

## Hooks

Hooks let you use state and other React features without writing class components:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`
`
      },
      {
        id: 'jsx',
        title: 'Understanding JSX',
        content: '# Understanding JSX...'
      }
    ]
  },
  {
    id: 'advanced-react',
    title: 'Advanced React',
    chapters: [
      {
        id: 'context',
        title: 'Context API',
        content: '# Context API...'
      },
      {
        id: 'performance',
        title: 'Performance Optimization',
        content: '# Performance Optimization...'
      }
    ]
  }
];

function App() {
  const [activeCourse, setActiveCourse] = React.useState(sampleCourses[0].id);
  const [activeChapter, setActiveChapter] = React.useState(sampleCourses[0].chapters[0].id);
  const [showSettings, setShowSettings] = React.useState(false);
  const [settings, setSettings] = React.useState<ReaderSettings>({
    fontSize: 16,
    isDarkMode: false,
  });

  const currentChapter = React.useMemo(() => {
    const course = sampleCourses.find(c => c.id === activeCourse);
    return course?.chapters.find(ch => ch.id === activeChapter);
  }, [activeCourse, activeChapter]);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.isDarkMode);
  }, [settings.isDarkMode]);

  const handleChapterSelect = (courseId: string, chapterId: string) => {
    setActiveCourse(courseId);
    setActiveChapter(chapterId);
  };

  if (!currentChapter) return null;

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${
      settings.isDarkMode ? 'dark' : ''
    }`}>
      <Sidebar
        courses={sampleCourses}
        activeCourse={activeCourse}
        activeChapter={activeChapter}
        onSelectChapter={handleChapterSelect}
        onToggleSettings={() => setShowSettings(true)}
      />
      <Reader
        chapter={currentChapter}
        fontSize={settings.fontSize}
      />
      {showSettings && (
        <Settings
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;