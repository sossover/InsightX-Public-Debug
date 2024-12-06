import { useEffect, useState } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";
import { useToast } from "./ui/use-toast";

export const OnboardingTour = () => {
  const [run, setRun] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const steps: Step[] = [
    {
      target: "body",
      placement: "center",
      content: (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Welcome to InsightX! 🎉</h2>
          <p>Let's take a quick tour to help you get started.</p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: ".metrics-cards",
      content: "Here you can see your key performance metrics at a glance",
      placement: "bottom",
    },
    {
      target: ".performance-chart",
      content: "Track your performance trends over time with interactive charts",
      placement: "top",
    },
    {
      target: ".campaign-table",
      content: "Manage and analyze all your campaigns in one place",
      placement: "top",
    },
    {
      target: ".ai-insights",
      content: "Get AI-powered insights and recommendations to optimize your campaigns",
      placement: "top",
    },
    {
      target: ".chat-panel",
      content: "Need help? Chat with our AI assistant anytime",
      placement: "left",
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setRun(false);
      localStorage.setItem("hasSeenTour", "true");
      toast({
        title: "Tour Completed! 🎉",
        description: "You can always restart the tour from the help menu",
      });
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: "#6366f1",
          textColor: "#374151",
          backgroundColor: "#ffffff",
        },
        tooltip: {
          padding: "20px",
        },
        buttonNext: {
          backgroundColor: "#6366f1",
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
    />
  );
};