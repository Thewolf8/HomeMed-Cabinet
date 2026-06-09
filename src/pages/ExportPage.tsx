import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, FileJson, FileDown, Check, ShieldCheck,
  FileSpreadsheet, Sparkles, AlertTriangle
} from 'lucide-react';
import { useMedicine } from '@/hooks/useMedicine';
import { useSettings } from '@/hooks/useSettings';
import { useToast } from '@/hooks/useToast';
import { exportToPDF, exportToTXT, exportToJSON } from '@/lib/exportUtils';

export function ExportPage() {
  const { medicines, stats, emergencyCheck } = useMedicine();
  const { settings } = useSettings();
  const { addToast } = useToast();
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    if (medicines.length === 0) {
      addToast('No medicines to export', 'warning');
      return;
    }
    setExporting(true);
    try {
      exportToPDF(medicines, stats, emergencyCheck, settings);
      addToast('PDF exported successfully', 'success');
    } catch {
      addToast('Failed to export PDF', 'error');
    } finally {
      setExporting(false);
    }
  };

  const handleExportTXT = () => {
    if (medicines.length === 0) {
      addToast('No medicines to export', 'warning');
      return;
    }
    try {
      exportToTXT(medicines, stats, emergencyCheck, settings);
      addToast('TXT exported successfully', 'success');
    } catch {
      addToast('Failed to export TXT', 'error');
    }
  };

  const handleExportJSON = () => {
    if (medicines.length === 0) {
      addToast('No medicines to export', 'warning');
      return;
    }
    try {
      exportToJSON(medicines, stats, emergencyCheck);
      addToast('JSON exported successfully', 'success');
    } catch {
      addToast('Failed to export JSON', 'error');
    }
  };

  return (
    <div className="pb-24 md:pb-8">
      <div className="px-4 py-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="font-serif text-2xl font-semibold mb-2">Export Report</h2>
          <p className="text-sm text-muted-foreground">
            Export your medicine inventory for backup or AI analysis
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5 mb-6"
        >
          <h3 className="font-semibold text-sm mb-4">Inventory Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Medicines</span>
              <span className="font-medium">{stats.totalMedicines}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expiring Soon</span>
              <span className="font-medium text-amber-400">{stats.expiringSoon}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expired</span>
              <span className="font-medium text-rose-400">{stats.expired}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Readiness</span>
              <span className="font-medium">{stats.readinessScore}%</span>
            </div>
          </div>
        </motion.div>

        {/* Export Options */}
        <div className="space-y-3">
          {/* PDF Export */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleExportPDF}
            disabled={exporting || medicines.length === 0}
            className="w-full glass rounded-2xl p-5 text-left hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Export as PDF</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#5F9E95]/20 text-[#5F9E95] text-[10px] font-medium">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Formatted report with cover page, tables, and AI analysis prompt
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <FileSpreadsheet className="w-3 h-3" />
                  <span>Professional layout • Ready to share</span>
                </div>
              </div>
              <FileDown className="w-5 h-5 text-muted-foreground group-hover:text-[#5F9E95] transition-colors" />
            </div>
          </motion.button>

          {/* TXT Export */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleExportTXT}
            disabled={medicines.length === 0}
            className="w-full glass rounded-2xl p-5 text-left hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Export as TXT</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Plain text format optimized for AI assistant input
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>AI-friendly • Easy to copy-paste</span>
                </div>
              </div>
              <FileDown className="w-5 h-5 text-muted-foreground group-hover:text-[#5F9E95] transition-colors" />
            </div>
          </motion.button>

          {/* JSON Export */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleExportJSON}
            disabled={medicines.length === 0}
            className="w-full glass rounded-2xl p-5 text-left hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <FileJson className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Export as JSON</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Structured JSON data for developers and advanced analysis
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <FileJson className="w-3 h-3" />
                  <span>Machine-readable • Structured data</span>
                </div>
              </div>
              <FileDown className="w-5 h-5 text-muted-foreground group-hover:text-[#5F9E95] transition-colors" />
            </div>
          </motion.button>
        </div>

        {/* AI Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 glass rounded-2xl p-5 border border-[#5F9E95]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#5F9E95]" />
            <h3 className="font-semibold text-sm">AI Analysis Ready</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Every export includes a structured AI analysis prompt. Share your exported file with any AI assistant you trust for:
          </p>
          <ul className="space-y-2 text-sm">
            {[
              'Identifying prescribed medicines available',
              'Finding alternatives based on active ingredients',
              'Flagging expired and expiring medicines',
              'Detecting potential duplicates',
              'Checking emergency essentials',
              'Highlighting possible interactions',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-[#5F9E95] flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-400 mb-1">Important Disclaimer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This application does not provide medical advice. The AI analysis prompt is for informational 
                purposes only. Always consult a qualified healthcare professional before making any decisions 
                about medications, treatments, or emergency preparedness.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 p-4 rounded-xl bg-[#5F9E95]/5 border border-[#5F9E95]/20"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#5F9E95] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#5F9E95] mb-1">Privacy First</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All data stays on your device. When you export, the file is saved locally. 
                You choose what to share and with whom. No cloud storage, no tracking, no accounts.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
