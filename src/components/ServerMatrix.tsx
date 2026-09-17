import { useState } from 'react';
import { 
  Compass, Hammer, Swords, Check, Copy, 
  Sparkles, MapPin, Zap, ShieldCheck 
} from 'lucide-react';
import { sounds } from '../utils/audio';

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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>GAMEPLAY & SERVER MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
            特色玩法与多服矩阵
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            兼顾生存养老、校园 1:1 建筑创造与丰富活动，打造全方位的苏工院方块乐园
          </p>
        </div>

        {/* Server Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Survival Server */}
          <div className="bg-[#131824] border-2 border-emerald-600/70 p-6 mc-border-emerald relative flex flex-col justify-between group">
            {/* Ribbon */}
            <div className="absolute -top-3 right-4 bg-emerald-500 text-black text-[10px] font-pixel font-bold px-2 py-0.5 shadow-md">
              ★ 主力长线服 ★
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-400">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white font-sans">
                    SZUT 纯净Fabric生存
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400">
                    🟢 稳定运行中 · 二周目
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                最受校内同学欢迎的主力生存服。保留纯净生存的原汁原味，同时深度优化生电支持。配备地领保护与死亡不掉落，安心造家，畅快探险。
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>服务端：Fabric 26.3 原版兼容</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>安全防线：领地锁 + 死亡不掉落</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>生电特性：Carpet 假人与高产优化</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>服务承诺：长期稳定、不随意换周目</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-emerald-900/50">
              <div className="bg-black/70 p-2 border border-slate-700 text-xs font-code text-cyan-300 flex items-center justify-between">
                <span className="truncate">{serverAddress}</span>
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white p-1"
                  title="复制地址"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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
          <div className="bg-[#121622] border-2 border-slate-700 p-6 mc-border flex flex-col justify-between group hover:border-amber-500/60 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-950/80 border border-amber-700 text-amber-400">
                  <Hammer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white font-sans">
                    苏工院 1:1 校园复刻服
                  </h3>
                  <span className="text-[11px] font-mono text-amber-400">
                    🏛️ 校园共建 · 施工中
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                苏工院建筑党的造梦工坊。以实际校园卫星图和建筑图纸为蓝本，配备创世神与投影辅助，将苏工院的每条校道、每间教室精雕细琢为数字方块。
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>创造模式：无限方块资源库</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>工具支持：WorldEdit / Axiom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>建造协同：Litematica 投影图纸导入</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>荣誉殿堂：建筑师冠名与展板铭记</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="w-full mc-button text-xs py-2.5 flex items-center justify-center gap-1.5 bg-[#283244] hover:bg-[#323f56]"
              >
                <span>加入建筑复刻企划</span>
              </button>
            </div>
          </div>

          {/* Minigames / Event Server */}
          <div className="bg-[#121622] border-2 border-slate-700 p-6 mc-border flex flex-col justify-between group hover:border-purple-500/60 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-950/80 border border-purple-700 text-purple-400">
                  <Swords className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white font-sans">
                    水友活动与模组服
                  </h3>
                  <span className="text-[11px] font-mono text-purple-400">
                    🎮 周末联赛 · 寒暑假企划
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                定期举办校内竞技赛与特定模组周目。无论是起床战争激情对决、空岛战争逃杀，还是寒暑假科技魔法模组开荒，这里都是最热闹的开黑游乐场。
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>竞技水友：起床战争 / 饥饿游戏</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>假期企划：机械动力 / 魔法模组</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>丰厚奖品：游戏正版通行证与周边</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>赛事直播：Bilibili 校园水友赛直击</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="w-full mc-button text-xs py-2.5 flex items-center justify-center gap-1.5 bg-[#283244] hover:bg-[#323f56]"
              >
                <span>关注下期活动报名</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
