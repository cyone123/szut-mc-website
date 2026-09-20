import { useState, useEffect } from 'react';
import { 
  Server, RefreshCw, Wifi, Users, Shield, Cpu, 
  Sparkles, Copy, Check, Terminal 
} from 'lucide-react';
import type { ServerStatusData } from '../services/serverStatus';
import { fetchServerStatus } from '../services/serverStatus';
import { parseMotd } from '../utils/motd';
import { sounds } from '../utils/audio';

interface ServerRadarProps {
  serverAddress: string;
  backupAddress?: string;
  onOpenJoin: () => void;
  onStatusChange?: (online: boolean) => void;
}

export const ServerRadar: React.FC<ServerRadarProps> = ({ 
  serverAddress, 
  backupAddress = 'play.szut-mc.cc.cd',
  onOpenJoin,
  onStatusChange 
}) => {
  const [selectedAddress, setSelectedAddress] = useState<'primary' | 'backup'>('primary');
  const [data, setData] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const currentAddress = selectedAddress === 'primary' ? serverAddress : backupAddress;

  const loadStatus = async () => {
    setLoading(true);
    try {
      const result = await fetchServerStatus(serverAddress);
      setData(result);
      if (onStatusChange) {
        onStatusChange(result.online);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
    // Refresh every 60s
    const interval = setInterval(loadStatus, 60000);
    return () => clearInterval(interval);
  }, [serverAddress]);

  const handleManualRefresh = () => {
    sounds.playClick();
    loadStatus();
  };

  const handleCopy = () => {
    sounds.playExp();
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const motdSpans = data?.motd.raw?.[0] ? parseMotd(data.motd.raw.join(' \n ')) : [];
  const onlineCount = data?.players.online ?? 0;
  const maxPlayers = data?.players.max ?? 20;
  const fillPercentage = Math.min(100, Math.round((onlineCount / (maxPlayers || 1)) * 100));

  return (
    <section id="server-radar" className="py-20 relative">
      {/* Background Section Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-3 shadow-sm">
            <Server className="w-3.5 h-3.5" />
            <span>LIVE SERVER RADAR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white font-sans">
            服务器实时状态雷达
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            直连苏工院 Minecraft 校园主机，实时探针轮询，随时随地掌握联机动向
          </p>
        </div>

        {/* Main Radar Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#11151f] border-2 border-slate-300 dark:border-[#2b3345] shadow-2xl mc-border overflow-hidden">
          
          {/* Top Bar of Server Console */}
          <div className="bg-slate-100 dark:bg-[#181f2c] px-4 py-3 border-b border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <span className={`w-3 h-3 rounded-none ${data?.online ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-rose-500'}`} />
                {data?.online && (
                  <span className="absolute w-3 h-3 bg-emerald-500 dark:bg-emerald-400 animate-ping opacity-75 rounded-none" />
                )}
              </div>
              <span className="font-pixel text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {data?.online ? '§aSERVER ONLINE' : '§cSERVER OFFLINE'}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                [{currentAddress}]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden md:inline">
                最后更新: {data?.lastUpdated.toLocaleTimeString() || '--:--:--'}
              </span>
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                title="重新检测服务器状态"
                className="mc-button text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-600 dark:text-cyan-400' : ''}`} />
                <span>{loading ? '探针中...' : '刷新'}</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
            
            {/* MOTD Display Box (Minecraft Style Terminal) */}
            <div className="bg-[#0b0e14] border-2 border-slate-700 p-4 relative shadow-inner">
              <div className="text-[10px] text-slate-400 font-mono mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-cyan-400" /> MOTD 联机标语
                </span>
                <span className="text-slate-400 font-pixel text-[9px]">JAVA EDITION</span>
              </div>
              <div className="font-pixel text-xs sm:text-sm leading-relaxed tracking-wide min-h-[32px] flex items-center">
                {motdSpans.length > 0 ? (
                  <div>
                    {motdSpans.map((span, idx) => (
                      <span
                        key={idx}
                        style={{
                          color: span.color || '#ffffff',
                          fontWeight: span.bold ? 'bold' : 'normal',
                          fontStyle: span.italic ? 'italic' : 'normal',
                          textDecoration: span.underline ? 'underline' : span.strikethrough ? 'line-through' : 'none',
                        }}
                      >
                        {span.text}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-emerald-400">SZUT 26.3纯净fabric生存服务器</span>
                )}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Latency Metric */}
              <div className="bg-slate-50 dark:bg-[#171c26] border border-slate-200 dark:border-slate-700/80 p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">网络响应延迟</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold font-code text-slate-900 dark:text-white">
                      {data?.latency ?? 25}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">ms (专线)</span>
                  </div>
                </div>
              </div>

              {/* Version Metric */}
              <div className="bg-slate-50 dark:bg-[#171c26] border border-slate-200 dark:border-slate-700/80 p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">服务端架构 / 核心</div>
                  <div className="text-sm font-bold font-code text-cyan-700 dark:text-cyan-300">
                    {data?.version || 'Fabric 26.3'}
                  </div>
                </div>
              </div>

              {/* Security / Mode Metric */}
              <div className="bg-slate-50 dark:bg-[#171c26] border border-slate-200 dark:border-slate-700/80 p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">服务器运行规则</div>
                  <div className="text-xs font-bold font-sans text-amber-700 dark:text-amber-300">
                    纯净生存二周目
                  </div>
                </div>
              </div>

            </div>

            {/* Players Status & Online Count Meter */}
            <div className="bg-slate-50 dark:bg-[#171c26] border border-slate-200 dark:border-slate-700/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    在线特工槽位
                  </span>
                </div>
                <div className="text-xs font-code">
                  <span className="text-cyan-700 dark:text-cyan-300 font-bold text-base">{onlineCount}</span>
                  <span className="text-slate-400 dark:text-slate-500"> / </span>
                  <span className="text-slate-600 dark:text-slate-400">{maxPlayers} MAX</span>
                </div>
              </div>

              {/* Progress Bar (Minecraft XP Bar Look) */}
              <div className="relative w-full h-3 bg-slate-200 dark:bg-black border border-slate-300 dark:border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  style={{ width: `${Math.max(5, fillPercentage)}%` }}
                />
              </div>

              {/* Player Heads Preview or Empty Message */}
              <div className="pt-2">
                {data?.players.list && data.players.list.length > 0 ? (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mr-2 font-mono">当前在线玩家:</span>
                    {data.players.list.map((player, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-code text-cyan-700 dark:text-cyan-300"
                        title={player.name}
                      >
                        <img
                          src={`https://minotar.net/helm/${encodeURIComponent(player.uuid || player.name)}/20`}
                          alt={player.name}
                          className="w-4 h-4 rounded-none image-pixelated"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.fallback) {
                              target.dataset.fallback = 'true';
                              target.src = `https://mc-heads.net/avatar/${encodeURIComponent(player.uuid || player.name)}/20`;
                            } else {
                              target.style.display = 'none';
                            }
                          }}
                        />
                        <span>{player.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-black/40 px-3 py-2 border border-slate-200 dark:border-slate-800">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      当前服务器整装待发，随时欢迎苏工院伙伴上线联机开荒！
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono text-[11px]"
                    >
                      {copied ? 'IP 已复制!' : '立即直连进服 →'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Server Feature Badges Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-2 text-center text-xs">
              {/* <div className="p-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 font-mono text-slate-700 dark:text-slate-300">
                🛡️ 领地箱子防熊
              </div>
              <div className="p-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 font-mono text-slate-700 dark:text-slate-300">
                ⚡ Carpet 假人挂机
              </div> */}
              <div className="p-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 font-mono text-slate-700 dark:text-slate-300">
                💎 生电自动化友好
              </div>
              <div className="p-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 font-mono text-slate-700 dark:text-slate-300">
                🎒 死亡不掉落保障
              </div>
            </div>

          </div>

          {/* Card Bottom Actions */}
          <div className="bg-slate-100 dark:bg-[#161c28] p-4 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <span className="text-cyan-700 dark:text-cyan-400 font-bold">连接线路:</span>
              <div className="inline-flex items-center border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/60 p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setSelectedAddress('primary');
                  }}
                  className={`px-2 py-0.5 text-[11px] font-mono transition-colors cursor-pointer ${
                    selectedAddress === 'primary'
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  主线
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setSelectedAddress('backup');
                  }}
                  className={`px-2 py-0.5 text-[11px] font-mono transition-colors cursor-pointer ${
                    selectedAddress === 'backup'
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  备用
                </button>
              </div>
              <span className="text-slate-800 dark:text-white font-code bg-white dark:bg-black/70 px-2 py-1 border border-slate-300 dark:border-slate-700 select-all font-bold">
                {currentAddress}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden lg:inline">
                ({selectedAddress === 'primary' ? '端口 33735' : '免端口直连'})
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none mc-button text-xs py-2 px-4 flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制 IP' : `复制${selectedAddress === 'primary' ? '主线' : '备用'}地址`}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenJoin();
                }}
                className="flex-1 sm:flex-none mc-button mc-button-emerald text-xs py-2 px-4 flex items-center justify-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>加入群聊</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
