import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/account-setup");
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      if (session) {
        navigate("/account-setup");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Custom function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      console.log("Initiating Google sign-in...");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: window.location.origin + '/google-ads-callback',
          skipBrowserRedirect: true
        }
      });

      if (error) {
        console.error('Google sign-in error:', error);
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (data?.url) {
        console.log('Opening auth URL in new window:', data.url);
        window.open(data.url, '_blank', 'width=800,height=600');
      }
    } catch (err) {
      console.error('Unexpected error during sign-in:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign-in",
        variant: "destructive",
      });
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
          <form onSubmit={handleEmailSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full bg-custom-purple-300 hover:bg-custom-purple-400">
              Sign in with Email
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-200 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

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