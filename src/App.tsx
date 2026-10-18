import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveView } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/views/DashboardView';
import { AboutView } from './components/views/AboutView';
import { SettingsView } from './components/views/SettingsView';
import { AlgorithmWorkspace } from './components/views/AlgorithmWorkspace';
import { AlgorithmId } from './types/algorithm';
import { ALGORITHM_DEFINITIONS } from './data/algorithmDefinitions';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krd_theme');
      if (saved) return saved === 'dark';
      return false; // Default is classic light theme as requested
    }
    return false;
  });

  const [recentAlgorithms, setRecentAlgorithms] = useState<AlgorithmId[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krd_recent_algorithms');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Sync dark theme class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('krd_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('krd_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleRecordUsage = (id: AlgorithmId) => {
    setRecentAlgorithms((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const updated = [id, ...filtered].slice(0, 5);
      localStorage.setItem('krd_recent_algorithms', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setRecentAlgorithms([]);
    localStorage.removeItem('krd_recent_algorithms');
  };

  const isAlgorithmSelected = ALGORITHM_DEFINITIONS[activeView as AlgorithmId] !== undefined;

  return (
    <div className="min-h-screen flex bg-[#F7F7F4] dark:bg-[#121212] text-[#171717] dark:text-[#FAFAFA] font-sans antialiased transition-colors">
      {/* Left Sidebar (fixed on desktop, drawer on mobile) */}
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        collapsed={isSidebarCollapsed}
        onToggleCollapsed={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Workspace: Center and Right side */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <Header
          activeView={activeView}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onSelectView={setActiveView}
        />

        {/* Content Body Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeView === 'dashboard' && (
            <DashboardView
              onSelectAlgorithm={(id) => {
                setActiveView(id);
                handleRecordUsage(id);
              }}
              recentAlgorithms={recentAlgorithms}
            />
          )}

          {(activeView === 'about' || activeView === 'team') && <AboutView />}

          {activeView === 'settings' && (
            <SettingsView
              isDarkMode={isDarkMode}
              onToggleDarkMode={handleToggleDarkMode}
              onClearHistory={handleClearHistory}
            />
          )}

          {isAlgorithmSelected && (
            <AlgorithmWorkspace
              key={activeView}
              algorithmId={activeView as AlgorithmId}
              onRecordUsage={handleRecordUsage}
            />
          )}
        </main>
      </div>
    </div>
  );
}
