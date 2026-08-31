import { useState, useEffect } from 'react';

// Tracks browser online/offline state. This reflects internet connectivity
// generically for now — once the Flask/Pi backend is wired up, swap this
// for a real ping-based check against the local server (see usePredictions
// hook, planned for Week 3 of the build plan).
export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary">
      <span
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: isOnline
            ? 'var(--color-status-online)'
            : 'var(--color-status-offline)',
        }}
      />
      {isOnline ? 'Connected' : 'Offline'}
    </span>
  );
}
