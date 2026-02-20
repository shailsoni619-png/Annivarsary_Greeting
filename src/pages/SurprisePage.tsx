import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { SurpriseContent } from "../types/content";

type SurprisePageProps = {
  surprise: SurpriseContent;
};

export const SurprisePage = ({ surprise }: SurprisePageProps) => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <main className="page">
      <section className="section-header">
        <h2>Final Surprise</h2>
      </section>

      <section className="surprise-stage">
        <button
          type="button"
          className={`envelope-hero ${envelopeOpened ? "opened" : ""}`}
          onClick={() => setEnvelopeOpened(true)}
          aria-label="Open envelope"
        >
          <span className="envelope-art" aria-hidden="true">
            <span className="envelope-flap" />
            <span className="envelope-body" />
            <span className="envelope-heart">❤</span>
          </span>
        </button>

        <AnimatePresence>
          {envelopeOpened ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="letter letter-scroll-wrap"
            >
              <h3>{surprise.envelopeTitle}</h3>
              <div className="letter-scroll">
                <p>{surprise.envelopeMessage}</p>
              </div>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </section>

      <div className="page-action">
        <Link to="/" className="cta-link secondary">
          Start Again
        </Link>
      </div>
    </main>
  );
};
