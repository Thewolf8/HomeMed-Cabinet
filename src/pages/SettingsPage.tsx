import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon, Sun, FileDown, Trash2, ShieldCheck, Lock,
  Eye, ChevronRight, AlertTriangle, X
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useMedicine } from '@/hooks/useMedicine';
import { useToast } from '@/hooks/useToast';
import { StatCard } from '@/components/StatCard';
import { Pill, HeartPulse, Package, AlertTriangle as AlertIcon } from 'lucide-react';

export function SettingsPage() {
  const { settings, toggleDarkMode, updateExportPreferences, resetAllData } = useSettings();
  const { stats } = useMedicine();
  const { addToast } = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleReset = () => {
    resetAllData();
    addToast('All data has been reset', 'success');
  };

  return (
    <div className="pb-24 md:pb-8">
      <div className="px-4 py-4 max-w-2xl mx-auto">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <StatCard
            title="Total"
            value={stats.totalMedicines}
            icon={Pill}
            color="bg-[#5F9E95]/20 text-[#5F9E95]"
          />
          <StatCard
            title="Emergency"
            value={stats.emergencyCount}
            icon={HeartPulse}
            color="bg-rose-500/20 text-rose-400"
          />
          <StatCard
            title="Low Stock"
            value={stats.lowStock}
            icon={Package}
            color="bg-[#E8B4B8]/20 text-[#E8B4B8]"
          />
          <StatCard
            title="Expired"
            value={stats.expired}
            icon={AlertIcon}
            color="bg-rose-500/20 text-rose-400"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif text-2xl font-semibold mb-4"
        >
          Settings
        </motion.h2>

        <div className="space-y-3">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-1">
              Appearance
            </p>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.darkMode ? (
                    <Moon className="w-5 h-5 text-[#5F9E95]" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">
                      {settings.darkMode ? 'Currently dark' : 'Currently light'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.darkMode ? 'bg-[#5F9E95]' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.darkMode ? 24 : 2 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Export Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-1">
              Export Preferences
            </p>
            <div className="glass rounded-2xl divide-y divide-white/5">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-[#5F9E95]" />
                  <div>
                    <p className="text-sm font-medium">Include Notes</p>
                    <p className="text-xs text-muted-foreground">Add notes to exports</p>
                  </div>
                </div>
                <button
                  onClick={() => updateExportPreferences({ includeNotes: !settings.exportPreferences.includeNotes })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.exportPreferences.includeNotes ? 'bg-[#5F9E95]' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.exportPreferences.includeNotes ? 24 : 2 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <FileDown className="w-5 h-5 text-[#5F9E95]" />
                  <div>
                    <p className="text-sm font-medium">Include Expired</p>
                    <p className="text-xs text-muted-foreground">Include expired medicines in exports</p>
                  </div>
                </div>
                <button
                  onClick={() => updateExportPreferences({ includeExpired: !settings.exportPreferences.includeExpired })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.exportPreferences.includeExpired ? 'bg-[#5F9E95]' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.exportPreferences.includeExpired ? 24 : 2 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white"
                  />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm font-medium mb-2">Date Format</p>
                <div className="flex gap-2">
                  {(['iso', 'us', 'eu'] as const).map(format => (
                    <button
                      key={format}
                      onClick={() => updateExportPreferences({ dateFormat: format })}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                        settings.exportPreferences.dateFormat === format
                          ? 'bg-[#5F9E95] text-white'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {format === 'iso' ? 'YYYY-MM-DD' : format === 'us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-1">
              Data Management
            </p>
            <div className="glass rounded-2xl divide-y divide-white/5">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-rose-400" />
                  <div>
                    <p className="text-sm font-medium text-rose-400">Reset All Data</p>
                    <p className="text-xs text-muted-foreground">Clear all medicines and settings</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-1">
              Privacy & Security
            </p>
            <div className="glass rounded-2xl divide-y divide-white/5">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPrivacy(!showPrivacy)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#5F9E95]" />
                  <div>
                    <p className="text-sm font-medium">Privacy Notice</p>
                    <p className="text-xs text-muted-foreground">How we handle your data</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showPrivacy ? 'rotate-90' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showPrivacy && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3 border-t border-white/5">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-[#5F9E95] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Local Storage Only</p>
                          <p className="text-xs text-muted-foreground">
                            All your medicine data is stored in your browser&apos;s localStorage. 
                            It never leaves your device unless you explicitly export it.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-[#5F9E95] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">No Account Required</p>
                          <p className="text-xs text-muted-foreground">
                            No sign-up, no login, no personal information collected. 
                            Use the app immediately without any registration.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-[#5F9E95] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">No Built-in AI Analysis</p>
                          <p className="text-xs text-muted-foreground">
                            This app does not perform any AI analysis. You can export 
                            your data and use any external AI assistant you trust.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <X className="w-5 h-5 text-[#5F9E95] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">No Tracking</p>
                          <p className="text-xs text-muted-foreground">
                            No analytics, no cookies, no tracking pixels. Your usage 
                            of this app is completely private.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center py-6"
          >
            <p className="text-xs text-muted-foreground">
              HomeMed Cabinet v1.0.0
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Privacy-first medicine inventory management
            </p>
          </motion.div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass rounded-3xl p-6 max-w-sm w-full border border-rose-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="font-semibold text-lg">Reset All Data?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                This will permanently delete all your medicines and reset all settings. 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-2xl glass text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-2xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors"
                >
                  Reset Everything
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
