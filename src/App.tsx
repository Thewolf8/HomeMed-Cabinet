import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { Dashboard } from '@/pages/Dashboard';
import { MedicineList } from '@/pages/MedicineList';
import { AddMedicine } from '@/pages/AddMedicine';
import { EditMedicine } from '@/pages/EditMedicine';
import { ExportPage } from '@/pages/ExportPage';
import { SettingsPage } from '@/pages/SettingsPage';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  const { toasts, removeToast } = useToast();

  // Only show FAB on dashboard and medicines pages
  const showFab = ['/', '/medicines'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-600">
      <Header />
      
      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              }
            />
            <Route
              path="/medicines"
              element={
                <PageWrapper>
                  <MedicineList />
                </PageWrapper>
              }
            />
            <Route
              path="/add"
              element={
                <PageWrapper>
                  <AddMedicine />
                </PageWrapper>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PageWrapper>
                  <EditMedicine />
                </PageWrapper>
              }
            />
            <Route
              path="/export"
              element={
                <PageWrapper>
                  <ExportPage />
                </PageWrapper>
              }
            />
            <Route
              path="/settings"
              element={
                <PageWrapper>
                  <SettingsPage />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <BottomNav />
      {showFab && <FloatingActionButton />}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
