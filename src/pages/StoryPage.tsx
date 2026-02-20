import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { StoryCard } from "../types/content";
import "swiper/css";
import "swiper/css/pagination";

type StoryPageProps = {
  cards: StoryCard[];
};

export const StoryPage = ({ cards }: StoryPageProps) => {
  const [activeNote, setActiveNote] = useState<StoryCard | null>(null);

  return (
    <main className="page">
      <section className="section-header">
        <p className="eyebrow">Chapter by Chapter</p>
        <h2>Swipe Through Our Story</h2>
      </section>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="story-swiper"
        spaceBetween={18}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <motion.article
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="story-card"
            >
              <img src={card.image} alt={card.caption} loading="lazy" />
              <div className="story-content">
                <p>{card.caption}</p>
                <button type="button" onClick={() => setActiveNote(card)}>
                  Tap to open note
                </button>
              </div>
            </motion.article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="page-action">
        <Link to="/timeline" className="cta-link">
          Continue to Timeline
        </Link>
      </div>

      <AnimatePresence>
        {activeNote ? (
          <motion.dialog
            key={activeNote.id}
            className="note-modal"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            open
          >
            <h3>{activeNote.noteTitle}</h3>
            <p>{activeNote.noteBody}</p>
            <button type="button" onClick={() => setActiveNote(null)}>
              Close
            </button>
          </motion.dialog>
        ) : null}
      </AnimatePresence>
    </main>
  );
};
