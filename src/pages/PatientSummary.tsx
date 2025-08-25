import { useParams, useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { PatientContextHeader } from "@/components/layout/PatientContextHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  FileText, 
  Pill, 
  AlertTriangle, 
  Calendar,
  TestTube,
  Clock,
  Shield,
  CheckCircle,
  Eye
} from "lucide-react";

// Sample patient data
const samplePatient = {
  id: "pat_001",
  name: "Ravi Kumar",
  age: 46,
  sex: "M",
  abha: "12-3456-7890-1234",
  allergies: ["Penicillin"],
  vitals: {
    bp: "128/82",
    hr: 84,
    temp: "99.1°F"
  },
  visitType: "Follow-up",
  lastVisit: "2025-08-10",
  consentStatus: 'granted' as const,
  chiefComplaint: "Persistent cough with mild fever for 3 days",
  activeProblems: ["Type 2 Diabetes", "Hypertension", "Upper Respiratory Tract Infection"],
  medications: [
    { name: "Metformin 500mg", frequency: "BD", duration: "Ongoing" },
    { name: "Amlodipine 5mg", frequency: "OD", duration: "Ongoing" }
  ],
  recentResults: [
    { test: "HbA1c", result: "7.2%", date: "2025-08-15", status: "Normal" },
    { test: "Creatinine", result: "1.1 mg/dL", date: "2025-08-15", status: "Normal" },
    { test: "Chest X-ray", result: "Clear", date: "2025-08-10", status: "Normal" }
  ]
};

export default function PatientSummary() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleStartEncounter = () => {
    navigate(`/patient/${id}/encounter`);
  };

  const handleViewHistory = () => {
    // Navigate to full history view
    console.log("View full history");
  };

  const handleRequestConsent = () => {
    // Open consent request modal
    console.log("Request consent");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <PatientContextHeader patient={samplePatient} />
          
          <div className="flex gap-6">
            {/* Main Content - Left 2/3 */}
            <div className="flex-1 space-y-6">
              {/* Chief Complaint */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Chief Complaint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{samplePatient.chiefComplaint}</p>
                </CardContent>
              </Card>

              {/* Active Problems */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Active Problems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {samplePatient.activeProblems.map((problem, index) => (
                      <Badge key={index} variant="secondary" className="bg-warning-light text-warning">
                        {problem}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Medications */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-info" />
                    Current Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {samplePatient.medications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.frequency} • {med.duration}</p>
                        </div>
                        <Badge variant="secondary" className="bg-info-light text-info">
                          Active
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Results */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TestTube className="w-5 h-5 text-success" />
                      Recent Results (Last 90 days)
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={handleViewHistory}>
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {samplePatient.recentResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{result.test}</p>
                          <p className="text-sm text-muted-foreground">{result.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{result.result}</p>
                          <Badge variant="secondary" className="bg-success-light text-success">
                            {result.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Last Visit Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    Last Visit Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{samplePatient.lastVisit}</span>
                    </div>
                    <p className="text-sm">
                      Routine diabetes follow-up. Patient stable on current medications. 
                      Advised dietary modifications and regular exercise. Next visit in 3 months.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - 1/3 */}
            <div className="w-80 flex-shrink-0 space-y-6">
              {/* Consent Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    Consent Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-consent-bg rounded-lg">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium text-sm">Consent Active</p>
                        <p className="text-xs text-muted-foreground">
                          Valid until: Dec 31, 2024
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm space-y-2">
                      <p className="font-medium">Permissions granted:</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• View medical history</li>
                        <li>• Order investigations</li>
                        <li>• Prescribe medications</li>
                        <li>• Share with specialists</li>
                      </ul>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleRequestConsent}
                    >
                      Request Additional Consent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Primary Action */}
              <Card className="border-primary">
                <CardContent className="p-6 text-center">
                  <Stethoscope className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Ready to Start?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Begin consultation with this patient
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleStartEncounter}
                  >
                    Start Encounter
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Patient Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Visits:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Lab Work:</span>
                    <span className="font-medium">5 days ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Adherence Score:</span>
                    <Badge variant="secondary" className="bg-success-light text-success">Good</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}