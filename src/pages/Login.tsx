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
            className="w-full border-gray-200 hover:bg-gray-50"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
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