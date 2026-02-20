import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { TimelineEvent } from "../types/content";

type TimelinePageProps = {
  events: TimelineEvent[];
};

export const TimelinePage = ({ events }: TimelinePageProps) => {
  return (
    <main className="page">
      <section className="section-header">
        <p className="eyebrow">Our Milestones</p>
        <h2>Memory Timeline</h2>
      </section>

      <section className="timeline">
        {events.map((event, index) => (
          <motion.article
            key={event.id}
            className="timeline-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <span className="timeline-dot" aria-hidden="true" />
            <p className="timeline-date">{event.dateLabel}</p>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <img src={event.image} alt={event.title} loading="lazy" />
          </motion.article>
        ))}
      </section>

      <div className="page-action">
        <Link to="/quiz" className="cta-link">
          Start Our Mini Quiz
        </Link>
      </div>
    </main>
  );
};
