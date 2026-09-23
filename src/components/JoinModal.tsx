import { useState } from 'react';
import { X, Check, Copy, ExternalLink, ShieldCheck, Server } from 'lucide-react';
import { sounds } from '../utils/audio';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const groupNumber = '913295535';

  if (!isOpen) return null;

  const handleCopy = () => {
    sounds.playExp();
    navigator.clipboard.writeText(groupNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    sounds.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-[#131722] border-2 border-slate-300 dark:border-[#3b4252] shadow-2xl p-6 text-slate-800 dark:text-slate-200 mc-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-none shadow-[0_0_8px_#06b6d4]"></span>
            <h3 className="font-pixel text-sm text-cyan-700 dark:text-cyan-400 tracking-wider">加入 SZUT-MC 组织</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {/* QR Code Container */}
          <div className="relative p-2 bg-slate-100 dark:bg-slate-900/90 border-2 border-slate-300 dark:border-slate-700 mb-4 group shadow-inner">
            <img
              src="/szut-qq-qrcode.webp"
              alt="SZUT Minecraft QQ Group QR Code"
              className="w-56 h-auto object-contain rounded-none select-none"
            />
            <div className="absolute inset-x-2 bottom-2 bg-black/80 py-1 text-[11px] text-cyan-300 font-pixel tracking-tight">
              QQ 扫码一键加入
            </div>
          </div>

          <div className="w-full bg-slate-50 dark:bg-[#1a202c] p-3 border border-slate-200 dark:border-slate-700/70 mb-4 text-left">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>官方交流群号</span>
              {/* <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                <Users className="w-3.5 h-3.5" /> 迎新与白名单审核
              </span> */}
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xl font-code font-bold text-slate-900 dark:text-white tracking-widest selection:bg-cyan-500">
                {groupNumber}
              </span>
              <button
                onClick={handleCopy}
                className="mc-button text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">已复制!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>复制群号</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="w-full text-xs text-slate-600 dark:text-slate-400 space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 border border-slate-200 dark:border-slate-700/50 mb-4 text-left">
            <div className="flex items-start gap-2">
              <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>当前<strong>免白名单开放</strong>，服务器直连 IP 与备用线路已在群公告发布。</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>入群验证请填写：<strong>苏工院学院/专业 + 游戏ID</strong>（在校生优先审核）</span>
            </div>
            <div className="flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>群文件内已提供整合包、启动器及配置</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full mc-button mc-button-diamond text-xs py-2.5"
          >
            知道了，返回主页
          </button>
        </div>
      </div>
    </div>
  );
};
