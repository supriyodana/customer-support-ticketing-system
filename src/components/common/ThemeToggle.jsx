import React from "react";
import {Sun, Moon} from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";



export default function ThemeToggle({ className = ''}){
    const {theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const icon = isDark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>;
    const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
 
    return(
        <button
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className={`cursor-pointer inline-flex items-center gap-2 px-2 py-2 rounded border focus:outline-none  transition ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} ${className}`}   //focus:ring
        >
            {icon}
            <span className="hidden sm:inline text-sm lg:text-base">{isDark? 'Light' : 'Dark'}</span>
        </button>
    );
}
