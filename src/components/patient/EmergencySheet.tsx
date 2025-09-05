import { Phone, AlertTriangle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/useTranslation';

interface EmergencySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmergencySheet = ({ open, onOpenChange }: EmergencySheetProps) => {
  const { t } = useTranslation();

  const emergencyData = {
    name: "Anita Sharma",
    age: 45,
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    contacts: [
      { name: "Raj Sharma (Husband)", phone: "+91 98765 43210" },
      { name: "Dr. Priya Gupta", phone: "+91 98765 43211" }
    ]
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            {t('emergency.info')}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {/* Patient Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{emergencyData.name}</h3>
              <p className="text-muted-foreground">Age: {emergencyData.age}</p>
            </CardContent>
          </Card>

          {/* Blood Type */}
          <div>
            <h4 className="font-medium mb-2">{t('emergency.bloodType')}</h4>
            <Badge variant="outline" className="text-lg px-3 py-1 bg-red-50 text-red-700 border-red-200">
              {emergencyData.bloodType}
            </Badge>
          </div>

          <Separator />

          {/* Allergies */}
          <div>
            <h4 className="font-medium mb-2 text-orange-700">{t('emergency.allergies')}</h4>
            <div className="flex flex-wrap gap-2">
              {emergencyData.allergies.map((allergy) => (
                <Badge key={allergy} variant="destructive" className="bg-orange-100 text-orange-800 border-orange-200">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Medical Conditions */}
          <div>
            <h4 className="font-medium mb-2">{t('emergency.conditions')}</h4>
            <div className="space-y-1">
              {emergencyData.conditions.map((condition) => (
                <div key={condition} className="text-sm bg-muted p-2 rounded">
                  {condition}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Emergency Contacts */}
          <div>
            <h4 className="font-medium mb-3">{t('emergency.contacts')}</h4>
            <div className="space-y-2">
              {emergencyData.contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Phone className="w-3 h-3 mr-1" />
                    {t('emergency.call')}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-6 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-2">
              <span className="text-xs text-muted-foreground">Emergency QR</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Show this to medical staff for quick access to your info
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};