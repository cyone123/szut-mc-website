import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Copy, Check, Users, Sparkles, Server, ArrowDown } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeroProps {
  onOpenJoin: () => void;
  serverAddress: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin, serverAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyIp = () => {
    sounds.playLevelUp();
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);

    // Fire celebratory Minecraft-styled confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#55ffff', '#55ff55', '#ffaa00', '#ffffff'],
        shapes: ['square'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 bg-cyan-400 animate-ping rounded-none" />
              <span>SZUT · 苏州工学院学生组织</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400">官方 Minecraft 基地</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
                用方块，构建我们的
                <span className="block mt-1 font-pixel text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 filter drop-shadow-[0_2px_15px_rgba(6,182,212,0.4)] text-2xl sm:text-4xl lg:text-5xl pt-2">
                  苏工院宇宙
                </span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed pt-2">
                从南大门到湖畔图书馆，从生存开荒到硬核生电工程。属于苏州工学院人的 Minecraft 交流组织与校园生存服，欢迎每一位热爱建造、探索与自动化的方块特工！
              </p>
            </div>

            {/* Server IP Copy Box */}
            <div className="p-4 bg-[#141923]/90 border-2 border-slate-700 max-w-xl mc-border shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 font-mono">
                  <Server className="w-3.5 h-3.5 text-cyan-400" /> Java版服务器直连地址
                </span>
                <span className="text-emerald-400 font-mono text-[11px] bg-emerald-950/60 px-2 py-0.5 border border-emerald-800">
                  Fabric 26.3 · 纯净生存
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 bg-black/60 px-4 py-3 border border-slate-700/80 font-code text-sm sm:text-base text-cyan-300 font-bold select-all tracking-wider flex items-center justify-between">
                  <span>{serverAddress}</span>
                  <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">端口: 33735</span>
                </div>

                <button
                  onClick={handleCopyIp}
                  className="mc-button mc-button-diamond text-xs py-3 px-5 flex items-center justify-center gap-2 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-300">已复制IP!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>复制服务器IP</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="mc-button mc-button-emerald text-xs sm:text-sm py-3 px-6 flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>加入新生交流群 (913295535)</span>
              </button>

              <a
                href="#server-radar"
                onClick={() => sounds.playClick()}
                className="mc-button text-xs sm:text-sm py-3 px-5 flex items-center gap-2 bg-[#252c3b]"
              >
                <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>查看实时服务器雷达</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 max-w-xl">
              <div>
                <div className="text-slate-400 text-[11px]">社群总群号</div>
                <div className="text-cyan-400 font-code font-bold text-sm">913295535</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">游戏版本</div>
                <div className="text-emerald-400 font-code font-bold text-sm">Fabric 26.3</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">玩法模式</div>
                <div className="text-amber-400 font-code font-bold text-sm">纯净生存/复刻</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">入服机制</div>
                <div className="text-purple-400 font-code font-bold text-sm">加群审核/登记</div>
              </div>
            </div>

          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image (Minecraft SZUT Library) */}
              <div className="relative border-4 border-[#2d3748] bg-[#1a202c] shadow-2xl mc-border overflow-hidden group">
                <img
                  src="/szut-mc-library.jpg"
                  alt="Minecraft Recreation of SZUT Library"
                  className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 border border-cyan-500/50 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-pixel text-[11px] text-cyan-300">
                    苏工院方块复刻企划
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-amber-500/50 text-[11px] font-mono text-amber-300">
                  🏛️ 湖畔图书馆 1:1 Voxel
                </div>

                {/* Subtle Scanline Layer */}
                <div className="absolute inset-0 scanline pointer-events-none opacity-40"></div>
              </div>

              {/* Floating Minecraft Lore Tooltip Box */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 max-w-xs bg-[#100b1a]/95 border-2 border-purple-600 p-3.5 shadow-2xl mc-lore-card text-left hidden sm:block">
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-purple-800/60">
                  <span className="font-pixel text-[11px] text-cyan-300">§b苏州工学院·湖畔图书馆</span>
                  <span className="text-[10px] text-purple-400 font-pixel">§d【史诗工程】</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug font-sans">
                  "在数字方块中永恒定格的校园倒影。由苏工院建筑组成员逐块丈量还原，支持光影沉浸游览。"
                </p>
                <div className="mt-2 pt-1 border-t border-purple-900/40 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>方块数: 120,000+</span>
                  <span className="text-emerald-400">已竣工 · 开放打卡</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
