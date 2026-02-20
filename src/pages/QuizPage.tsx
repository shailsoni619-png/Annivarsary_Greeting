import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { QuizQuestion } from "../types/content";

type QuizPageProps = {
  questions: QuizQuestion[];
};

export const QuizPage = ({ questions }: QuizPageProps) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const current = useMemo(() => {
    return questions[index] ?? questions[0];
  }, [index, questions]);

  if (!current) {
    return (
      <main className="page">
        <p>No quiz questions available.</p>
      </main>
    );
  }

  const isLast = index === questions.length - 1;
  const isCorrect = selected === current.correctIndex;

  const handleNext = () => {
    if (isLast) {
      return;
    }

    setSelected(null);
    setIndex((value) => value + 1);
  };

  return (
    <main className="page">
      <section className="section-header">
        <p className="eyebrow">Fun Corner</p>
        <h2>Mini Love Quiz</h2>
        <p className="small-copy">
          Question {index + 1} of {questions.length}
        </p>
      </section>

      <motion.section key={current.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="quiz-card">
        <h3>{current.question}</h3>

        <div className="quiz-options">
          {current.options.map((option, optionIndex) => {
            const isPicked = selected === optionIndex;
            return (
              <button
                key={`${current.id}-${optionIndex}`}
                type="button"
                disabled={selected !== null}
                className={`quiz-option ${isPicked ? "selected" : ""}`}
                onClick={() => setSelected(optionIndex)}
              >
                {option}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected !== null ? (
            <motion.div
              className={`quiz-reveal ${isCorrect ? "correct" : "soft"}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <p>{isCorrect ? "Perfect answer." : "Still beautiful."}</p>
              <p>{current.revealNote}</p>
              <img src={current.revealImage} alt="Memory reveal" loading="lazy" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="quiz-nav">
          {!isLast ? (
            <button type="button" onClick={handleNext} disabled={selected === null}>
              Next Question
            </button>
          ) : (
            <Link to="/surprise" className={`cta-link ${selected === null ? "disabled" : ""}`}>
              Open Surprise
            </Link>
          )}
        </div>
      </motion.section>
    </main>
  );
};
