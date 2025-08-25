import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TestTube, 
  Search, 
  Filter, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";

// Sample results data
const results = [
  {
    id: "result_001",
    patientName: "Ravi Kumar",
    patientId: "pat_001",
    test: "Complete Blood Count",
    result: "WBC: 8,500/μL, RBC: 4.2M/μL, Platelets: 250,000/μL",
    flag: "Normal",
    time: "2 hours ago",
    status: "new",
    critical: false
  },
  {
    id: "result_002",
    patientName: "Priya Sharma",
    patientId: "pat_002",
    test: "HbA1c",
    result: "9.2%",
    flag: "High",
    time: "3 hours ago",
    status: "new",
    critical: true
  },
  {
    id: "result_003",
    patientName: "Amit Singh",
    patientId: "pat_003",
    test: "Chest X-ray",
    result: "Bilateral lower lobe consolidation",
    flag: "Abnormal",
    time: "1 hour ago",
    status: "acknowledged",
    critical: true
  },
  {
    id: "result_004",
    patientName: "Sunita Patel",
    patientId: "pat_004",
    test: "Lipid Profile",
    result: "Total Cholesterol: 180 mg/dL, HDL: 45 mg/dL",
    flag: "Normal",
    time: "5 hours ago",
    status: "new",
    critical: false
  }
];

export default function Results() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-info text-info-foreground">New</Badge>;
      case "acknowledged":
        return <Badge variant="secondary">Acknowledged</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFlagBadge = (flag: string, critical: boolean) => {
    if (critical) {
      return <Badge className="bg-danger text-danger-foreground">Critical</Badge>;
    }
    
    switch (flag) {
      case "High":
      case "Low":
      case "Abnormal":
        return <Badge className="bg-warning text-warning-foreground">{flag}</Badge>;
      case "Normal":
        return <Badge className="bg-success text-success-foreground">Normal</Badge>;
      default:
        return <Badge variant="secondary">{flag}</Badge>;
    }
  };

  const handleAcknowledge = (resultId: string) => {
    console.log("Acknowledge result:", resultId);
  };

  const handleViewResult = (resultId: string) => {
    console.log("View result detail:", resultId);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Results Inbox</h1>
                <p className="text-muted-foreground">Review new and pending results across all your patients</p>
              </div>
              
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by patient name or test..."
                      className="pl-10"
                    />
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-danger hover:text-danger-foreground">
                      Critical (2)
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-warning hover:text-warning-foreground">
                      Abnormal (3)
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-info hover:text-info-foreground">
                      New (4)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-primary" />
                  Recent Results ({results.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-4 font-medium">Patient</th>
                        <th className="text-left p-4 font-medium">Test</th>
                        <th className="text-left p-4 font-medium">Result</th>
                        <th className="text-left p-4 font-medium">Flag</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Time</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr 
                          key={result.id} 
                          className="border-b border-border hover:bg-accent cursor-pointer"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {result.critical && (
                                <AlertTriangle className="w-4 h-4 text-danger" />
                              )}
                              <div>
                                <p className="font-medium">{result.patientName}</p>
                                <p className="text-sm text-muted-foreground">{result.patientId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-medium">{result.test}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm max-w-xs truncate">{result.result}</p>
                          </td>
                          <td className="p-4">
                            {getFlagBadge(result.flag, result.critical)}
                          </td>
                          <td className="p-4">
                            {getStatusBadge(result.status)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span className="text-sm">{result.time}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewResult(result.id)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              {result.status === "new" && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleAcknowledge(result.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Acknowledge
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-danger-light rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-danger" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-xs text-muted-foreground">Critical Results</p>
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
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-muted-foreground">Abnormal Results</p>
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
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-xs text-muted-foreground">New Results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">18</p>
                      <p className="text-xs text-muted-foreground">Acknowledged Today</p>
                    </div>
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