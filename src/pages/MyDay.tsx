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
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-3 sm:p-4 lg:p-6">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">Good Morning, Dr. Smith</h2>
              <p className="text-sm text-muted-foreground">Here's your day at a glance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-success-light rounded flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{todayStats.patientsSeen}</p>
                      <p className="text-xs text-muted-foreground">Seen</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-info-light rounded flex items-center justify-center">
                      <Clock className="w-4 h-4 text-info" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{todayStats.avgConsultTime}</p>
                      <p className="text-xs text-muted-foreground">Avg Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-warning-light rounded flex items-center justify-center">
                      <TestTube className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{todayStats.pendingResults}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-light rounded flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{todayStats.messages}</p>
                      <p className="text-xs text-muted-foreground">Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Queue */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Patient Queue</CardTitle>
                      <Badge variant="secondary" className="bg-primary-light text-primary text-xs">
                        {patientQueue.length} waiting
                      </Badge>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                      <Input
                        placeholder="Search patients..."
                        className="pl-7 h-8 text-sm"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-80 overflow-y-auto">
                      {patientQueue.map((patient) => (
                        <div
                          key={patient.id}
                          onClick={() => handlePatientSelect(patient.id)}
                          className="p-3 hover:bg-accent cursor-pointer border-b border-border last:border-0 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{patient.tokenNumber}</span>
                              <Badge variant="secondary" className={`${getPriorityColor(patient.priority)} text-xs`}>
                                {patient.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{patient.waitMin}m</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{patient.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {patient.age}yr • {patient.sex}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-1 truncate">{patient.reason}</p>
                          
                          {patient.allergies.length > 0 && (
                            <div className="flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-danger" />
                              <span className="text-xs text-danger truncate">
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

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full justify-start gap-2 h-8 text-sm">
                      <CreditCard className="w-3 h-3" />
                      Open by ABHA/Card
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start gap-2 h-8 text-sm">
                      <Search className="w-3 h-3" />
                      Search Patient
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start gap-2 h-8 text-sm">
                      <FileText className="w-3 h-3" />
                      Create Note
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start gap-2 h-8 text-sm">
                      <UserPlus className="w-3 h-3" />
                      Register Patient
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="mt-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-accent rounded text-sm">
                      <TestTube className="w-3 h-3 text-success" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs truncate">Lab results for Priya Sharma</p>
                        <p className="text-xs text-muted-foreground">2 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-accent rounded text-sm">
                      <Users className="w-3 h-3 text-info" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs truncate">Consultation completed</p>
                        <p className="text-xs text-muted-foreground">15 min ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}