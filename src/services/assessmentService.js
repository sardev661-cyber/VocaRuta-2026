import { questionsData } from '../data/questions';

export const assessmentService = {
  getQuestions: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(questionsData), 300);
    });
  }
};
