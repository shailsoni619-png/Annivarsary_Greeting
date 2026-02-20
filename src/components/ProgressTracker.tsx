import { Link, useLocation } from "react-router-dom";

const steps = [
  { path: "/story", label: "Story" },
  { path: "/timeline", label: "Timeline" },
  { path: "/quiz", label: "Quiz" },
  { path: "/surprise", label: "Surprise" },
] as const;

const stepIndexByPath = (pathname: string): number => {
  const index = steps.findIndex((step) => pathname.startsWith(step.path));
  return index;
};

type ProgressTrackerProps = {
  unlocked: boolean;
};

export const ProgressTracker = ({ unlocked }: ProgressTrackerProps) => {
  const location = useLocation();

  if (!unlocked || location.pathname === "/") {
    return null;
  }

  const activeIndex = stepIndexByPath(location.pathname);

  return (
    <nav className="progress-nav" aria-label="Journey progress">
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;

        return (
          <Link
            key={step.path}
            to={step.path}
            className={`progress-chip ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
          >
            <span className="dot" aria-hidden="true" />
            {step.label}
          </Link>
        );
      })}
    </nav>
  );
};
