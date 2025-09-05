import { useState } from 'react';
import { Pill, Clock, AlertTriangle, CheckCircle, Info, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

const sampleMeds = [
  {
    id: 'rx1',
    name: 'Metformin',
    brand: 'Glycomet',
    dose: '500mg',
    when: ['Morning', 'Night'],
    duration: 'Ongoing',
    leftDays: 18,
    notes: 'Take after food. May cause stomach upset if taken empty stomach.',
    warnings: ['Take with food'],
    nextDue: '8:00 AM'
  },
  {
    id: 'rx2', 
    name: 'Amlodipine',
    brand: 'Amlong',
    dose: '5mg',
    when: ['Morning'],
    duration: 'Ongoing', 
    leftDays: 25,
    notes: 'May cause dizziness. Avoid sudden standing.',
    warnings: ['May cause dizziness'],
    nextDue: '8:00 AM'
  },
  {
    id: 'rx3',
    name: 'Atorvastatin',
    brand: 'Lipitor',
    dose: '10mg',
    when: ['Night'],
    duration: '3 months',
    leftDays: 45,
    notes: 'Take at bedtime. Avoid grapefruit juice.',
    warnings: ['Avoid grapefruit'],
    nextDue: '10:00 PM'
  }
];

const timeFilters = [
  { key: 'all', label: 'All' },
  { key: 'morning', label: 'Morning' },
  { key: 'noon', label: 'Noon' },
  { key: 'night', label: 'Night' },
  { key: 'asNeeded', label: 'As Needed' }
];

export const PatientMedications = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState('all');
  const [takenMeds, setTakenMeds] = useState<Record<string, boolean>>({});
  const { t } = useTranslation();

  const handleTakeMed = (medId: string) => {
    setTakenMeds(prev => ({ ...prev, [medId]: !prev[medId] }));
  };

  const filteredMeds = sampleMeds.filter(med => {
    if (activeTimeFilter === 'all') return true;
    if (activeTimeFilter === 'morning') return med.when.includes('Morning');
    if (activeTimeFilter === 'noon') return med.when.includes('Noon');
    if (activeTimeFilter === 'night') return med.when.includes('Night');
    return false;
  });

  return (
    <TooltipProvider>
      <div className="p-4 max-w-4xl mx-auto md:ml-60">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">My Medications</h1>
            <Button variant="outline" size="sm" asChild>
              <Link to="/patient/meds/schedule">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </Link>
            </Button>
          </div>

          {/* Time Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {timeFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeTimeFilter === filter.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTimeFilter(filter.key)}
                className="whitespace-nowrap"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">{t('meds.current')}</TabsTrigger>
              <TabsTrigger value="history">{t('meds.history')}</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4 mt-6">
              {filteredMeds.map((med) => {
                const isTaken = takenMeds[med.id];
                const isLowStock = med.leftDays <= 7;
                
                return (
                  <Card key={med.id} className={`${isTaken ? 'bg-green-50 border-green-200' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{med.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {med.brand}
                            </Badge>
                            {isLowStock && (
                              <Badge variant="destructive" className="text-xs">
                                {t('meds.refill')}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>{med.dose}</span>
                            <span>•</span>
                            <span>{med.when.join(', ')}</span>
                            <span>•</span>
                            <span>Next: {med.nextDue}</span>
                          </div>

                          <p className="text-sm mb-2">{med.notes}</p>
                          
                          {med.warnings.length > 0 && (
                            <div className="flex items-center gap-1 mb-2">
                              <AlertTriangle className="w-3 h-3 text-orange-500" />
                              <span className="text-xs text-orange-700">
                                {med.warnings.join(', ')}
                              </span>
                            </div>
                          )}

                          {/* Stock Level */}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground">Stock:</span>
                            <div className="flex-1 max-w-20">
                              <Progress 
                                value={(med.leftDays / 30) * 100} 
                                className="h-1"
                              />
                            </div>
                            <span className={isLowStock ? 'text-red-600' : 'text-muted-foreground'}>
                              {med.leftDays} days left
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 ml-4">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Info className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">{t('meds.tip')}</p>
                            </TooltipContent>
                          </Tooltip>

                          <Button
                            size="sm"
                            variant={isTaken ? 'secondary' : 'default'}
                            onClick={() => handleTakeMed(med.id)}
                            className={isTaken ? 'bg-green-100 text-green-800 border-green-200' : ''}
                          >
                            {isTaken ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t('meds.taken')}
                              </>
                            ) : (
                              <>
                                <Pill className="w-3 h-3 mr-1" />
                                {t('actions.takeMed')}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardContent className="p-8 text-center">
                  <Pill className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Past Medications</h3>
                  <p className="text-sm text-muted-foreground">
                    Your medication history will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
};