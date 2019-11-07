import { ReportQuestions } from './reportQuestions';

export interface ComboRespostas {
  group: string;
  questions: Array<ReportQuestions>;
  data: Date;
  unidade: string;
}

export interface ObjetoRaiz {
  items: ReportSession;
  total: string;
}

export interface ReportSession {
  sessions: Array<ComboRespostas>;
  total: string;
}
