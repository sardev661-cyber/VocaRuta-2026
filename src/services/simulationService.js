import { simulationsData } from '../data/simulations';

export const simulationService = {
  getSimulations: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(simulationsData), 300);
    });
  },

  getSimulationById: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(simulationsData.find(s => s.id === id) || null);
      }, 300);
    });
  },
  
  getSimulationsByCareerId: async (careerId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(simulationsData.filter(s => s.careerId === careerId));
      }, 300);
    });
  }
};
