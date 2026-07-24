export type Language = 'en' | 'kn';

export type AppStage = 'landing' | 'reveal' | 'awareness';

export interface UserData {
  name: string;
  phone: string;
  email: string;
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionKn: string;
  optionsEn: string[];
  optionsKn: string[];
  correctIndex: number;
  explanationEn: string;
  explanationKn: string;
}

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  titleEn: string;
  titleKn: string;
  descriptionEn: string;
  descriptionKn: string;
  isRedFlag: boolean;
}

export interface UrlCheckItem {
  id: string;
  url: string;
  isSafe: boolean;
  reasonEn: string;
  reasonKn: string;
}

export interface ScenarioChoice {
  textEn: string;
  textKn: string;
  isSafe: boolean;
  feedbackEn: string;
  feedbackKn: string;
}

export interface Scenario {
  id: string;
  titleEn: string;
  titleKn: string;
  situationEn: string;
  situationKn: string;
  choices: ScenarioChoice[];
}

export interface SortItem {
  id: string;
  textEn: string;
  textKn: string;
  isSafe: boolean;
  explanationEn: string;
  explanationKn: string;
}
