import contentJson from "./content.json";
import { defaultContent } from "./defaultContent";
import type { AppContent, QuizQuestion, StoryCard, TimelineEvent } from "../types/content";

const safeString = (value: unknown, fallback: string): string => {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const safeNumber = (value: unknown, fallback: number): number => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return value;
};

const safeStoryCard = (value: unknown, fallback: StoryCard): StoryCard => {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const entry = value as Partial<StoryCard>;

  return {
    id: safeString(entry.id, fallback.id),
    image: safeString(entry.image, fallback.image),
    caption: safeString(entry.caption, fallback.caption),
    noteTitle: safeString(entry.noteTitle, fallback.noteTitle),
    noteBody: safeString(entry.noteBody, fallback.noteBody),
  };
};

const safeTimelineEvent = (value: unknown, fallback: TimelineEvent): TimelineEvent => {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const entry = value as Partial<TimelineEvent>;

  return {
    id: safeString(entry.id, fallback.id),
    dateLabel: safeString(entry.dateLabel, fallback.dateLabel),
    title: safeString(entry.title, fallback.title),
    description: safeString(entry.description, fallback.description),
    image: safeString(entry.image, fallback.image),
  };
};

const safeQuizQuestion = (value: unknown, fallback: QuizQuestion): QuizQuestion => {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const entry = value as Partial<QuizQuestion>;

  const options = Array.isArray(entry.options)
    ? entry.options.filter((option): option is string => typeof option === "string" && option.trim().length > 0)
    : fallback.options;

  const normalizedOptions = options.length >= 2 ? options : fallback.options;

  const rawCorrectIndex = safeNumber(entry.correctIndex, fallback.correctIndex);
  const correctIndex = rawCorrectIndex >= 0 && rawCorrectIndex < normalizedOptions.length
    ? rawCorrectIndex
    : fallback.correctIndex;

  return {
    id: safeString(entry.id, fallback.id),
    question: safeString(entry.question, fallback.question),
    options: normalizedOptions,
    correctIndex,
    revealImage: safeString(entry.revealImage, fallback.revealImage),
    revealNote: safeString(entry.revealNote, fallback.revealNote),
  };
};

const safeArray = <T>(value: unknown, fallback: T[], mapper: (item: unknown, itemFallback: T) => T): T[] => {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => mapper(item, fallback[index] ?? fallback[0]));
};

export const loadAppContent = (): AppContent => {
  const raw = contentJson as Partial<AppContent>;

  return {
    meta: {
      title: safeString(raw.meta?.title, defaultContent.meta.title),
      subtitle: safeString(raw.meta?.subtitle, defaultContent.meta.subtitle),
      passcodeHint: safeString(raw.meta?.passcodeHint, defaultContent.meta.passcodeHint),
      expectedDurationMin: safeNumber(raw.meta?.expectedDurationMin, defaultContent.meta.expectedDurationMin),
    },
    storyCards: safeArray(raw.storyCards, defaultContent.storyCards, safeStoryCard),
    timeline: safeArray(raw.timeline, defaultContent.timeline, safeTimelineEvent),
    quiz: safeArray(raw.quiz, defaultContent.quiz, safeQuizQuestion),
    surprise: {
      videoUrl: safeString(raw.surprise?.videoUrl, defaultContent.surprise.videoUrl),
      envelopeTitle: safeString(raw.surprise?.envelopeTitle, defaultContent.surprise.envelopeTitle),
      envelopeMessage: safeString(raw.surprise?.envelopeMessage, defaultContent.surprise.envelopeMessage),
    },
  };
};
