import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";

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
        const response = await fetch('https://tetpfwhzydrcoseyvhaw.functions.supabase.co/google-ads-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`,
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to connect to Google Ads');
        }

        const data = await response.json();
        console.log('Received accounts data:', data);

        if (!data.accounts || !Array.isArray(data.accounts)) {
          throw new Error('No accounts data received');
        }

        // Encode the accounts data and redirect to account page
        const encodedAccounts = encodeURIComponent(JSON.stringify(data.accounts));
        navigate(`/account?success=true&accounts=${encodedAccounts}`);
      } catch (error) {
        console.error('Error in callback:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to connect to Google Ads",
          variant: "destructive",
        });
        navigate('/account');
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-purple-50 to-white">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-custom-purple-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connecting to Google Ads</h1>
          <p className="text-gray-600">Please wait while we process your connection...</p>
        </div>
      </div>
    </SidebarProvider>
  );
}