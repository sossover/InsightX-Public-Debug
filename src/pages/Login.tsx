import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/audience-insights"); // Changed from /account-setup to /audience-insights
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      if (session) {
        navigate("/audience-insights"); // Changed from /account-setup to /audience-insights
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-purple-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
              InsightX
            </h1>
            <Sparkles className="w-8 h-8 text-google-blue animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg">Sign in to access your analytics dashboard</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100">
          <EmailLoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <GoogleSignInButton />

          <div className="mt-6 text-center text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="/terms-of-use" className="text-custom-purple-300 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-custom-purple-300 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}