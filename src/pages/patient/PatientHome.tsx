import { QrCode, Share2, Calendar, AlertCircle, CheckCircle, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

export const PatientHome = () => {
  const { t } = useTranslation();

  const carePlanTasks = [
    { label: "Fasting blood test", due: "2025-10-10", status: "pending", priority: "high" },
    { label: "Blood pressure check", due: "2025-10-08", status: "overdue", priority: "high" },
    { label: "Diabetes follow-up", due: "2025-10-15", status: "scheduled", priority: "medium" }
  ];

  const todayMeds = [
    { name: "Metformin", dose: "500mg", time: "Morning", taken: true },
    { name: "Amlodipine", dose: "5mg", time: "Morning", taken: false },
    { name: "Metformin", dose: "500mg", time: "Night", taken: false }
  ];

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto md:ml-60">
      {/* Health Summary Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold">Good morning, Anita!</h1>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Type 2 Diabetes
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Hypertension
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          You have 2 medications due today and 1 overdue task.
        </p>
      </div>

      {/* Voice Assistant Bar */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-purple-900">Need help?</p>  
              <p className="text-sm text-purple-700">Ask about your medicines or reports</p>
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/patient/voice">
                <Mic className="w-4 h-4 mr-2" />
                Ask Assistant
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Care Plan */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              {t('home.carePlan')}
              <Badge variant="secondary" className="text-xs">3 tasks</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {carePlanTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.label}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                </div>
                <div className="flex items-center gap-2">
                  {task.status === 'overdue' && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  {task.status === 'scheduled' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <Badge 
                    variant={task.status === 'overdue' ? 'destructive' : 
                            task.status === 'scheduled' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-3" asChild>
              <Link to="/patient/appointments/book">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t('home.today')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Medications */}
            <div>
              <h4 className="font-medium mb-2 text-sm">Medications Due</h4>
              <div className="space-y-2">
                {todayMeds.map((med, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded ${
                    med.taken ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
                  }`}>
                    <div>
                      <p className="font-medium text-sm">{med.name} {med.dose}</p>
                      <p className="text-xs text-muted-foreground">{med.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {med.taken ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          Taken
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs h-6">
                          {t('actions.takeMed')}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Appointment */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-sm text-blue-900 mb-1">Next Appointment</h4>
              <p className="text-sm text-blue-800">Dr. Sharma - Medicine</p>
              <p className="text-xs text-blue-700">Oct 15, 2025, 10:30 AM</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t('home.quick')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <QrCode className="w-6 h-6" />
              <span className="text-sm">{t('home.checkIn')}</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2" asChild>
              <Link to="/patient/share">
                <Share2 className="w-6 h-6" />
                <span className="text-sm">{t('home.shareRecords')}</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2" asChild>
              <Link to="/patient/appointments/book">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Book Appointment</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Latest Results Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-orange-900">New Lab Results</h4>
              <p className="text-sm text-orange-800 mb-2">
                {t('records.highLab')}
              </p>
              <Button size="sm" variant="outline" className="bg-white" asChild>
                <Link to="/patient/records">View Results</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};