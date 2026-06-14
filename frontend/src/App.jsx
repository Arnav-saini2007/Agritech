import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import Disease from "./pages/Disease";
import Soil from "./pages/Soil";
import Mandi from "./pages/Mandi";
import Profit from "./pages/Profit";
import Voice from "./pages/Voice";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/disease" element={<Disease />} />
      <Route path="/soil" element={<Soil />} />
      <Route path="/mandi" element={<Mandi />} />
      <Route path="/profit" element={<Profit />} />
      <Route path="/voice" element={<Voice />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
