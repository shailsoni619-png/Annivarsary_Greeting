import type { AppContent } from "../types/content";

const placeholder = "/uploads/placeholder-love.svg";

export const defaultContent: AppContent = {
  meta: {
    title: "Our 6th Anniversary",
    subtitle: "A little journey made just for you",
    passcodeHint: "Hint: the day we said 'I do'",
    expectedDurationMin: 7,
  },
  storyCards: [
    {
      id: "chapter-1",
      image: placeholder,
      caption: "Every big love story starts with one small hello.",
      noteTitle: "The Beginning",
      noteBody:
        "I still remember that first spark. It felt simple, and still unforgettable.",
    },
    {
      id: "chapter-2",
      image: placeholder,
      caption: "From long talks to longer dreams.",
      noteTitle: "Us Growing",
      noteBody:
        "Somewhere between laughter and late-night conversations, you became my home.",
    },
    {
      id: "chapter-3",
      image: placeholder,
      caption: "We made promises and built a life around them.",
      noteTitle: "Our Wedding Day",
      noteBody:
        "That day was beautiful, but the real gift is everything that came after.",
    },
    {
      id: "chapter-4",
      image: placeholder,
      caption: "Trips, milestones, and tiny ordinary moments.",
      noteTitle: "Our Adventures",
      noteBody:
        "You make every place better, and every day brighter, simply by being there.",
    },
    {
      id: "chapter-5",
      image: placeholder,
      caption: "Even the hard days became softer with you.",
      noteTitle: "Our Strength",
      noteBody:
        "Thank you for believing in us, and for choosing love in all its forms.",
    },
    {
      id: "chapter-6",
      image: placeholder,
      caption: "Six years later, I would still choose you.",
      noteTitle: "Today & Always",
      noteBody:
        "Happy anniversary, my love. This is only chapter six of forever.",
    },
  ],
  timeline: [
    {
      id: "t1",
      dateLabel: "2018",
      title: "First Date",
      description: "Where everything started and nothing felt ordinary after.",
      image: placeholder,
    },
    {
      id: "t2",
      dateLabel: "2019",
      title: "First Big Trip",
      description: "The first of many journeys where we laughed too much.",
      image: placeholder,
    },
    {
      id: "t3",
      dateLabel: "2020",
      title: "The Proposal",
      description: "One question, one yes, and a lifetime of gratitude.",
      image: placeholder,
    },
    {
      id: "t4",
      dateLabel: "2020",
      title: "Our Wedding",
      description: "The day we promised forever.",
      image: placeholder,
    },
    {
      id: "t5",
      dateLabel: "Today",
      title: "Anniversary #6",
      description: "Still in love, still growing, still us.",
      image: placeholder,
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "Where did we click our first selfie together?",
      options: ["At the cafe", "In the car", "At home"],
      correctIndex: 0,
      revealImage: placeholder,
      revealNote: "That smile in that photo still melts me.",
    },
    {
      id: "q2",
      question: "Who said 'I love you' first?",
      options: ["You", "Me", "At the same time"],
      correctIndex: 1,
      revealImage: placeholder,
      revealNote: "Best decision I ever made: saying it, and meaning it forever.",
    },
    {
      id: "q3",
      question: "Which song instantly reminds me of you?",
      options: ["Our wedding song", "Our road trip song", "Both"],
      correctIndex: 2,
      revealImage: placeholder,
      revealNote: "Every love song started sounding like us.",
    },
    {
      id: "q4",
      question: "What is my favorite thing about us?",
      options: ["How we laugh", "How we care", "How we never give up"],
      correctIndex: 2,
      revealImage: placeholder,
      revealNote: "No matter what happens, we stay on the same team.",
    },
    {
      id: "q5",
      question: "What would I choose in every lifetime?",
      options: ["A quiet life", "A new city", "You"],
      correctIndex: 2,
      revealImage: placeholder,
      revealNote: "Always and only you.",
    },
  ],
  surprise: {
    videoUrl: "/uploads/surprise-video.mp4",
    envelopeTitle: "To My Love",
    envelopeMessage:
      "Happy 6th anniversary. Thank you for every hug, every laugh, every small moment, and every dream we built together. You are the best part of my life, and I love you more with every year.",
  },
};
