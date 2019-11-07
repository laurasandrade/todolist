import { Answer } from './answer';

export interface ReportQuestions {
  description: string;
  answers: Array<Answer>;
  id: string;
  type: string;
  order: string;
}
