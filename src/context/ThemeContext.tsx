import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode } from '../utils/theme';
import { getStoredTheme, applyTheme, THEME_STORAGE_KEY } from '../utils/theme';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_CHANGED_EVENT = 'szut_mc_theme_changed';

// useSyncExternalStore preserves the server's dark snapshot during hydration,
// then reads the user's browser setting once hydration is complete.
function subscribeToTheme(listener: () => void) {
  window.addEventListener('storage', listener);
  window.addEventListener(THEME_CHANGED_EVENT, listener);
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener(THEME_CHANGED_EVENT, listener);
  };
}

const getServerTheme = (): ThemeMode => 'dark';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getStoredTheme, getServerTheme);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const resolvedIsDark = applyTheme(theme);
    setIsDark(resolvedIsDark);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const dark = applyTheme('system');
        setIsDark(dark);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    window.dispatchEvent(new Event(THEME_CHANGED_EVENT));
    const resolvedIsDark = applyTheme(newTheme);
    setIsDark(resolvedIsDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
