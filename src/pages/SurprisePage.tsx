import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { SurpriseContent } from "../types/content";

type SurprisePageProps = {
  surprise: SurpriseContent;
};

export const SurprisePage = ({ surprise }: SurprisePageProps) => {
  const [giftOpened, setGiftOpened] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <main className="page">
      <section className="section-header">
        <p className="eyebrow">Final Surprise</p>
        <h2>A Gift for You</h2>
      </section>

      <section className="surprise-stage">
        <button type="button" className={`gift-box ${giftOpened ? "opened" : ""}`} onClick={() => setGiftOpened(true)}>
          {giftOpened ? "Gift Opened" : "Tap to open gift"}
        </button>

        <AnimatePresence>
          {giftOpened ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`envelope ${envelopeOpened ? "opened" : ""}`}
            >
              <button type="button" className="envelope-toggle" onClick={() => setEnvelopeOpened(true)}>
                {envelopeOpened ? "Message Opened" : "Open envelope"}
              </button>

              {envelopeOpened ? (
                <div className="letter">
                  <h3>{surprise.envelopeTitle}</h3>
                  <p>{surprise.envelopeMessage}</p>
                </div>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>

      {giftOpened ? (
        <section className="video-wrap">
          <video controls playsInline preload="metadata" poster="/uploads/placeholder-love.svg">
            <source src={surprise.videoUrl} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </section>
      ) : null}

      <div className="page-action">
        <Link to="/" className="cta-link secondary">
          Start Again
        </Link>
      </div>
    </main>
  );
};
