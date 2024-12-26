import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";

export default function GoogleAdsCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (!code) {
        setError("No authorization code received");
        setIsProcessing(false);
        toast({
          title: "Error",
          description: "No authorization code received",
          variant: "destructive",
        });
        setTimeout(() => navigate('/account'), 3000);
        return;
      }

      try {
        console.log("Processing Google Ads callback with code:", code);
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No active session');
        }

        const { data, error } = await supabase.functions.invoke('google-ads-auth', {
          body: { code },
        });

        console.log("Google Ads auth response:", { data, error });

        if (error) throw error;

        setSuccess(true);
        setIsProcessing(false);
        toast({
          title: "Success!",
          description: "Google Ads account connected successfully",
        });
        
        // Redirect after a short delay to show success state
        setTimeout(() => navigate('/account'), 2000);
      } catch (error: any) {
        console.error('Error connecting Google Ads account:', error);
        setError(error.message || "Failed to connect Google Ads account");
        setIsProcessing(false);
        toast({
          title: "Error",
          description: "Failed to connect Google Ads account",
          variant: "destructive",
        });
        setTimeout(() => navigate('/account'), 3000);
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex h-screen overflow-hidden">
      <NavigationSidebar />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            {isProcessing ? (
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-google-blue mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-4">Connecting your Google Ads account...</h1>
                <p className="text-gray-500">Please wait while we complete the connection.</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
                <p className="text-gray-600 mb-4">{error}</p>
                <p className="text-sm text-gray-500">Redirecting you back...</p>
              </div>
            ) : success ? (
              <div className="text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-green-600 mb-4">Successfully Connected!</h1>
                <p className="text-gray-600 mb-4">Your Google Ads account has been connected.</p>
                <p className="text-sm text-gray-500">Redirecting you to your account...</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <ChatPanel />
    </div>
  );
}