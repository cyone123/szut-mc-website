import { useState } from 'react';
import { Image as ImageIcon, Sparkles, X, ZoomIn, Eye } from 'lucide-react';
import { sounds } from '../utils/audio';

interface GalleryItem {
  id: string;
  title: string;
  category: 'library' | 'gate' | 'tower';
  categoryLabel: string;
  realImg: string;
  mcImg?: string;
  description: string;
  stats: string;
}

export const CampusGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'compare' | 'mc' | 'real'>('compare');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'library',
      title: '湖畔图书馆 · 镜湖倒影',
      category: 'library',
      categoryLabel: '标志建筑',
      realImg: '/szut-library.jpg',
      mcImg: '/szut-mc-library.jpg',
      description: '苏工院标志性建筑之一，面朝开阔水景。Minecraft 1:1 复刻工程运用平滑石英与深板岩，搭配光影水面呈现完美倒影。',
      stats: '方块量: 120,000+ | 历时: 3周',
    },
    {
      id: 'gate',
      title: '主校门 · 题刻门头与中轴线',
      category: 'gate',
      categoryLabel: '校园地标',
      realImg: '/szut-gate-main.jpg',
      mcImg: '/szut-mc-gate.jpg',
      description: '气势恢宏的苏州工学院南大门，门头上楷书题字清晰可见。在方块世界中严格按照真实标高与车道比例还原。',
      stats: '坐标: X: 120, Z: -450 | 创世神协同',
    },
    {
      id: 'tower',
      title: '钟楼校名纪念石塔',
      category: 'tower',
      categoryLabel: '校园雕塑',
      realImg: '/szut-gate-side.jpg',
      description: '巍然伫立的苏州工学院校名塔，蓝字白墙，映衬苏工院的蓝天与葱郁林木，承载学子共同的求学记忆。',
      stats: '校园入口守望者 · 打卡圣地',
    },
  ];

  const handleOpenImage = (url: string, title: string) => {
    sounds.playClick();
    setSelectedImage({ url, title });
  };

  return (
    <section id="gallery" className="py-20 relative bg-[#0b0e14]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>CAMPUS SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
            校园复刻与光影图鉴
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            现实中的苏州工学院 vs Minecraft 方块复刻 · 虚实交融的数字化校园
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'compare', label: '虚实对照模式' },
              { id: 'mc', label: '仅看 MC 方块' },
              { id: 'real', label: '仅看 现实实景' },
              { id: 'all', label: '全部图片' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id as 'all' | 'compare' | 'mc' | 'real');
                }}
                className={`mc-button text-xs py-2 px-4 transition-all ${
                  activeTab === tab.id
                    ? 'mc-button-diamond'
                    : 'bg-[#1b2230] text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Container */}
        <div className="space-y-12">
          {galleryItems.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-[#121622] border-2 border-slate-800 p-6 mc-border shadow-xl"
              >
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono px-2 py-0.5 bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-lg font-bold text-white font-sans">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 shrink-0 self-start sm:self-auto bg-slate-900 px-2.5 py-1 border border-slate-800">
                    {item.stats}
                  </div>
                </div>

                {/* Images Layout according to Active Tab */}
                {activeTab === 'compare' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Real Image */}
                    <div className="space-y-2 group">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-blue-400" /> 现实校园实景
                        </span>
                        <span className="text-[10px] text-slate-500">点击放大</span>
                      </div>
                      <div
                        onClick={() => handleOpenImage(item.realImg, `${item.title} - 现实实景`)}
                        className="relative h-64 sm:h-72 border-2 border-slate-700 bg-black/60 overflow-hidden cursor-pointer mc-border"
                      >
                        <img
                          src={item.realImg}
                          alt={`${item.title} 现实实景`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="mc-button text-xs py-1.5 px-3 bg-black/80 flex items-center gap-1.5">
                            <ZoomIn className="w-3.5 h-3.5" /> 查看原图
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Minecraft Recreation Image */}
                    {item.mcImg ? (
                      <div className="space-y-2 group">
                        <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Minecraft 1:1 光影复刻
                          </span>
                          <span className="text-[10px] text-slate-500">点击放大</span>
                        </div>
                        <div
                          onClick={() => handleOpenImage(item.mcImg!, `${item.title} - MC方块复刻`)}
                          className="relative h-64 sm:h-72 border-2 border-cyan-700/80 bg-black/60 overflow-hidden cursor-pointer mc-border-diamond"
                        >
                          <img
                            src={item.mcImg}
                            alt={`${item.title} MC方块复刻`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 font-pixel text-[10px] text-cyan-300 border border-cyan-800">
                            VOXEL SHADERS
                          </div>
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="mc-button mc-button-diamond text-xs py-1.5 px-3 flex items-center gap-1.5">
                              <ZoomIn className="w-3.5 h-3.5" /> 查看光影特写
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 sm:h-72 border-2 border-dashed border-slate-700 bg-slate-900/40 flex flex-col items-center justify-center text-center p-6">
                        <Sparkles className="w-8 h-8 text-amber-400/60 mb-2 animate-pulse" />
                        <div className="font-pixel text-xs text-amber-300">施工图纸绘制中</div>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs">
                          此地标目前正在建筑组排期工程中，欢迎热爱建筑的苏工院同学加入共同搭建！
                        </p>
                      </div>
                    )}
                  </div>
                ) : activeTab === 'mc' ? (
                  item.mcImg ? (
                    <div
                      onClick={() => handleOpenImage(item.mcImg!, `${item.title} - MC方块复刻`)}
                      className="relative h-80 sm:h-96 border-2 border-cyan-700/80 bg-black/60 overflow-hidden cursor-pointer mc-border-diamond group"
                    >
                      <img
                        src={item.mcImg}
                        alt={`${item.title} MC方块复刻`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 text-xs font-mono text-cyan-300 border border-cyan-700">
                        {item.title} · Minecraft 光影渲染
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-400 font-mono bg-slate-900/50 border border-slate-800">
                      方块建造工程排期中...
                    </div>
                  )
                ) : activeTab === 'real' ? (
                  <div
                    onClick={() => handleOpenImage(item.realImg, `${item.title} - 现实实景`)}
                    className="relative h-80 sm:h-96 border-2 border-slate-700 bg-black/60 overflow-hidden cursor-pointer mc-border group"
                  >
                    <img
                      src={item.realImg}
                      alt={`${item.title} 现实实景`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 text-xs font-mono text-slate-300 border border-slate-700">
                      {item.title} · 苏州工学院实景
                    </div>
                  </div>
                ) : (
                  /* All images view */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => handleOpenImage(item.realImg, `${item.title} - 现实实景`)}
                      className="relative h-60 border border-slate-700 bg-black overflow-hidden cursor-pointer"
                    >
                      <img src={item.realImg} alt="" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                        实景照
                      </span>
                    </div>
                    {item.mcImg && (
                      <div
                        onClick={() => handleOpenImage(item.mcImg!, `${item.title} - MC方块复刻`)}
                        className="relative h-60 border border-cyan-800 bg-black overflow-hidden cursor-pointer"
                      >
                        <img src={item.mcImg} alt="" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                          MC复刻
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#121622] border-2 border-slate-700 mc-border p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-800">
              <span className="text-sm font-bold text-white font-sans">
                {selectedImage.title}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 max-h-[80vh] overflow-auto flex items-center justify-center bg-black/80">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
