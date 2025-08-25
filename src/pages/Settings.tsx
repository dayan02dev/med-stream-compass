import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Globe, 
  FileText, 
  Stamp,
  Upload,
  Save
} from "lucide-react";

export default function Settings() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your profile and application preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
                <TabsTrigger value="signature">e-Signature</TabsTrigger>
                <TabsTrigger value="stamps">Stamps</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Dr. John Smith" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" placeholder="Senior Consultant" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="regNumber">Registration Number</Label>
                        <Input id="regNumber" placeholder="MCI-12345" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" placeholder="Internal Medicine" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="doctor@hospital.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+91 9876543210" />
                      </div>
                    </div>
                    
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Language Tab */}
              <TabsContent value="language">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Language Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default UI Language</Label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="uiLanguage" value="en" defaultChecked />
                            <span>English</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="uiLanguage" value="hi" />
                            <span>हिंदी (Hindi)</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="uiLanguage" value="auto" />
                            <span>Auto-detect</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Default Patient-facing Language</Label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="patientLanguage" value="local" defaultChecked />
                            <span>Local Language (Hindi)</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="patientLanguage" value="en" />
                            <span>English</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="transliteration" />
                        <Label htmlFor="transliteration">Enable transliteration for local language input</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="autoTranslate" />
                        <Label htmlFor="autoTranslate">Auto-translate prescriptions to patient language</Label>
                      </div>
                    </div>
                    
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Language Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* e-Signature Tab */}
              <TabsContent value="signature">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Digital Signature
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Upload Signature Image</Label>
                        <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop your signature
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG up to 2MB
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Current Signature</Label>
                        <div className="border border-border rounded-lg p-4 bg-accent">
                          <div className="text-center text-muted-foreground">
                            <FileText className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">No signature uploaded</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Test Signature Preview</Label>
                        <div className="mt-2 border border-border rounded-lg p-4 bg-background">
                          <div className="space-y-2 text-sm">
                            <p><strong>Dr. John Smith</strong></p>
                            <p>Registration No: MCI-12345</p>
                            <p>Senior Consultant, Internal Medicine</p>
                            <p>Digital Signature: [Signature would appear here]</p>
                            <p className="text-xs text-muted-foreground">Digitally signed on {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Signature
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stamps Tab */}
              <TabsContent value="stamps">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stamp className="w-5 h-5 text-primary" />
                      Official Stamps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Hospital Stamp</Label>
                        <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Upload hospital official stamp
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG up to 2MB
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Department Stamp</Label>
                        <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Upload department stamp (optional)
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG up to 2MB
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Stamp Preview</Label>
                        <div className="border border-border rounded-lg p-4 bg-accent">
                          <div className="text-center text-muted-foreground">
                            <Stamp className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">No stamps uploaded</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Stamps
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}