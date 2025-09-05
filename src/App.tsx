import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MyDay from "./pages/MyDay";
import PatientSummary from "./pages/PatientSummary";
import EncounterWorkspace from "./pages/EncounterWorkspace";
import Results from "./pages/Results";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Patient Interface Components
import { PatientAppShell } from "./components/patient/PatientAppShell";
import { PatientOnboarding } from "./pages/patient/PatientOnboarding";
import { PatientLogin } from "./pages/patient/PatientLogin";
import { PatientHome } from "./pages/patient/PatientHome";
import { PatientRecords } from "./pages/patient/PatientRecords";
import { PatientMedications } from "./pages/patient/PatientMedications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Doctor Interface Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MyDay />} />
          <Route path="/my-day" element={<MyDay />} />
          <Route path="/patient/:id/summary" element={<PatientSummary />} />
          <Route path="/patient/:id/encounter" element={<EncounterWorkspace />} />
          <Route path="/results" element={<Results />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Patient Interface Routes */}
          <Route path="/patient/onboarding" element={<PatientOnboarding />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/*" element={<PatientAppShell />}>
            <Route path="home" element={<PatientHome />} />
            <Route path="records" element={<PatientRecords />} />
            <Route path="meds" element={<PatientMedications />} />
            <Route path="appointments" element={<div className="p-4">Appointments Page - Coming Soon</div>} />
            <Route path="more" element={<div className="p-4">More Page - Coming Soon</div>} />
            <Route path="voice" element={<div className="p-4">Voice Assistant - Coming Soon</div>} />
            <Route path="share" element={<div className="p-4">Share Records - Coming Soon</div>} />
            <Route path="consent" element={<div className="p-4">Consent Management - Coming Soon</div>} />
            <Route path="education" element={<div className="p-4">Health Education - Coming Soon</div>} />
            <Route path="track" element={<div className="p-4">Health Tracking - Coming Soon</div>} />
            <Route path="inbox" element={<div className="p-4">Notifications - Coming Soon</div>} />
            <Route path="help" element={<div className="p-4">Help & Support - Coming Soon</div>} />
            <Route path="sync" element={<div className="p-4">Sync Status - Coming Soon</div>} />
            <Route path="emergency" element={<div className="p-4">Emergency Info - Coming Soon</div>} />
            <Route path="appointments/book" element={<div className="p-4">Book Appointment - Coming Soon</div>} />
            <Route path="records/:id" element={<div className="p-4">Record Detail - Coming Soon</div>} />
            <Route path="meds/schedule" element={<div className="p-4">Medicine Schedule - Coming Soon</div>} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;