import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, FileText, Pill, Calendar, MoreHorizontal, Bell, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageToggle } from './LanguageToggle';
import { OfflineBanner } from './OfflineBanner';
import { EmergencySheet } from './EmergencySheet';
import { useTranslation } from '@/hooks/useTranslation';

const navigation = [
  { name: 'nav.home', href: '/patient/home', icon: Home },
  { name: 'nav.records', href: '/patient/records', icon: FileText },  
  { name: 'nav.meds', href: '/patient/meds', icon: Pill },
  { name: 'nav.appts', href: '/patient/appointments', icon: Calendar },
  { name: 'nav.more', href: '/patient/more', icon: MoreHorizontal },
];

export const PatientAppShell = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OfflineBanner />
      
      {/* Header */}
      <header className="border-b bg-surface px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">H+</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:block">HealthCard</span>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">2</Badge>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">AS</AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="py-4">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Anita Sharma</p>
                    <p className="text-sm text-muted-foreground">12-3456-7890-1234</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setEmergencyOpen(true)}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {t('emergency.info')}
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/patient/settings">
                      <User className="w-4 h-4 mr-2" />
                      {t('settings.profile')}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t">
        <div className="flex">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex-1 flex flex-col items-center py-2 px-1 min-h-[60px] ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs text-center leading-tight">{t(item.name)}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex fixed left-0 top-[73px] bottom-0 w-60 bg-surface border-r">
        <nav className="flex flex-col p-4 space-y-2 w-full">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t(item.name)}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Emergency Sheet */}
      <EmergencySheet open={emergencyOpen} onOpenChange={setEmergencyOpen} />
    </div>
  );
};