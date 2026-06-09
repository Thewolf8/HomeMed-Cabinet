import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, FileDown, Moon, Sun, Stethoscope } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

interface HeaderProps {
  onExport?: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/medicines': 'Medicine Cabinet',
  '/add': 'Add Medicine',
  '/edit': 'Edit Medicine',
  '/export': 'Export Report',
  '/settings': 'Settings',
};

export function Header({ onExport }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, toggleDarkMode } = useSettings();
  const title = pageTitles[location.pathname] || 'HomeMed Cabinet';

  const showBack = location.pathname !== '/';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass border-b border-white/10"
    >
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {showBack ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          ) : (
            <Stethoscope className="w-6 h-6 text-[#5F9E95]" />
          )}
          <h1 className="font-serif text-xl font-semibold tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {onExport && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onExport}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5F9E95] text-white text-sm font-medium hover:bg-[#3D6B65] transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {settings.darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
