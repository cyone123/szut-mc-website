import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { ThemeMode } from '../utils/theme';
import { sounds } from '../utils/audio';

export const ThemeToggle = () => {
  const { theme, isDark, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (mode: ThemeMode) => {
    sounds.playClick();
    setTheme(mode);
    setIsOpen(false);
  };

  const getActiveIcon = () => {
    if (theme === 'system') {
      return <Laptop className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
    }
    return isDark ? (
      <Moon className="w-4 h-4 text-amber-400" />
    ) : (
      <Sun className="w-4 h-4 text-amber-500" />
    );
  };

  const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: 'light', label: '浅色 (昼间)', icon: Sun },
    { mode: 'dark', label: '暗黑 (夜幕)', icon: Moon },
    { mode: 'system', label: '跟随系统', icon: Laptop },
  ];

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen)}
        }
        title={`切换主题模式（当前：${theme === 'light' ? '浅色' : theme === 'dark' ? '暗黑' : '跟随系统'}）`}
        className="p-2 border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-sm flex items-center gap-1"
        aria-label="切换主题"
      >
        {getActiveIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1 bg-white dark:bg-[#121622] border-2 border-slate-300 dark:border-slate-700 shadow-xl mc-border z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-pixel text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800">
            THEME 主题
          </div>
          {options.map(({ mode, label, icon: Icon }) => {
            const isSelected = theme === mode;
            return (
              <button
                key={mode}
                onClick={() => handleSelect(mode)}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-500' : 'text-slate-400'}`} />
                  <span className="font-sans">{label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
