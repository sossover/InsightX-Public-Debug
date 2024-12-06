import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/pages/Root";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import GeoReport from "@/pages/GeoReport";
import KeywordAnalysis from "@/pages/KeywordAnalysis";
import AudienceInsights from "@/pages/AudienceInsights";
import ConversionAnalysis from "@/pages/ConversionAnalysis";
import ChannelMix from "@/pages/ChannelMix";
import OptimizationList from "@/pages/OptimizationList";
import Settings from "@/pages/Settings";
import Templates from "@/pages/Templates";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/geo-report",
        element: <GeoReport />,
      },
      {
        path: "/keyword-analysis",
        element: <KeywordAnalysis />,
      },
      {
        path: "/audience-insights",
        element: <AudienceInsights />,
      },
      {
        path: "/conversion-analysis",
        element: <ConversionAnalysis />,
      },
      {
        path: "/channel-mix",
        element: <ChannelMix />,
      },
      {
        path: "/optimization-list",
        element: <OptimizationList />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}