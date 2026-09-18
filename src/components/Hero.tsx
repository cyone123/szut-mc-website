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
    sounds.playExp();
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-600/15 dark:bg-cyan-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-emerald-600/10 dark:bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 text-xs font-mono text-cyan-700 dark:text-cyan-300 shadow-sm">
              <span className="w-2 h-2 bg-cyan-500 animate-ping rounded-none" />
              <span>SZUT · 苏州工学院学生组织</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span className="text-emerald-600 dark:text-emerald-400">官方 Minecraft 基地</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
                用方块，构建我们的
                <span className="block mt-1 font-pixel text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400 filter drop-shadow-[0_2px_15px_rgba(6,182,212,0.3)] text-2xl sm:text-4xl lg:text-5xl pt-2">
                  苏工院宇宙
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed pt-2">
                从生存养老到硬核生电，从建筑狂魔到PVP大神。属于苏州工学院人的 Minecraft 交流组织与校园生存服，欢迎每一位热爱建造、探索与自动化的方块特工！
              </p>
            </div>

            {/* Server IP Copy Box */}
            <div className="p-4 bg-white dark:bg-[#141923]/90 border-2 border-slate-300 dark:border-slate-700 max-w-xl mc-border shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 font-mono">
                  <Server className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Java版服务器直连地址
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 border border-emerald-300 dark:border-emerald-800">
                  Fabric 26.3 · 纯净生存
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 bg-slate-100 dark:bg-black/60 px-4 py-3 border border-slate-300 dark:border-slate-700/80 font-code text-sm sm:text-base text-cyan-700 dark:text-cyan-300 font-bold select-all tracking-wider flex items-center justify-between">
                  <span>{serverAddress}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans hidden sm:inline">端口: 33735</span>
                </div>

                <button
                  onClick={handleCopyIp}
                  className="mc-button mc-button-diamond text-xs py-3 px-5 flex items-center justify-center gap-2 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>已复制IP!</span>
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
                className="mc-button text-xs sm:text-sm py-3 px-5 flex items-center gap-2"
              >
                <ArrowDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-bounce" />
                <span>查看实时服务器雷达</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 max-w-xl">
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">社群总群号</div>
                <div className="text-cyan-600 dark:text-cyan-400 font-code font-bold text-sm">913295535</div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">游戏版本</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-code font-bold text-sm">Fabric 26.3</div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">玩法模式</div>
                <div className="text-amber-600 dark:text-amber-400 font-code font-bold text-sm">纯净生存</div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">入服机制</div>
                <div className="text-purple-600 dark:text-purple-400 font-code font-bold text-sm">加群审核</div>
              </div>
            </div>

          </div>

          {/* Right Showcase Card - Recruitment Poster */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Poster Container with MC Border */}
              <div 
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="relative cursor-pointer border-4 border-slate-300 dark:border-[#2d3748] bg-white dark:bg-[#1a202c] shadow-2xl mc-border overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/80"
                title="点击打开招新群二维码"
              >
                <img
                  src="/szut-mc-poster.webp"
                  alt="苏州工学院 Minecraft 交流群 新学期招新海报"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Top Banner Tag */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 border border-amber-500/70 flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-pixel text-[11px] text-amber-300">
                    新学期官方招新海报
                  </span>
                </div>

                {/* Bottom Interactive Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-none animate-ping"></span>
                    点击海报直接加群
                  </span>
                  <span className="mc-button mc-button-emerald text-[11px] py-1 px-3">
                    加入社群
                  </span>
                </div>
              </div>

              {/* Floating Minecraft Lore Box */}
              <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-white/95 dark:bg-[#100b1a]/95 border-2 border-slate-300 dark:border-cyan-500/70 p-2.5 shadow-xl mc-border dark:mc-lore-card text-left hidden sm:flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-none shadow-[0_0_8px_#06b6d4]"></div>
                <div>
                  <div className="font-pixel text-[10px] text-cyan-700 dark:text-cyan-300">§b同校相聚 · 探索无限</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">工院人，永远在线！群号 913295535</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
