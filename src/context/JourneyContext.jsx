import { createContext, useReducer, useContext } from 'react';

const initialState = {
  currentStage: 1, // 1 to 5
  initialCertainty: null, // 1 to 5
  finalCertainty: null, // 1 to 5
  assessmentAnswers: {}, // { q1: 4, q2: 5, ... }
  studentScores: null, // Calculated scores: { interests: 4.3, skills: 3.5, ... }
  recommendedCareers: [], // Stored array of recommended careers from stage 2
  completedSimulations: {}, // { 'sim-eco': { liked: true, feedback: ... } }
  compareList: [] // Array of career IDs to compare (max 3)
};

const JourneyContext = createContext();

function journeyReducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_CERTAINTY':
      return { ...state, initialCertainty: action.payload };
    
    case 'SET_FINAL_CERTAINTY':
      return { ...state, finalCertainty: action.payload };
    
    case 'SAVE_ASSESSMENT_ANSWERS':
      return { 
        ...state, 
        assessmentAnswers: action.payload.answers,
        studentScores: action.payload.scores,
        currentStage: Math.max(state.currentStage, 2)
      };
      
    case 'SET_RECOMMENDED_CAREERS':
      return { ...state, recommendedCareers: action.payload };

    case 'COMPLETE_SIMULATION':
      return { 
        ...state, 
        completedSimulations: {
          ...state.completedSimulations,
          [action.payload.simId]: action.payload.feedback
        },
        currentStage: Math.max(state.currentStage, 4) // Advance to stage 4 (Compara) after simulation
      };
      
    case 'UPDATE_RECOMMENDED_CAREERS':
      // Allows updating compatibility scores based on sim feedback
      return { ...state, recommendedCareers: action.payload };

    case 'TOGGLE_COMPARE': {
      const careerId = action.payload;
      const exists = state.compareList.includes(careerId);
      
      if (exists) {
        return { ...state, compareList: state.compareList.filter(id => id !== careerId) };
      } else {
        if (state.compareList.length >= 3) return state; // Max 3
        return { ...state, compareList: [...state.compareList, careerId] };
      }
    }
    
    case 'SET_STAGE':
      return { ...state, currentStage: action.payload };

    case 'RESET_JOURNEY':
      return initialState;

    default:
      return state;
  }
}

export function JourneyProvider({ children }) {
  const [state, dispatch] = useReducer(journeyReducer, initialState);

  return (
    <JourneyContext.Provider value={{ state, dispatch }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}
