import { Question } from './question';

export interface Poll {
  description: string;
  priority: number;
  banner: string;
  startDate: string;
  endDate: string;
  active: boolean;
  name: string;
  id: string;
  branch: string;
  customer: string;
  questions: Array<Question>;
}
