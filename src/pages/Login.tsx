import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Get the current origin for the redirect URL
  const redirectUrl = window.location.origin;
  console.log('Auth redirect URL:', redirectUrl);

  // Custom function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-purple-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
              InsightX
            </h1>
            <Sparkles className="w-6 h-6 text-google-blue animate-pulse" />
          </div>
          <p className="text-gray-600">Sign in to access your analytics dashboard</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}