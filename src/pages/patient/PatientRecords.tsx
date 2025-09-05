import { useState } from 'react';
import { Search, Filter, Calendar, FileText, TestTube, Camera, Pill, Shield, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

const recordTypes = [
  { key: 'all', icon: FileText },
  { key: 'consultations', icon: FileText },
  { key: 'labs', icon: TestTube },
  { key: 'imaging', icon: Camera },
  { key: 'prescriptions', icon: Pill },
  { key: 'vaccines', icon: Shield }
];

const sampleRecords = [
  {
    id: 'r1',
    type: 'Lab',
    title: 'Lipid Profile',
    date: '2025-09-05',
    summary: 'High LDL cholesterol detected. Requires dietary changes.',
    flags: 'high',
    doctor: 'Dr. Sharma',
    facility: 'City Hospital'
  },
  {
    id: 'r2', 
    type: 'Consultation',
    title: 'Diabetes Follow-up',
    date: '2025-08-10',
    summary: 'Blood sugar levels improving. Continue current medication.',
    flags: 'normal',
    doctor: 'Dr. Priya',
    facility: 'Health Center'
  },
  {
    id: 'r3',
    type: 'Prescription',
    title: 'Medication Update',
    date: '2025-08-10', 
    summary: 'Updated Metformin dosage to 500mg twice daily.',
    flags: 'normal',
    doctor: 'Dr. Priya',
    facility: 'Health Center'
  }
];

export const PatientRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useTranslation();

  const filteredRecords = sampleRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || record.type.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const groupedRecords = filteredRecords.reduce((groups, record) => {
    const date = record.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {} as Record<string, typeof sampleRecords>);

  return (
    <div className="p-4 max-w-4xl mx-auto md:ml-60">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Medical Records</h1>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            {recordTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TabsTrigger key={type.key} value={type.key} className="text-xs">
                  <Icon className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">{t(`records.${type.key}`)}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {Object.keys(groupedRecords).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No records found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="multiple" className="space-y-4">
                {Object.entries(groupedRecords).map(([date, records]) => (
                  <AccordionItem key={date} value={date} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
                        <Badge variant="secondary" className="text-xs">
                          {records.length} record{records.length > 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3">
                        {records.map((record) => (
                          <Card key={record.id} className="border-0 bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {record.type}
                                  </Badge>
                                  {record.flags === 'high' && (
                                    <Badge variant="destructive" className="text-xs">
                                      High
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                    <Volume2 className="w-3 h-3 mr-1" />
                                    {t('actions.listen')}
                                  </Button>
                                </div>
                              </div>
                              
                              <h4 className="font-medium mb-1">{record.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{record.summary}</p>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{record.doctor} • {record.facility}</span>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
                                    <Link to={`/patient/records/${record.id}`}>
                                      Open
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                                    {t('records.explain')}
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                                    {t('actions.share')}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};