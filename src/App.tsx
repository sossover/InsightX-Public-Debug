import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import GeoReport from "./pages/GeoReport";
import KeywordAnalysis from "./pages/KeywordAnalysis";
import OptimizationList from "./pages/OptimizationList";
import ConversionAnalysis from "./pages/ConversionAnalysis";
import ChannelMix from "./pages/ChannelMix";
import AudienceInsights from "./pages/AudienceInsights";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/geo-report"
            element={
              <ProtectedRoute>
                <GeoReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/keyword-analysis"
            element={
              <ProtectedRoute>
                <KeywordAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/optimization-list"
            element={
              <ProtectedRoute>
                <OptimizationList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversion-analysis"
            element={
              <ProtectedRoute>
                <ConversionAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/channel-mix"
            element={
              <ProtectedRoute>
                <ChannelMix />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audience-insights"
            element={
              <ProtectedRoute>
                <AudienceInsights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;