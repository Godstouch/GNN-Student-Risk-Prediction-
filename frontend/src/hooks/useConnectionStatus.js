import { useState, useEffect, useCallback } from 'react';

// Same online/offline tracking as OfflineIndicator, but as a hook so
// SettingsPage can also expose a manual "check connection" action.
// Once the real Flask API exists, refresh() should ping /api/health
// instead of just re-reading navigator.onLine.
export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const refresh = useCallback(async () => {
    setChecking(true);
    // Placeholder delay to simulate a real health-check request.
    // Replace with: await fetch('/api/health') once the backend exists.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsOnline(navigator.onLine);
    setChecking(false);
  }, []);

  return { isOnline, checking, refresh };
}
