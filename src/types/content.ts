export type AppMeta = {
  title: string;
  subtitle: string;
  passcodeHint: string;
  expectedDurationMin: number;
};

export type StoryCard = {
  id: string;
  image: string;
  caption: string;
  noteTitle: string;
  noteBody: string;
};

export type TimelineEvent = {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  image: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  revealImage: string;
  revealNote: string;
};

export type SurpriseContent = {
  videoUrl: string;
  envelopeTitle: string;
  envelopeMessage: string;
};

export type AppContent = {
  meta: AppMeta;
  storyCards: StoryCard[];
  timeline: TimelineEvent[];
  quiz: QuizQuestion[];
  surprise: SurpriseContent;
};
