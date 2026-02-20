import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { AppMeta } from "../types/content";

const keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const fallbackPasscode = "0220";

type GatePageProps = {
  meta: AppMeta;
  onUnlock: () => void;
};

export const GatePage = ({ meta, onUnlock }: GatePageProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const passcode = import.meta.env.VITE_PASSCODE?.toString() || fallbackPasscode;

  const dots = useMemo(() => {
    return Array.from({ length: passcode.length }, (_, index) => index < code.length);
  }, [code.length, passcode.length]);

  const addDigit = (digit: number) => {
    if (code.length >= passcode.length) {
      return;
    }

    const nextCode = `${code}${digit}`;
    setCode(nextCode);

    if (nextCode.length !== passcode.length) {
      return;
    }

    if (nextCode === passcode) {
      onUnlock();
      setTimeout(() => {
        navigate("/story");
      }, 350);
      return;
    }

    setError(true);
    setTimeout(() => {
      setCode("");
      setError(false);
    }, 500);
  };

  return (
    <main className="page page-gate">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="gate-card"
      >
        <p className="eyebrow">Anniversary Unlock</p>
        <h1>{meta.title}</h1>
        <p className="subtitle">{meta.subtitle}</p>

        <p className="duration">A {meta.expectedDurationMin}-minute surprise made with love.</p>

        <div className={`passcode-dots ${error ? "error" : ""}`}>
          {dots.map((filled, index) => (
            <span key={index} className={`dot ${filled ? "filled" : ""}`} />
          ))}
        </div>

        <p className="hint">{meta.passcodeHint}</p>

        <div className="keypad" role="group" aria-label="Passcode keypad">
          {keypadNumbers.map((number) => (
            <button
              key={number}
              onClick={() => addDigit(number)}
              className={`key ${number === 0 ? "key-zero" : ""}`}
              type="button"
            >
              {number}
            </button>
          ))}
          <button className="key key-clear" type="button" onClick={() => setCode("")}>Clear</button>
        </div>

        {error ? <p className="error-text">Almost there, my love. Try again.</p> : null}
      </motion.section>
    </main>
  );
};
