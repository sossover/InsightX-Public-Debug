import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AudienceInsights from "./pages/AudienceInsights";
import GeoReport from "./pages/GeoReport";
import ConversionAnalysis from "./pages/ConversionAnalysis";
import KeywordAnalysis from "./pages/KeywordAnalysis";
import ChannelMix from "./pages/ChannelMix";
import Canvas from "./pages/Canvas";
import OptimizationList from "./pages/OptimizationList";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import GoogleAdsCallback from "./pages/GoogleAdsCallback";
import { ChatPanel } from "./components/chat/ChatPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/audience-insights" element={<AudienceInsights />} />
        <Route path="/geo-report" element={<GeoReport />} />
        <Route path="/conversion-analysis" element={<ConversionAnalysis />} />
        <Route path="/keyword-analysis" element={<KeywordAnalysis />} />
        <Route path="/channel-mix" element={<ChannelMix />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/optimization-list" element={<OptimizationList />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/google-ads-callback" element={<GoogleAdsCallback />} />
      </Routes>
      <ChatPanel />
    </Router>
  );
}

export default App;