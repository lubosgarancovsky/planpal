import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../../context/theme-context';

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

const getDefaultTheme = () => {
  const storedTheme = localStorage.getItem('gb-todo-theme');

  if (storedTheme) {
    return storedTheme as 'light' | 'dark';
  }

  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  return 'light';
};

const ThemeProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getDefaultTheme());

  const toggleTheme = () => {
    setTheme((p) => {
      const newTheme = p === 'light' ? 'dark' : 'light';
      localStorage.setItem('gb-todo-theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme || 'light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
