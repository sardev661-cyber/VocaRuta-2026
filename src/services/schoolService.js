import { schoolData } from '../data/school';

export const schoolService = {
  getSchoolDashboardData: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(schoolData), 400);
    });
  }
};
