import { ArrowUp, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FooterProps {
  onOpenJoin: () => void;
  serverAddress: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenJoin, serverAddress }) => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#090b10] border-t-2 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/szut-mc-emblem.jpg"
                alt="SZUT Minecraft Badge"
                className="w-10 h-10 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              />
              <img
                src="/szut-logo.png"
                alt="SZUT School Badge"
                className="w-10 h-10 rounded-full bg-white p-0.5 border border-slate-300 dark:border-slate-600 shadow-sm"
              />
              <div>
                <div className="font-pixel text-sm text-cyan-600 dark:text-cyan-400 font-bold">
                  SZUT-MC
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                  苏州工学院 Minecraft 交流组织
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-sans">
              由苏州工学院在校学生创立并维护的 Minecraft 爱好者家园。汇聚建筑、红石生电、纯净生存与校园复刻爱好者，致力于用代码与方块留下大学独一无二的印记。
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block"></span>
                专线服务器: {serverAddress}
              </span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-pixel text-xs text-slate-800 dark:text-slate-200">快速直达</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#server-radar" onClick={() => sounds.playClick()} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  服务器实时雷达
                </a>
              </li>
              <li>
                <a href="#community" onClick={() => sounds.playClick()} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  社群与四大分部
                </a>
              </li>
              <li>
                <a href="#servers" onClick={() => sounds.playClick()} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  多服玩法矩阵
                </a>
              </li>
              <li>
                <a href="#guide" onClick={() => sounds.playClick()} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  新玩家入坑指南 & FAQ
                </a>
              </li>
              <li>
                <a 
                  href="https://vote.szut-mc.cc.cd" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => sounds.playClick()} 
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium"
                >
                  <span>周目整合包公投站</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-pixel text-xs text-slate-800 dark:text-slate-200">加入社群</h4>
            <div className="p-3 bg-white dark:bg-[#111622] border border-slate-300 dark:border-slate-800 text-xs space-y-2 shadow-sm">
              <div className="text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>QQ 迎新总群:</span>
                <span className="font-code font-bold text-cyan-700 dark:text-cyan-300">913295535</span>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="w-full mc-button mc-button-diamond text-[11px] py-1.5"
              >
                唤出加群二维码
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              欢迎苏工院在校生、新生及校友进群交流！
            </p>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="space-y-1 text-center sm:text-left">
            <div>
              Copyright © 2026 苏州工学院 Minecraft 交流组织 (SZUT-MC). All Rights Reserved.
            </div>
            <div className="text-slate-500 dark:text-slate-600">
              Minecraft 是 Mojang AB / Microsoft 的注册商标。本项目由学生社团独立运营，非 Mojang 官方关联产品。
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="mc-button text-xs py-2 px-3 flex items-center gap-1.5"
            title="回到顶部"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>回到顶部</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
