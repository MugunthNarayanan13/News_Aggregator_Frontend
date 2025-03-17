"use client";
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
const ThemeContext = createContext({ theme: 'light', setTheme: (theme: string) => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Check localStorage for the theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Default to light theme if nothing is stored
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        // Apply the theme to the body or html element
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
