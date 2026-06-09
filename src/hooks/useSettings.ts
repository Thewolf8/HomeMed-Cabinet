import { useCallback, useEffect } from 'react';
import type { AppSettings } from '@/types/medicine';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '@/lib/constants';

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const toggleDarkMode = useCallback(() => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  }, [setSettings]);

  const updateExportPreferences = useCallback((prefs: Partial<AppSettings['exportPreferences']>) => {
    setSettings(prev => ({
      ...prev,
      exportPreferences: { ...prev.exportPreferences, ...prefs },
    }));
  }, [setSettings]);

  const resetAllData = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEYS.medicines);
    window.localStorage.removeItem(STORAGE_KEYS.settings);
    window.location.reload();
  }, []);

  return {
    settings,
    toggleDarkMode,
    updateExportPreferences,
    resetAllData,
  };
}
