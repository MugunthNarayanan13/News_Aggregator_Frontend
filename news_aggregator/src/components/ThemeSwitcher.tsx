"use client";
import React from 'react';
import { useTheme } from '../context/themeContext';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    // return (
    //     <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-200 dark:bg-gray-800">
    //         {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    //     </button>
    // );
    return (
        <button onClick={toggleTheme} className="text-2xl">
            {theme === 'light' ? '🌙' : '🌞'}
        </button>
    );
};

export default ThemeSwitcher;
