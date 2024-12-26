import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initiateGoogleAdsAuth } from '@/utils/googleAdsAuth';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function GoogleAdsAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const startAuth = async () => {
      try {
        await initiateGoogleAdsAuth();
      } catch (error) {
        console.error('Failed to initiate Google Ads auth:', error);
        toast({
          title: "Error",
          description: "Failed to connect to Google Ads",
          variant: "destructive",
        });
        navigate('/account-setup');
      }
    };

    startAuth();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-purple-50 to-white">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-custom-purple-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Connecting to Google Ads</h1>
        <p className="text-gray-600">Please wait while we redirect you to Google...</p>
      </div>
    </div>
  );
}