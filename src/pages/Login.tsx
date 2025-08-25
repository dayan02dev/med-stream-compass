import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Stethoscope } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const roles = [
  { id: "doctor", label: "Doctor", selected: true },
  { id: "mo", label: "MO", selected: false },
  { id: "nurse", label: "Nurse", selected: false },
  { id: "pharmacist", label: "Pharmacist", selected: false },
];

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("doctor");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${selectedRole}!`,
      });
      navigate("/my-day");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Stethoscope className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Smart OPD</h1>
          <p className="text-muted-foreground">Digital Healthcare System</p>
        </div>

        <Card className="shadow-healthcare-lg">
          <CardHeader className="text-center">
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Mobile/Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter mobile number or email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-sm text-muted-foreground">
                  Forgot password?
                </Button>
              </div>
            </form>

            <Separator className="my-6" />

            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Continue as</Label>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Badge
                    key={role.id}
                    variant={selectedRole === role.id ? "default" : "secondary"}
                    className="cursor-pointer px-3 py-1"
                    onClick={() => setSelectedRole(role.id)}
                  >
                    {role.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Language Toggle */}
            <div className="mt-6 text-center">
              <Button variant="outline" size="sm">
                EN / हिंदी
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2024 Smart OPD. All rights reserved.
        </p>
      </div>
    </div>
  );
}