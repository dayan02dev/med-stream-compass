import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface PatientContextHeaderProps {
  patient: {
    name: string;
    age: number;
    sex: string;
    abha: string;
    allergies?: string[];
    vitals?: {
      bp: string;
      hr: number;
      temp: string;
    };
    visitType?: string;
    lastVisit?: string;
    consentStatus?: 'granted' | 'pending' | 'expired';
  };
}

export const PatientContextHeader = ({ patient }: PatientContextHeaderProps) => {
  const getConsentBadge = () => {
    switch (patient.consentStatus) {
      case 'granted':
        return <Badge variant="secondary" className="bg-success-light text-success"><CheckCircle className="w-3 h-3 mr-1" />Consent Active</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning-light text-warning"><Clock className="w-3 h-3 mr-1" />Consent Pending</Badge>;
      default:
        return <Badge variant="secondary" className="bg-danger-light text-danger"><AlertTriangle className="w-3 h-3 mr-1" />Consent Required</Badge>;
    }
  };

  return (
    <Card className="bg-patient-context border-l-4 border-l-primary p-4 mb-6 sticky top-0 z-10 shadow-healthcare-md">
      <div className="flex items-center justify-between">
        {/* Patient Info */}
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{patient.name}</h2>
            <p className="text-sm text-muted-foreground">
              {patient.age}yr • {patient.sex} • ABHA: {patient.abha}
            </p>
          </div>

          {/* Allergies */}
          {patient.allergies && patient.allergies.length > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-danger" />
              <div className="flex gap-1">
                {patient.allergies.map((allergy, index) => (
                  <Badge key={index} variant="secondary" className="bg-danger-light text-danger">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Vitals */}
          {patient.vitals && (
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <Badge variant="secondary" className="bg-vitals-bg text-success">
                BP: {patient.vitals.bp} | HR: {patient.vitals.hr} | T: {patient.vitals.temp}
              </Badge>
            </div>
          )}
        </div>

        {/* Right Side Info */}
        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <p className="text-muted-foreground">Visit Type</p>
            <p className="font-medium">{patient.visitType || 'Follow-up'}</p>
          </div>
          
          {patient.lastVisit && (
            <div className="text-right text-sm">
              <p className="text-muted-foreground">Last Visit</p>
              <p className="font-medium">{patient.lastVisit}</p>
            </div>
          )}

          {getConsentBadge()}
        </div>
      </div>
    </Card>
  );
};