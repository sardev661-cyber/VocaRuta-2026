import { careersData } from '../data/careers';
import { calculateCompatibility } from '../utils/compatibility';

export const careerService = {
  getAllCareers: async () => {
    // Simulate network delay
    return new Promise(resolve => setTimeout(() => resolve(careersData), 300));
  },
  
  getCareerById: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const career = careersData.find(c => c.id === id);
        resolve(career || null);
      }, 300);
    });
  },

  getRecommendedCareers: async (studentScores, limit = 5) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const withCompatibility = careersData.map(career => ({
          ...career,
          compatibility: calculateCompatibility(studentScores, career.profile)
        }));
        
        // Sort by compatibility descending
        withCompatibility.sort((a, b) => b.compatibility - a.compatibility);
        
        resolve(withCompatibility.slice(0, limit));
      }, 500);
    });
  }
};
