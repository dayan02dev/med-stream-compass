import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { PatientContextHeader } from "@/components/layout/PatientContextHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Pen, 
  Type, 
  AlertTriangle,
  Heart,
  TestTube,
  PenTool,
  Save,
  Check,
  Globe
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  consentStatus: 'granted' as const
};

// Sample templates
const noteTemplates = [
  { id: "fever_adult", name: "Fever - Adult", category: "General" },
  { id: "htn_followup", name: "HTN Follow-up", category: "Chronic" },
  { id: "diabetes_review", name: "Diabetes Review", category: "Chronic" },
  { id: "respiratory", name: "Respiratory Complaint", category: "General" },
  { id: "chest_pain", name: "Chest Pain", category: "Emergency" }
];

// Sample quick chips for SOAP sections
const quickChips = {
  subjective: ["No fever", "No nausea", "No vomiting", "Good appetite", "Sleep normal"],
  objective: ["Alert", "Afebrile", "No distress", "Vitals stable", "No lymphadenopathy"],
  assessment: ["Stable", "Improving", "Worsening", "New diagnosis", "Chronic stable"],
  plan: ["Continue current meds", "Follow-up 2 weeks", "Lab work ordered", "Lifestyle counseling"]
};

interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export default function EncounterWorkspace() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("soap");
  const [soapNote, setSoapNote] = useState<SOAPNote>({
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  });
  const [inkMode, setInkMode] = useState<{ [key: string]: boolean }>({
    subjective: false,
    objective: false,
    assessment: false,
    plan: false
  });
  const [language, setLanguage] = useState<"en" | "local">("en");
  const [isDrafting, setIsDrafting] = useState(false);

  const handleSoapChange = (section: keyof SOAPNote, value: string) => {
    setSoapNote(prev => ({ ...prev, [section]: value }));
    // Auto-save simulation
    setIsDrafting(true);
    setTimeout(() => {
      setIsDrafting(false);
      toast({
        title: "Draft Saved",
        description: "Your notes have been automatically saved.",
      });
    }, 2000);
  };

  const toggleInkMode = (section: keyof SOAPNote) => {
    setInkMode(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addQuickChip = (section: keyof SOAPNote, text: string) => {
    const currentValue = soapNote[section];
    const newValue = currentValue ? `${currentValue}, ${text}` : text;
    handleSoapChange(section, newValue);
  };

  const handleSignEncounter = () => {
    toast({
      title: "Encounter Signed",
      description: "The encounter has been digitally signed and finalized.",
    });
  };

  const handleLoadTemplate = (template: any) => {
    // Load template content (simulated)
    toast({
      title: "Template Loaded",
      description: `${template.name} template has been loaded.`,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        
        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel - Templates */}
          <div className="w-56 bg-card border-r border-border p-4 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-3">Note Templates</h3>
                <div className="space-y-1">
                  {noteTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left p-2 h-auto"
                      onClick={() => handleLoadTemplate(template)}
                    >
                      <div>
                        <p className="text-sm font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.category}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col p-6 overflow-auto">
            <PatientContextHeader patient={samplePatient} />

            {/* Language Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {isDrafting && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Save className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Saving draft...</span>
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "local" : "en")}
                className="gap-2"
              >
                <Globe className="w-4 h-4" />
                {language === "en" ? "EN" : "हिंदी"}
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="mb-6">
                <TabsTrigger value="soap">SOAP Notes</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="soap" className="flex-1">
                <div className="space-y-6">
                  {/* Subjective */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Subjective
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant={inkMode.subjective ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('subjective')}
                          >
                            <PenTool className="w-4 h-4 mr-2" />
                            Ink
                          </Button>
                          <Button
                            variant={!inkMode.subjective ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('subjective')}
                          >
                            <Type className="w-4 h-4 mr-2" />
                            Text
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {inkMode.subjective ? (
                        <div className="border border-dashed border-border rounded-lg p-6 text-center bg-accent">
                          <Pen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Draw with stylus or finger</p>
                          <p className="text-xs text-muted-foreground mt-1">Handwriting will be converted to text</p>
                        </div>
                      ) : (
                        <Textarea
                          placeholder="Patient's chief complaint and history of present illness..."
                          value={soapNote.subjective}
                          onChange={(e) => handleSoapChange('subjective', e.target.value)}
                          className="min-h-24"
                        />
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {quickChips.subjective.map((chip, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addQuickChip('subjective', chip)}
                          >
                            + {chip}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Objective */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-success" />
                          Objective
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant={inkMode.objective ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('objective')}
                          >
                            <PenTool className="w-4 h-4 mr-2" />
                            Ink
                          </Button>
                          <Button
                            variant={!inkMode.objective ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('objective')}
                          >
                            <Type className="w-4 h-4 mr-2" />
                            Text
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {inkMode.objective ? (
                        <div className="border border-dashed border-border rounded-lg p-6 text-center bg-accent">
                          <Pen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Draw examination findings</p>
                        </div>
                      ) : (
                        <Textarea
                          placeholder="Physical examination findings, vital signs, observations..."
                          value={soapNote.objective}
                          onChange={(e) => handleSoapChange('objective', e.target.value)}
                          className="min-h-24"
                        />
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {quickChips.objective.map((chip, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addQuickChip('objective', chip)}
                          >
                            + {chip}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assessment */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <TestTube className="w-5 h-5 text-warning" />
                          Assessment
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant={inkMode.assessment ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('assessment')}
                          >
                            <PenTool className="w-4 h-4 mr-2" />
                            Ink
                          </Button>
                          <Button
                            variant={!inkMode.assessment ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('assessment')}
                          >
                            <Type className="w-4 h-4 mr-2" />
                            Text
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        placeholder="Clinical impression, diagnosis, differential diagnosis..."
                        value={soapNote.assessment}
                        onChange={(e) => handleSoapChange('assessment', e.target.value)}
                        className="min-h-24"
                      />
                      
                      <div className="flex flex-wrap gap-1">
                        {quickChips.assessment.map((chip, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addQuickChip('assessment', chip)}
                          >
                            + {chip}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Plan */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-info" />
                          Plan
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant={inkMode.plan ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('plan')}
                          >
                            <PenTool className="w-4 h-4 mr-2" />
                            Ink
                          </Button>
                          <Button
                            variant={!inkMode.plan ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInkMode('plan')}
                          >
                            <Type className="w-4 h-4 mr-2" />
                            Text
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        placeholder="Treatment plan, medications, follow-up instructions..."
                        value={soapNote.plan}
                        onChange={(e) => handleSoapChange('plan', e.target.value)}
                        className="min-h-24"
                      />
                      
                      <div className="flex flex-wrap gap-1">
                        {quickChips.plan.map((chip, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addQuickChip('plan', chip)}
                          >
                            + {chip}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" size="lg">
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button size="lg" onClick={handleSignEncounter}>
                      <Check className="w-4 h-4 mr-2" />
                      Sign Encounter
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardContent className="p-8 text-center">
                    <TestTube className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Orders Coming Soon</h3>
                    <p className="text-muted-foreground">Lab and radiology ordering interface will be available here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescription">
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Prescription Coming Soon</h3>
                    <p className="text-muted-foreground">Electronic prescription interface will be available here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary">
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Visit Summary Coming Soon</h3>
                    <p className="text-muted-foreground">Visit summary and signature interface will be available here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Alerts & Info */}
          <div className="w-72 bg-card border-l border-border p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Alerts */}
              <Card className="border-warning">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-danger-light rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-danger" />
                      <span className="font-medium text-sm text-danger">Allergy Alert</span>
                    </div>
                    <p className="text-sm text-danger">Patient allergic to Penicillin</p>
                  </div>
                </CardContent>
              </Card>

              {/* Current Vitals */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-success" />
                    Current Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BP:</span>
                    <span className="font-medium">{samplePatient.vitals.bp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HR:</span>
                    <span className="font-medium">{samplePatient.vitals.hr} bpm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temp:</span>
                    <span className="font-medium">{samplePatient.vitals.temp}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Labs Mini View */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <TestTube className="w-4 h-4 text-info" />
                    Recent Labs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HbA1c:</span>
                    <span className="font-medium">7.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Creatinine:</span>
                    <span className="font-medium">1.1 mg/dL</span>
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    View all results →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}