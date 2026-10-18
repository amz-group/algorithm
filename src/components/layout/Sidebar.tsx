import React from 'react';
import {
  LayoutDashboard,
  ArrowUpDown,
  Search,
  GitGraph,
  Users,
  Info,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Network
} from 'lucide-react';
import { AlgorithmId } from '../../types/algorithm';
import { ALGORITHM_DEFINITIONS } from '../../data/algorithmDefinitions';

import { KrdLogo } from '../common/KrdLogo';

export type ActiveView = 'dashboard' | 'about' | 'team' | 'settings' | AlgorithmId;

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  collapsed,
  onToggleCollapsed,
  isMobileOpen,
  onCloseMobile
}) => {
  const algorithmsList: AlgorithmId[] = [
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
    'linear-search',
    'binary-search',
    'bfs',
    'dijkstra'
  ];

  const handleItemClick = (view: ActiveView) => {
    onSelectView(view);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const renderNavButton = (
    view: ActiveView,
    label: string,
    Icon?: React.ElementType,
    badge?: string
  ) => {
    const isActive = activeView === view;

    return (
      <button
        key={view}
        onClick={() => handleItemClick(view)}
        title={collapsed ? label : undefined}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left relative ${
          isActive
            ? 'bg-[#F5C542] text-[#111111] font-semibold shadow-sm'
            : 'text-[#D4D4D4] hover:bg-[#262626] hover:text-[#FFFFFF]'
        } ${collapsed ? 'justify-center px-2' : ''}`}
      >
        {Icon ? (
          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#111111]' : 'text-[#A3A3A3]'}`} />
        ) : (
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isActive ? 'bg-[#111111]' : 'bg-[#F5C542]'
            }`}
          />
        )}

        {!collapsed && (
          <span className="truncate flex-1">
            {label}
          </span>
        )}

        {!collapsed && badge && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              isActive ? 'bg-[#111111] text-[#F5C542]' : 'bg-[#2B2B2B] text-[#A3A3A3]'
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#171717] text-[#FAFAFA] border-r border-[#2B2B2B] select-none">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#262626]">
        <div
          onClick={() => handleItemClick('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Official Emblem Logo */}
          <div className="w-9 h-9 rounded-xl bg-black border border-[#D4A72C]/40 p-1 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <KrdLogo variant="emblem" className="w-full h-full" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-[#FFFFFF]">
                KRD <span className="text-[#F5C542]">ALGORITHM</span>
              </span>
              <span className="text-[10px] text-[#A3A3A3] tracking-normal font-sans">
                Computer Science Lab
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapsed}
          className="hidden md:flex p-1.5 rounded-md text-[#A3A3A3] hover:text-[#FFFFFF] hover:bg-[#262626] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        {/* Main Section */}
        <div className="space-y-1">
          {renderNavButton('dashboard', 'Dashboard', LayoutDashboard)}
        </div>

        {/* Algorithms Section */}
        <div className="space-y-1">
          {!collapsed ? (
            <div className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-[#8A8A8A] uppercase flex items-center justify-between">
              <span>Algorithms (10)</span>
              <Layers className="w-3.5 h-3.5 text-[#F5C542]" />
            </div>
          ) : (
            <div className="h-px bg-[#262626] my-2" />
          )}

          {algorithmsList.map(id => {
            const def = ALGORITHM_DEFINITIONS[id];
            const getIcon = () => {
              if (def.category === 'sorting') return ArrowUpDown;
              if (def.category === 'searching') return Search;
              return Network;
            };
            return renderNavButton(id, def.name, getIcon());
          })}
        </div>

        {/* About Section */}
        <div className="space-y-1 pt-2 border-t border-[#262626]">
          {!collapsed && (
            <div className="px-3 pt-1 pb-1 text-[11px] font-semibold tracking-wider text-[#8A8A8A] uppercase">
              About
            </div>
          )}
          {renderNavButton('about', 'About', Info)}
        </div>
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-3 border-t border-[#262626] text-[11px] text-[#737373] flex items-center justify-between">
          <span>v1.0 Academic Edition</span>
          <span className="text-[#F5C542] font-mono">2026</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-200 h-screen sticky top-0 z-30 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#171717] md:hidden transform transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
