import { useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProgressTracker } from "./components/ProgressTracker";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { loadAppContent } from "./content/loadContent";
import { GatePage } from "./pages/GatePage";
import { QuizPage } from "./pages/QuizPage";
import { StoryPage } from "./pages/StoryPage";
import { SurprisePage } from "./pages/SurprisePage";
import { TimelinePage } from "./pages/TimelinePage";

const initialUnlockValue = () => {
  return sessionStorage.getItem("anniversary-unlocked") === "yes";
};

function App() {
  const [unlocked, setUnlocked] = useState(initialUnlockValue);
  const content = useMemo(() => loadAppContent(), []);
  const location = useLocation();

  const handleUnlock = () => {
    sessionStorage.setItem("anniversary-unlocked", "yes");
    setUnlocked(true);
  };

  return (
    <div className={`app-shell route-${location.pathname.replace("/", "") || "gate"}`}>
      <ProgressTracker unlocked={unlocked} />
      <Routes>
        <Route path="/" element={<GatePage meta={content.meta} onUnlock={handleUnlock} />} />
        <Route
          path="/story"
          element={
            <ProtectedRoute unlocked={unlocked}>
              <StoryPage cards={content.storyCards} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <ProtectedRoute unlocked={unlocked}>
              <TimelinePage events={content.timeline} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute unlocked={unlocked}>
              <QuizPage questions={content.quiz} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surprise"
          element={
            <ProtectedRoute unlocked={unlocked}>
              <SurprisePage surprise={content.surprise} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
