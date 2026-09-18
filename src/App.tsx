import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServerRadar } from './components/ServerRadar';
import { CommunityIntro } from './components/CommunityIntro';
import { ServerMatrix } from './components/ServerMatrix';
// import { CampusGallery } from './components/CampusGallery';
import { JoinGuide } from './components/JoinGuide';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { SERVER_CONFIG } from './services/serverStatus';

export function AppContent() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-[#0a0d13] text-slate-800 dark:text-slate-100 selection:bg-cyan-500 selection:text-black transition-colors duration-200 overflow-x-hidden">
      {/* Background Pixel Grid & Particle Ambient Effects */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
      <ParticleCanvas />

      {/* Main Navigation */}
      <Navbar
        onOpenJoin={() => setIsJoinModalOpen(true)}
        serverOnline={serverOnline}
      />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onOpenJoin={() => setIsJoinModalOpen(true)}
          serverAddress={SERVER_CONFIG.address}
          backupAddress={SERVER_CONFIG.backupAddress}
        />

        {/* 2. Live Server Radar */}
        <ServerRadar
          serverAddress={SERVER_CONFIG.address}
          backupAddress={SERVER_CONFIG.backupAddress}
          onOpenJoin={() => setIsJoinModalOpen(true)}
          onStatusChange={setServerOnline}
        />

        {/* 3. Community Story & 4 Factions */}
        <CommunityIntro
          onOpenJoin={() => setIsJoinModalOpen(true)}
        />

        {/* 4. Server Matrix & Gameplay Modes */}
        <ServerMatrix
          serverAddress={SERVER_CONFIG.address}
          backupAddress={SERVER_CONFIG.backupAddress}
          onOpenJoin={() => setIsJoinModalOpen(true)}
        />

        {/* 5. Campus Showcase Gallery (Real vs Minecraft) */}
        {/* <CampusGallery /> */}

        {/* 6. Player Guide & FAQ */}
        <JoinGuide
          onOpenJoin={() => setIsJoinModalOpen(true)}
          serverAddress={SERVER_CONFIG.address}
          backupAddress={SERVER_CONFIG.backupAddress}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenJoin={() => setIsJoinModalOpen(true)}
        serverAddress={SERVER_CONFIG.address}
        backupAddress={SERVER_CONFIG.backupAddress}
      />

      {/* QQ Group & Whitelist QR Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
