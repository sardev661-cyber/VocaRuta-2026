/* oxlint-disable react/only-export-components */
import { createContext, useReducer, useContext, useEffect } from 'react';
import { careersData } from '../data/careers';
import { scoreAnswers } from '../utils/journey';
export const STORAGE_KEY = 'vocaruta-journey-v2';
export const initialState = { profile: null, initialCertainty: null, finalCertainty: null, assessmentAnswers: {}, studentScores: null, completedSimulations: {}, simulationDrafts: {}, compareList: [], explored: [], comparisonReviewed: false, actionPlan: {}, reflection: '', currentStage: 1 };
const JourneyContext = createContext();
export function journeyReducer(state, action) {
  switch(action.type) {
    case 'PROFILE': return {...state, profile: action.payload};
    case 'SET_INITIAL_CERTAINTY': return {...state, initialCertainty: action.payload};
    case 'SET_FINAL_CERTAINTY': return {...state, finalCertainty: action.payload, currentStage: 5};
    case 'DRAFT_ANSWER': return {...state, assessmentAnswers: {...state.assessmentAnswers, ...action.payload}};
    case 'SAVE_ASSESSMENT_ANSWERS': return {...state, assessmentAnswers: action.payload.answers, studentScores: scoreAnswers(action.payload.answers), finalCertainty: null, currentStage: 2};
    case 'EXPLORE': return {...state, explored: [...new Set([...state.explored, action.payload])], currentStage: Math.max(3,state.currentStage)};
    case 'SIM_DRAFT': return {...state, simulationDrafts: {...state.simulationDrafts, [action.payload.id]: action.payload.draft}};
    case 'COMPLETE_SIMULATION': return {...state, completedSimulations: {...state.completedSimulations, [action.payload.simId]: action.payload.feedback}, currentStage: Math.max(4,state.currentStage)};
    case 'TOGGLE_COMPARE': return {...state, comparisonReviewed: false, compareList: state.compareList.includes(action.payload) ? state.compareList.filter(id => id !== action.payload) : state.compareList.length < 3 ? [...state.compareList, action.payload] : state.compareList};
    case 'REVIEW_COMPARISON': return {...state, comparisonReviewed: true, currentStage: 5};
    case 'ACTION': return {...state, actionPlan: {...state.actionPlan, [action.payload]: !state.actionPlan[action.payload]}};
    case 'REFLECTION': return {...state, reflection: action.payload};
    case 'RESET_JOURNEY': return {...initialState};
    default: return state;
  }
}
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || saved.version !== 2 || typeof saved.state !== 'object') return initialState;
    const s = {...initialState, ...saved.state};
    if (!Array.isArray(s.compareList) || !Array.isArray(s.explored) || !s.assessmentAnswers || !s.completedSimulations || !s.simulationDrafts || !s.actionPlan) return initialState;
    s.compareList = [...new Set(s.compareList)].filter(id => careersData.some(c => c.id === id)).slice(0,3);
    s.studentScores = saved.state.studentScores ? scoreAnswers(s.assessmentAnswers) : null;
    return s;
  } catch { return initialState; }
}
export function JourneyProvider({children}) {
  const [state, dispatch] = useReducer(journeyReducer, undefined, restore);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({version:2,state})); }
    catch { console.warn('No se pudo guardar el avance de VocaRuta en este navegador.'); }
  },[state]);
  return <JourneyContext.Provider value={{state,dispatch,storageError:false}}>{children}</JourneyContext.Provider>;
}
export function useJourney() { return useContext(JourneyContext); }
