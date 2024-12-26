import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AccountSetup from "./pages/AccountSetup";
import AudienceInsights from "./pages/AudienceInsights";
import GeoReport from "./pages/GeoReport";
import ConversionAnalysis from "./pages/ConversionAnalysis";
import KeywordAnalysis from "./pages/KeywordAnalysis";
import ChannelMix from "./pages/ChannelMix";
import OptimizationList from "./pages/OptimizationList";
import Account from "./pages/Account";
import { ChatPanel } from "./components/chat/ChatPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/account-setup" element={<AccountSetup />} />
        <Route path="/audience-insights" element={<AudienceInsights />} />
        <Route path="/geo-report" element={<GeoReport />} />
        <Route path="/conversion-analysis" element={<ConversionAnalysis />} />
        <Route path="/keyword-analysis" element={<KeywordAnalysis />} />
        <Route path="/channel-mix" element={<ChannelMix />} />
        <Route path="/optimization-list" element={<OptimizationList />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <ChatPanel />
    </Router>
  );
}

export default App;
