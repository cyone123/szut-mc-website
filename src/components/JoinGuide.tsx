import { useState } from 'react';
import { 
  Users, CheckCircle2, ChevronDown, ChevronUp, 
  HelpCircle, Download, Gamepad2, ArrowRight, //ShieldCheck
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface JoinGuideProps {
  onOpenJoin: () => void;
  serverAddress: string;
}

export const JoinGuide: React.FC<JoinGuideProps> = ({ onOpenJoin, serverAddress }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      num: '01',
      title: '加入 QQ 交流群',
      desc: '搜索群号 913295535 或扫码加入。群内提供专用客户端整合包与学长学姐在线答疑。',
      actionText: '立即扫码加群',
      action: onOpenJoin,
      icon: Users,
    },
    // {
    //   num: '02',
    //   title: '登记游戏 ID 获白名单',
    //   desc: '在群内填写个人游戏 ID（在校生优先秒审通过，保护服务器环境）。',
    //   icon: ShieldCheck,
    // },
    {
      num: '02',
      title: '下载整合包或配置客户端',
      desc: '使用 Fabric 26.3 原版或通过群文件一键解压专属优化客户端（含 Sodium 极致流畅优化）。',
      icon: Download,
    },
    {
      num: '03',
      title: '添加服务器并登入世界',
      desc: `多人游戏输入地址 ${serverAddress}，进入属于苏工院人的方块宇宙！`,
      icon: Gamepad2,
    },
  ];

  const faqs = [
    {
      q: '没有购买正版 Minecraft，离线版（HMCL/PCL）可以进服吗？',
      a: '完全可以！服务器友好支持各类主流启动器（HMCL、PCL2、BakaXL 等），配置了便捷的登录插件与皮肤显示，无论你是正版还是离线玩家，都能顺畅联机。',
    },
    {
      q: '手机版 / 基岩版 (PE/Windows 10) 可以连入吗？',
      a: '当前主服核心为 Java Edition (Fabric 26.3)。建议优先使用电脑 PC 端 Java 版游玩以获得最佳生电与光影体验。活动服期间会根据需要开启 Geyser 跨平台互通支持。',
    },
    {
      q: '笔记本电脑配置较低，进入服务器会卡顿掉帧吗？',
      a: '请放心！群文件内提供深度优化的客户端包，整合了 Sodium (钠)、Lithium (锂)、FerriteCore (内存优化) 等全套神级优化模组，即使是轻薄本核显也能稳定 60~120 帧丝滑畅玩。',
    },
    {
      q: '服务器允许建造多大规模的红石与生电机器？',
      a: '苏工院 MC 组织对生电持极其鼓励的态度！常规刷铁机、村民交易所、潜影盒分拣、树场等均可自由建造。唯二要求：1. 超大型堆叠或强高频装置请设置物理总开关；2. 机器闲置不用时请主动关闭，共同呵护服务器 20 TPS。',
    },
    {
      q: '刚入坑的小白完全不会玩生存，有人带吗？',
      a: '苏工院 MC 社群以包容温暖著称！主城设有新玩家新手物资补给箱，群内更有许多热心的学长学姐随时在线答疑，无论想学建筑排线还是红石工程，都有带练师傅倾囊相授。',
    },
  ];

  const toggleFaq = (index: number) => {
    sounds.playClick();
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="guide" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-3 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ONBOARDING GUIDE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white font-sans">
            新玩家入坑指南
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            只需简单三步，即可解锁苏工院 Minecraft 校园世界的完整权限
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#121622] border-2 border-slate-200 dark:border-slate-800 p-6 mc-border relative flex flex-col justify-between group hover:border-cyan-500/60 transition-colors shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-pixel text-2xl text-cyan-600 dark:text-cyan-400 opacity-80 group-hover:opacity-100">
                      {step.num}
                    </span>
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-cyan-700 dark:text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 font-sans">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {step.actionText && (
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        step.action?.();
                      }}
                      className="w-full mc-button mc-button-diamond text-xs py-2 flex items-center justify-center gap-1.5"
                    >
                      <span>{step.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
              常见问题解答 (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#121622] border border-slate-200 dark:border-slate-800 mc-border overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 font-sans">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/60 dark:bg-black/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Contact CTA */}
          <div className="mt-10 text-center p-6 bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 mc-border shadow-md">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              还有其他疑问或遇到进服问题？欢迎直接在交流群里向学长学姐求助！
            </p>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenJoin();
              }}
              className="mc-button mc-button-emerald text-xs py-2 px-5 inline-flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>打开 QQ 群号与二维码 (913295535)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
