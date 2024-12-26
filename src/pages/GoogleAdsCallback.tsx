import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export default function GoogleAdsCallback() {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    setCode(authCode);

    if (!authCode) {
      setError("No authorization code found in URL parameters");
      toast({
        title: "Error",
        description: "No authorization code found",
        variant: "destructive",
      });
      setTimeout(() => navigate('/account'), 3000);
    }
  }, [navigate, toast]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Google Ads Authorization</h1>
        <p className="text-gray-600 mb-4">Your Google Ads OAuth code:</p>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {code}
        </pre>
      </div>
    </div>
  );
}