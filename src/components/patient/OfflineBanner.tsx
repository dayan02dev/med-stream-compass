import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from '@/hooks/useTranslation';

export const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastSync(new Date());
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial sync time if online
    if (isOnline && !lastSync) {
      setLastSync(new Date());
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline, lastSync]);

  if (isOnline) return null;

  return (
    <Alert className="rounded-none border-x-0 bg-orange-50 border-orange-200 text-orange-800">
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="text-sm">
        {t('offline.banner')}
        {lastSync && (
          <span className="ml-2 text-xs opacity-75">
            {t('offline.lastSync')}: {lastSync.toLocaleTimeString()}
          </span>
        )}
      </AlertDescription>
    </Alert>
  );
};