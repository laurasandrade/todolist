import { Answer } from './answer';

export interface Question {
    id: string;
    category: string;
    description: string;
    order: number;
    type: string;
    answers: Array<Answer>;
    media: number;
}
