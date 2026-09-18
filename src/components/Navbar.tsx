import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Users, Compass, Server, BookOpen, Vote, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenJoin: () => void;
  serverOnline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin, serverOnline = true }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMuted(sounds.getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = sounds.toggleMute();
    setIsMuted(newState);
    if (!newState) {
      sounds.playClick();
    }
  };

  const navLinks = [
    { label: '状态雷达', href: '#server-radar', icon: Server, isExternal: false },
    { label: '社群分部', href: '#community', icon: Compass, isExternal: false },
    { label: '特色玩法', href: '#servers', icon: BookOpen, isExternal: false },
    { label: '周目公投', href: 'https://vote.szut-mc.cc.cd', icon: Vote, isExternal: true, badge: 'VOTE' },
    { label: '入坑指南', href: '#guide', icon: Users, isExternal: false },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0d1017]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-md py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#" 
          onClick={() => sounds.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)] overflow-hidden transition-transform group-hover:scale-105">
            <img
              src="/szut-mc-logo.png"
              alt="SZUT Minecraft Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-bold tracking-wider">
                SZUT-MC
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                苏工院
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans tracking-tight">
              苏州工学院 MC 交流组织
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all font-sans font-medium relative group"
            >
              <link.icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 text-cyan-600 dark:text-cyan-400" />
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-1 py-0.2 text-[8px] font-pixel font-bold bg-amber-400 text-black shadow-xs">
                  {link.badge}
                </span>
              )}
              {link.isExternal && (
                <ExternalLink className="w-2.5 h-2.5 opacity-50 ml-0.5" />
              )}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? '开启原版游戏音效' : '静音音效'}
            className="p-2 border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            )}
          </button>

          {/* Quick Server Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 dark:border-slate-800 bg-slate-100/90 dark:bg-[#161b26] text-xs font-mono">
            <span
              className={`w-2 h-2 rounded-none inline-block ${
                serverOnline
                  ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse'
                  : 'bg-rose-500'
              }`}
            />
            <span className="text-slate-700 dark:text-slate-300 text-[11px]">
              {serverOnline ? '服务器运行中' : '服务器离线'}
            </span>
          </div>

          {/* Join CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenJoin();
            }}
            className="mc-button mc-button-emerald text-xs py-2 px-3 sm:px-4 flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>加入社群</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0d1017]/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-2 mt-2 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <link.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{link.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[8px] font-pixel font-bold bg-amber-400 text-black">
                    {link.badge}
                  </span>
                )}
                {link.isExternal && (
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                )}
              </div>
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-3">
            <span>服务器: nop.mc6.cn:33735</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">Fabric 26.3</span>
          </div>
        </div>
      )}
    </nav>
  );
};
