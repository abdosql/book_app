import React from 'react';
import { Moon, Sun, Minus, Plus } from 'lucide-react';
import type { ReaderSettings } from '../types';

interface SettingsProps {
  settings: ReaderSettings;
  onUpdateSettings: (settings: ReaderSettings) => void;
  onClose: () => void;
}

export function Settings({ settings, onUpdateSettings, onClose }: SettingsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Font Size
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onUpdateSettings({
                    ...settings,
                    fontSize: Math.max(12, settings.fontSize - 1)
                  })}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Minus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-lg font-medium dark:text-white">
                  {settings.fontSize}px
                </span>
                <button
                  onClick={() => onUpdateSettings({
                    ...settings,
                    fontSize: Math.min(24, settings.fontSize + 1)
                  })}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <button
                onClick={() => onUpdateSettings({
                  ...settings,
                  isDarkMode: !settings.isDarkMode
                })}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {settings.isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}