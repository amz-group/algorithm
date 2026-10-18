import React, { useState } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Gauge,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Shield,
  Laptop
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface SettingsViewProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onClearHistory: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onClearHistory
}) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundEffects.isEnabled());
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.setEnabled(next);
    if (next) {
      soundEffects.playSuccess();
    }
  };

  const handleResetAllData = () => {
    onClearHistory();
    localStorage.removeItem('krd_team_members');
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#171717] text-white border border-[#2B2B2B] shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#F5C542] uppercase">
            <Settings className="w-4 h-4" />
            <span>Platform Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            System Settings
          </h1>
          <p className="text-sm text-[#A3A3A3] leading-relaxed">
            Customize visual theme preferences, interactive audio synthesizer feedback, animation playback, and local session caches.
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Theme Settings */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#202020] border border-[#E5E5E0] dark:border-[#333333] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="w-4 h-4 text-[#F5C542]" /> : <Sun className="w-4 h-4 text-[#D4A72C]" />}
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#FAFAFA]">
                Appearance Theme
              </h3>
            </div>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Default is Classic Academic Light with golden-yellow accents. Dark theme provides deep contrast.
            </p>
          </div>

          <button
            onClick={onToggleDarkMode}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#F7F7F4] dark:bg-[#171717] border border-[#E5E5E0] dark:border-[#333333] text-[#171717] dark:text-[#FAFAFA] hover:border-[#D4A72C] transition-colors cursor-pointer"
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>

        {/* Audio Synthesizer */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#202020] border border-[#E5E5E0] dark:border-[#333333] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#A3A3A3]" />
              )}
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#FAFAFA]">
                Audio Feedback (Web Audio API)
              </h3>
            </div>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Plays subtle sine and triangle tones on array comparisons, swaps, and algorithm completion.
            </p>
          </div>

          <button
            onClick={handleToggleSound}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#F5C542] text-[#111111]'
                : 'bg-[#F7F7F4] dark:bg-[#171717] text-[#737373] border border-[#E5E5E0] dark:border-[#333333]'
            }`}
          >
            {soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Local Data Storage & Reset */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#202020] border border-[#E5E5E0] dark:border-[#333333] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D4A72C]" />
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#FAFAFA]">
                Session &amp; Local Storage Cache
              </h3>
            </div>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Clear recent algorithm history and restore team member profiles to system defaults.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {resetSuccess && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Reset complete
              </span>
            )}
            <button
              onClick={handleResetAllData}
              className="px-4 py-2 text-xs font-medium rounded-lg text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Reset All Stored Data
            </button>
          </div>
        </div>

        {/* System Specifications */}
        <div className="p-5 rounded-xl bg-[#FDFDFB] dark:bg-[#1A1A1A] border border-[#E5E5E0] dark:border-[#333333] text-xs space-y-2">
          <h4 className="font-bold text-[#171717] dark:text-[#FAFAFA] flex items-center gap-1.5">
            <Laptop className="w-4 h-4 text-[#D4A72C]" />
            Architecture Specifications
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#525252] dark:text-[#A3A3A3]">
            <div>Client Platform: <strong className="text-[#171717] dark:text-[#FAFAFA]">React 19 + TypeScript + Vite</strong></div>
            <div>Styling System: <strong className="text-[#171717] dark:text-[#FAFAFA]">Tailwind CSS (Classic Black &amp; Gold)</strong></div>
            <div>Audio Pipeline: <strong className="text-[#171717] dark:text-[#FAFAFA]">Hardware Web Audio API Oscillators</strong></div>
            <div>Data Pipeline: <strong className="text-[#171717] dark:text-[#FAFAFA]">Direct in-browser numerical tokenizer</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};
