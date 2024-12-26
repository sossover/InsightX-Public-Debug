import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function GoogleAdsCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // Redirect to account page with success parameter
        navigate('/account?success=true');
      } catch (error) {
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="h-8 w-8 animate-spin text-google-blue" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Connecting your Google Ads account...</h1>
        <p className="text-gray-500">Please wait while we complete the connection.</p>
      </div>
    </div>
  );
}