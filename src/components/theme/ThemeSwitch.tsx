import React from 'react';
import { Button } from '../core';
import { useTheme } from '../../context/theme-context';
import { Moon, Sun } from '../icons';

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      onClick={toggleTheme}
      startContent={theme === 'light' ? <Moon /> : <Sun />}
      iconOnly
      variant="ghost"
      className={className}
    />
  );
};

export default ThemeSwitch;
