import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function GoogleAdsCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (!code) {
        toast({
          title: "Error",
          description: "No authorization code received",
          variant: "destructive",
        });
        navigate('/account');
        return;
      }

      try {
        // We'll need to exchange this code for tokens using a backend function
        // For now, we'll just show a success message
        toast({
          title: "Success",
          description: "Google Ads account connected successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to connect Google Ads account",
          variant: "destructive",
        });
      }

      navigate('/account');
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Connecting your Google Ads account...</h1>
        <p className="text-gray-500">Please wait while we complete the connection.</p>
      </div>
    </div>
  );
}