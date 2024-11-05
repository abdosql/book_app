import React from 'react';
import { Book, ChevronDown, ChevronRight, BookOpen, Settings } from 'lucide-react';
import type { Course } from '../types';

interface SidebarProps {
  courses: Course[];
  activeCourse: string;
  activeChapter: string;
  onSelectChapter: (courseId: string, chapterId: string) => void;
  onToggleSettings: () => void;
}

export function Sidebar({
  courses,
  activeCourse,
  activeChapter,
  onSelectChapter,
  onToggleSettings,
}: SidebarProps) {
  const [expandedCourses, setExpandedCourses] = React.useState<Set<string>>(
    new Set([activeCourse])
  );

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-lg font-semibold dark:text-white">Reader</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {courses.map((course) => (
            <div key={course.id} className="mb-2">
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Book className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                {expandedCourses.has(course.id) ? (
                  <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-2 text-gray-500" />
                )}
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {course.title}
                </span>
              </button>
              
              {expandedCourses.has(course.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {course.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => onSelectChapter(course.id, chapter.id)}
                      className={`w-full text-left p-2 text-sm rounded-lg ${
                        activeChapter === chapter.id
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {chapter.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <button
        onClick={onToggleSettings}
        className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Settings
        </span>
      </button>
    </aside>
  );
}