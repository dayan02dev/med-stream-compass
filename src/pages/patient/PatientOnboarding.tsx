import { useState } from 'react';
import { ChevronRight, Globe, Bell, Volume2, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const onboardingSteps = [
  {
    icon: Heart,
    titleKey: 'onboarding.welcome.title',
    contentKey: 'onboarding.welcome.content'
  },
  {
    icon: Shield,
    titleKey: 'onboarding.privacy.title', 
    contentKey: 'onboarding.privacy.content'
  },
  {
    icon: Bell,
    titleKey: 'onboarding.notifications.title',
    contentKey: 'onboarding.notifications.content'
  },
  {
    icon: Volume2,
    titleKey: 'onboarding.voice.title',
    contentKey: 'onboarding.voice.content'
  }
];

export const PatientOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    notifications: true,
    voiceAssistant: false
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/patient/login');
    }
  };

  const handleSkip = () => {
    navigate('/patient/login');
  };

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress indicators */}
        <div className="flex justify-center mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon className="w-10 h-10 text-primary" />
            </div>

            <h1 className="text-2xl font-bold mb-4">
              {currentStep === 0 ? "Welcome to HealthCard" : 
               currentStep === 1 ? "Your Privacy Matters" :
               currentStep === 2 ? "Stay Informed" : 
               "Voice Assistant"}
            </h1>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {currentStep === 0 ? "Your digital health companion. Access your medical records, track medications, and stay connected with your care team." :
               currentStep === 1 ? "You control who sees your health information. Only share what you want, when you want." :
               currentStep === 2 ? "Get reminders for medications and appointments. Never miss important health updates." :
               "Get help using voice commands. Ask about your medications, reports, and more."}
            </p>

            {/* Settings for relevant steps */}
            {currentStep === 2 && (
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg">
                <span className="text-sm">Enable notifications</span>
                <Switch 
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, notifications: checked }))
                  }
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg">
                <span className="text-sm">Enable voice assistant</span>
                <Switch 
                  checked={preferences.voiceAssistant}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, voiceAssistant: checked }))
                  }
                />
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                onClick={handleSkip}
                className="flex-1"
              >
                {t('actions.skip')}
              </Button>
              <Button 
                onClick={handleNext}
                className="flex-1"
              >
                {currentStep === onboardingSteps.length - 1 ? 'Get Started' : t('actions.continue')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Globe className="w-4 h-4 mr-2" />
            Available in English & हिंदी
          </Button>
        </div>
      </div>
    </div>
  );
};