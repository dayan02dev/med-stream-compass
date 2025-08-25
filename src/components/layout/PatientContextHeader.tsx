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
    <Card className="bg-patient-context border-l-2 border-l-primary p-3 mb-4 sticky top-0 z-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Patient Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-foreground truncate">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">
                {patient.age}yr • {patient.sex} • ABHA: {patient.abha}
              </p>
            </div>

            {/* Allergies & Vitals - Mobile friendly */}
            <div className="flex flex-wrap gap-2">
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-danger" />
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="secondary" className="bg-danger-light text-danger text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              )}

              {patient.vitals && (
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-primary" />
                  <Badge variant="secondary" className="bg-vitals-bg text-success text-xs">
                    {patient.vitals.bp} | {patient.vitals.hr} | {patient.vitals.temp}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="flex items-center justify-between lg:justify-end gap-3 lg:gap-4">
          <div className="flex gap-3 text-sm">
            <div className="text-center lg:text-right">
              <p className="text-xs text-muted-foreground">Visit</p>
              <p className="font-medium text-xs">{patient.visitType || 'Follow-up'}</p>
            </div>
            
            {patient.lastVisit && (
              <div className="text-center lg:text-right">
                <p className="text-xs text-muted-foreground">Last</p>
                <p className="font-medium text-xs">{patient.lastVisit}</p>
              </div>
            )}
          </div>

          {getConsentBadge()}
        </div>
      </div>
    </Card>
  );
};