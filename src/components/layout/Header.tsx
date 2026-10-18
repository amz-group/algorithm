import React from 'react';
import { Menu } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { ALGORITHM_DEFINITIONS } from '../../data/algorithmDefinitions';
import { AlgorithmId } from '../../types/algorithm';

interface HeaderProps {
  activeView: ActiveView;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenMobileMenu: () => void;
  onSelectView: (view: ActiveView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onOpenMobileMenu,
  onSelectView
}) => {
  let title = 'Platform Dashboard';
  let category = 'Overview';
  let description = 'Overview of available algorithms, categories, and quick workspaces.';

  if (activeView === 'about' || activeView === 'team') {
    title = 'About KRD Group';
    category = 'About';
    description = 'Official profile, digital solutions, and software engineering from KRD Group (www.krdgroup.dev).';
  } else if (activeView === 'settings') {
    title = 'Platform Settings';
    category = 'Preferences';
    description = 'Configure display preferences, animation speed defaults, and sound effects.';
  } else if (ALGORITHM_DEFINITIONS[activeView as AlgorithmId]) {
    const meta = ALGORITHM_DEFINITIONS[activeView as AlgorithmId];
    title = meta.name;
    category = meta.categoryLabel;
    description = meta.shortDescription;
  }

  return (
    <header className="sticky top-0 z-20 w-full border-b border-[#E5E5E0] dark:border-[#262626] bg-[#FFFFFF]/90 dark:bg-[#171717]/90 backdrop-blur-md px-4 sm:px-6 py-3.5 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#171717] dark:text-[#FAFAFA] hover:bg-[#F2F2ED] dark:hover:bg-[#262626]"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] font-medium">
            <span
              onClick={() => onSelectView('dashboard')}
              className="cursor-pointer hover:text-[#171717] dark:hover:text-[#FAFAFA]"
            >
              KRD ALGORITHM
            </span>
            <span>/</span>
            <span>{category}</span>
            <span>/</span>
            <span className="text-[#171717] dark:text-[#F5C542] font-semibold truncate">
              {title}
            </span>
          </div>

          {/* Title */}
          <div className="flex items-baseline gap-2 mt-0.5">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#171717] dark:text-[#FFFFFF] truncate">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Optional Short Description */}
      {description && (
        <p className="hidden md:block mt-1 text-xs text-[#737373] dark:text-[#A3A3A3] line-clamp-1">
          {description}
        </p>
      )}
    </header>
  );
};
