import { 
  Building2, Cpu, Compass, Terminal, 
  HeartHandshake, ChevronRight 
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface CommunityIntroProps {
  onOpenJoin: () => void;
}

export const CommunityIntro: React.FC<CommunityIntroProps> = ({ onOpenJoin }) => {
  const divisions = [
    {
      id: 'arch',
      icon: Building2,
      name: '校园建筑复刻组',
      tag: 'ARCHITECTURE',
      tagColor: 'text-amber-400 border-amber-800 bg-amber-950/40',
      description: '以 1:1 的比例将苏州工学院的宏伟校门、湖畔图书馆、教学楼长廊在方块世界中数字化重构，打造属于每一位苏工院学子的方块元宇宙。',
      highlights: ['主校门与石塔还原', '湖畔图书馆水景复刻', 'Litematica 投影协同建造'],
      accentColor: 'hover:border-amber-500/70',
    },
    {
      id: 'redstone',
      icon: Cpu,
      name: '红石生电工程组',
      tag: 'AUTOMATION',
      tagColor: 'text-rose-400 border-rose-800 bg-rose-950/40',
      description: '探索 Minecraft 游戏底层的生电逻辑。从潜影盒立体分拣仓储、高产率凋灵骷髅塔，到轨道交通网络，用机械与红石点亮工业之光。',
      highlights: ['自动化巨型仓储', '高效资源生成矩阵', 'Carpet 机制性能优化'],
      accentColor: 'hover:border-rose-500/70',
    },
    {
      id: 'smp',
      icon: Compass,
      name: '纯净生存开荒组',
      tag: 'SURVIVAL SMP',
      tagColor: 'text-emerald-400 border-emerald-800 bg-emerald-950/40',
      description: '享受最质朴纯粹的原版生存。共同开荒下界与末地、在主城搭建风格各异的玩家小屋、集市互换物资，在篝火与冒险中结下同窗羁绊。',
      highlights: ['长期周目不删档', '地领防熊安全无忧', '萌新专属物资帮扶'],
      accentColor: 'hover:border-emerald-500/70',
    },
    {
      id: 'tech',
      icon: Terminal,
      name: '技术运维与研发组',
      tag: 'DEVOPS & TECH',
      tagColor: 'text-cyan-400 border-cyan-800 bg-cyan-950/40',
      description: '由苏工院计算机与工科学长学姐组成的运维团队。负责 Fabric 高性能服务器调优、反作弊防熊机制、实时雷达官网及 QQ 互通机器人维护。',
      highlights: ['专线低延迟直连', '自动备份与容灾', '全自研群服互联互通'],
      accentColor: 'hover:border-cyan-500/70',
    },
  ];

  return (
    <section id="community" className="py-20 relative bg-[#0b0e14]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>COMMUNITY & FACTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
            关于苏州工学院 MC 组织
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            创立于苏州工学院校内，聚集全校各专业热爱 Minecraft 的冒险家与创造者。
            我们不单是在玩游戏，更是在虚拟时空里为苏工院搭建一座属于大家的精神家园。
          </p>
        </div>

        {/* Four Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                className={`bg-[#121622] border-2 border-slate-800 p-6 mc-border transition-all duration-300 group hover:-translate-y-1 ${div.accentColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-900 border border-slate-700 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 border ${div.tagColor}`}>
                    {div.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-sans flex items-center gap-2">
                  <span>{div.name}</span>
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {div.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  {div.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-none shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Stats Banner */}
        <div className="bg-[#141926] border-2 border-slate-700 p-8 mc-border">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-4 lg:pt-0">
              <div className="font-pixel text-2xl sm:text-3xl text-cyan-400 mb-1">100+</div>
              <div className="text-xs text-slate-400 font-mono">QQ 交流群活跃伙伴</div>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="font-pixel text-2xl sm:text-3xl text-emerald-400 mb-1">100%</div>
              <div className="text-xs text-slate-400 font-mono">苏工院学生自主运营</div>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-1">7*24小时</div>
              <div className="text-xs text-slate-400 font-mono">校园主机低延迟直连</div>
            </div>
            {/* <div className="pt-4 lg:pt-0">
              <div className="font-pixel text-2xl sm:text-3xl text-purple-400 mb-1">1:1</div>
              <div className="text-xs text-slate-400 font-mono">校园地标持续复刻中</div>
            </div> */}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/szut-logo.png"
                alt="SZUT Official Badge"
                className="w-8 h-8 rounded-full bg-white p-0.5"
              />
              <span className="text-xs text-slate-300 font-sans">
                苏州工学院 (SZUT) Minecraft 交流组织 · 诚挚欢迎每位苏工院人
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenJoin();
              }}
              className="mc-button mc-button-emerald text-xs py-2 px-4 flex items-center gap-1.5 shrink-0"
            >
              <span>加入我们 (群号 913295535)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
