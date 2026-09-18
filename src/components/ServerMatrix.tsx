import { useState } from 'react';
import { 
  Compass, Hammer, Swords, Check, Copy, 
  Sparkles, MapPin, Zap, ShieldCheck, Vote, ExternalLink 
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { SERVER_CONFIG } from '../services/serverStatus';

interface ServerMatrixProps {
  serverAddress: string;
  onOpenJoin: () => void;
}

export const ServerMatrix: React.FC<ServerMatrixProps> = ({ 
  serverAddress, 
  onOpenJoin 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    sounds.playLevelUp();
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="servers" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-3 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>GAMEPLAY & SERVER MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white font-sans">
            特色玩法与多服矩阵
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            兼顾生存养老、校园 1:1 建筑创造与丰富活动，打造全方位的苏工院方块乐园
          </p>
        </div>

        {/* Server Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Survival Server */}
          <div className="bg-emerald-50/50 dark:bg-[#131824] border-2 border-emerald-500/80 dark:border-emerald-600/70 p-6 mc-border-emerald relative flex flex-col justify-between group shadow-lg">
            {/* Ribbon */}
            <div className="absolute -top-3 right-4 bg-emerald-500 text-black text-[10px] font-pixel font-bold px-2 py-0.5 shadow-md">
              ★ 主力长线服 ★
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-sans">
                    SZUT 纯净Fabric生存
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    🟢 稳定运行中 · 二周目
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                最受校内同学欢迎的主力生存服。保留纯净生存的原汁原味，同时深度优化生电支持。配备地领保护与死亡不掉落，安心造家，畅快探险。
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6 text-xs text-slate-800 dark:text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>服务端：Fabric 26.3 原版兼容</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>安全防线：领地锁 + 死亡不掉落</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>生电特性：Carpet 假人与高产优化</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>服务承诺：长期稳定、不随意换周目</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-emerald-200 dark:border-emerald-900/50">
              <div className="bg-white dark:bg-black/70 p-2 border border-slate-300 dark:border-slate-700 text-xs font-code text-cyan-700 dark:text-cyan-300 flex items-center justify-between shadow-sm">
                <span className="truncate">{serverAddress}</span>
                <button
                  onClick={handleCopy}
                  className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white p-1"
                  title="复制地址"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <button
                onClick={handleCopy}
                className="w-full mc-button mc-button-emerald text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'IP 已复制到剪贴板' : '一键复制主服 IP'}</span>
              </button>
            </div>
          </div>

          {/* Creative Campus Server */}
          <div className="bg-white dark:bg-[#121622] border-2 border-slate-200 dark:border-slate-700 p-6 mc-border flex flex-col justify-between group hover:border-amber-500/60 transition-colors shadow-md">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400">
                  <Hammer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-sans">
                    苏工院 1:1 校园复刻服
                  </h3>
                  <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                    🏛️ 校园共建 · 施工中
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                苏工院建筑党的造梦工坊。以实际校园卫星图和建筑图纸为蓝本，配备创世神与投影辅助，将苏工院的每条校道、每间教室精雕细琢为数字方块。
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>创造模式：无限方块资源库</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>工具支持：WorldEdit / Axiom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>建造协同：Litematica 投影图纸导入</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>荣誉殿堂：建筑师冠名与展板铭记</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="w-full mc-button text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                <span>加入建筑复刻企划</span>
              </button>
            </div>
          </div>

          {/* Minigames / Event Server */}
          <div className="bg-white dark:bg-[#121622] border-2 border-slate-200 dark:border-slate-700 p-6 mc-border flex flex-col justify-between group hover:border-purple-500/60 transition-colors shadow-md">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400">
                  <Swords className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-sans">
                    水友活动与模组服
                  </h3>
                  <span className="text-[11px] font-mono text-purple-700 dark:text-purple-400 font-bold">
                    🎮 周末联赛 · 整合包大选
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                定期举办校内竞技赛与特定模组周目。无论是起床战争激情对决，还是寒暑假科技魔法模组开荒，这里都是最热闹的开黑游乐场。下周目整合包正在火热公投中！
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <Vote className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>周目大选：投票决定下周目整合包</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>水友竞技：起床战争 / 饥饿游戏</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>假期企划：机械动力 / 魔法模组</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>赛事直播：Bilibili 校园水友赛直击</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <a
                href={SERVER_CONFIG.voteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playLevelUp()}
                className="w-full mc-button mc-button-diamond text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                <Vote className="w-3.5 h-3.5" />
                <span>参与下周目整合包投票</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="w-full mc-button text-xs py-2 flex items-center justify-center gap-1.5"
              >
                <span>关注活动与赛事群</span>
              </button>
            </div>
          </div>

        </div>

        {/* Community Season Modpack Voting Showcase Banner */}
        <div className="mt-12 bg-white dark:bg-[#121622] border-2 border-amber-500/70 dark:border-amber-500/60 p-6 sm:p-8 mc-border relative overflow-hidden shadow-2xl">
          {/* Subtle glowing accent */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 text-left max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-pixel text-[10px] font-bold">
                  <Vote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  COMMUNITY VOTE · 玩家议会
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono text-[10px]">
                  ● 投票系统实时存盘
                </span>
                <span className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 font-mono text-[10px]">
                  RPG / 硬核 / 休闲 / 生电
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                <span>下周目整合包民意公投火热进行中！</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                下个周目玩什么，由苏工院的你来决定！群服专属周目整合包大选系统现已开放，为你心仪的机械动力、冒险RPG、极限开荒或硬核生电模组投上宝贵一票，同时支持群友自主申报与推荐心仪整合包！
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-slate-600 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none inline-block"></span>
                  实时得票榜单公示
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-none inline-block"></span>
                  支持群友自荐整合包
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-none inline-block"></span>
                  正版皮肤与全版本联动
                </span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5">
              <a
                href={SERVER_CONFIG.voteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playLevelUp()}
                className="w-full sm:w-auto mc-button mc-button-emerald text-xs sm:text-sm py-3 px-6 flex items-center justify-center gap-2 shadow-lg"
              >
                <Vote className="w-4 h-4" />
                <span>立即参与周目公投</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-center lg:justify-end gap-1">
                <span>直达:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold underline underline-offset-2">
                  vote.szut-mc.cc.cd
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
