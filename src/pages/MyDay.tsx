import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  Users, 
  TestTube, 
  MessageSquare, 
  Search,
  CreditCard,
  UserPlus,
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample patient queue data
const patientQueue = [
  {
    id: "pat_001",
    name: "Ravi Kumar",
    age: 46,
    sex: "M",
    waitMin: 18,
    reason: "Cough & fever",
    priority: "Normal",
    abha: "12-3456-7890-1234",
    allergies: ["Penicillin"],
    tokenNumber: "A-12"
  },
  {
    id: "pat_002",
    name: "Priya Sharma",
    age: 32,
    sex: "F",
    waitMin: 25,
    reason: "Diabetes follow-up",
    priority: "Follow-up",
    abha: "12-3456-7890-1235",
    allergies: [],
    tokenNumber: "A-13"
  },
  {
    id: "pat_003",
    name: "Amit Singh",
    age: 58,
    sex: "M",
    waitMin: 5,
    reason: "Chest pain",
    priority: "Urgent",
    abha: "12-3456-7890-1236",
    allergies: ["Aspirin"],
    tokenNumber: "U-03"
  }
];

const todayStats = {
  patientsSeen: 24,
  avgConsultTime: "12 min",
  pendingResults: 8,
  messages: 3
};

export default function MyDay() {
  const navigate = useNavigate();

  const handlePatientSelect = (patientId: string) => {
    navigate(`/patient/${patientId}/summary`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "bg-danger-light text-danger";
      case "Follow-up": return "bg-info-light text-info";
      default: return "bg-success-light text-success";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        
        <main className="flex-1 flex gap-6 p-6 overflow-auto">
          {/* Queue - Left Column */}
          <div className="w-80 flex-shrink-0">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Patient Queue</CardTitle>
                  <Badge variant="secondary" className="bg-primary-light text-primary">
                    {patientQueue.length} waiting
                  </Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {patientQueue.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => handlePatientSelect(patient.id)}
                      className="p-4 hover:bg-accent cursor-pointer border-b border-border last:border-0 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{patient.tokenNumber}</span>
                          <Badge variant="secondary" className={getPriorityColor(patient.priority)}>
                            {patient.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{patient.waitMin}m</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.age}yr • {patient.sex}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">{patient.reason}</p>
                      
                      {patient.allergies.length > 0 && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-danger" />
                          <span className="text-xs text-danger">
                            Allergic to: {patient.allergies.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today Overview - Center Column */}
          <div className="flex-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Good Morning, Dr. Smith</h2>
                <p className="text-muted-foreground">Here's your day at a glance</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{todayStats.patientsSeen}</p>
                        <p className="text-xs text-muted-foreground">Patients Seen</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-info-light rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{todayStats.avgConsultTime}</p>
                        <p className="text-xs text-muted-foreground">Avg Consult Time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning-light rounded-lg flex items-center justify-center">
                        <TestTube className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{todayStats.pendingResults}</p>
                        <p className="text-xs text-muted-foreground">Pending Results</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{todayStats.messages}</p>
                        <p className="text-xs text-muted-foreground">Messages/Tasks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <TestTube className="w-4 h-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Lab results available for Priya Sharma</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <Users className="w-4 h-4 text-info" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Consultation completed for Rajesh Gupta</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions - Right Column */}
          <div className="w-80 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start gap-3" size="lg">
                  <CreditCard className="w-4 h-4" />
                  Open by ABHA/Card
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                  <Search className="w-4 h-4" />
                  Search Patient
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                  <FileText className="w-4 h-4" />
                  Create Note (No ID)
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                  <UserPlus className="w-4 h-4" />
                  Register New Patient
                </Button>
              </CardContent>
            </Card>

            {/* Shortcuts */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Search</span>
                  <Badge variant="secondary" className="text-xs">Ctrl+K</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New Note</span>
                  <Badge variant="secondary" className="text-xs">Ctrl+N</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Patient</span>
                  <Badge variant="secondary" className="text-xs">Ctrl+→</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}