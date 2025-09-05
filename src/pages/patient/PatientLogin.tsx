import { useState } from 'react';
import { QrCode, Fingerprint, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageToggle } from '@/components/patient/LanguageToggle';

export const PatientLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setShowOtp(true);
      setOtpTimer(30);
      // Simulate countdown
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleLogin = () => {
    if (otp.length === 6) {
      navigate('/patient/home');
    }
  };

  const handleQrScan = () => {
    // TODO: Implement QR scanner
    navigate('/patient/home');
  };

  const handleBiometric = () => {
    // TODO: Implement biometric auth
    navigate('/patient/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-xl">H+</span>
          </div>
          <h1 className="text-2xl font-bold">HealthCard</h1>
          <p className="text-muted-foreground">Access your health records securely</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Sign In</CardTitle>
              <LanguageToggle />
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">{t('auth.login')}</TabsTrigger>
                <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">{t('auth.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {showOtp && (
                    <div>
                      <Label htmlFor="otp">{t('auth.otp')}</Label>
                      <Input
                        id="otp"
                        type="number"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="mt-1"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={otpTimer > 0}
                          onClick={handleSendOtp}
                        >
                          {otpTimer > 0 ? `${t('auth.resend')} (${otpTimer}s)` : t('auth.resend')}
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={showOtp ? handleLogin : handleSendOtp}
                    className="w-full"
                    disabled={!phone || (showOtp && otp.length !== 6)}
                  >
                    {showOtp ? t('auth.login') : 'Send OTP'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handleQrScan}
                    className="w-full"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    {t('auth.scanQR')}
                  </Button>

                  {biometricEnabled && (
                    <Button
                      variant="outline"
                      onClick={handleBiometric}
                      className="w-full"
                    >
                      <Fingerprint className="w-4 h-4 mr-2" />
                      {t('auth.biometric')}
                    </Button>
                  )}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="biometric" className="text-sm">
                      Enable biometric login
                    </Label>
                    <Switch
                      id="biometric"
                      checked={biometricEnabled}
                      onCheckedChange={setBiometricEnabled}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Create Your Digital Health ID</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get started by verifying your mobile number
                  </p>
                  <Button onClick={() => setShowOtp(true)}>
                    Start Registration
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};