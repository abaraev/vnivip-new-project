import { createContext } from 'react';

export enum Theme {
    NORMAL = 'app_normal_theme',
    ACCESSIBILITY = 'app_accessibility_theme',
}

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
