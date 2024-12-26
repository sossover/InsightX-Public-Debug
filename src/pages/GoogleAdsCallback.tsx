import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

export default function GoogleAdsCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      if (!code) {
        toast({
          title: "Error",
          description: "No authorization code received from Google",
          variant: "destructive",
        });
        navigate("/account");
        return;
      }

      try {
        const { error } = await supabase.functions.invoke('google-ads-callback', {
          body: { code },
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Google Ads account connected successfully!",
        });
        
        navigate("/account?success=true");
      } catch (error) {
        console.error("Error in Google Ads callback:", error);
        toast({
          title: "Error",
          description: "Failed to connect Google Ads account. Please try again.",
          variant: "destructive",
        });
        navigate("/account");
      }
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <NavigationSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Connecting Google Ads...
            </h1>
            <p className="text-gray-600">
              Please wait while we complete the connection process.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}