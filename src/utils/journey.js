import { careersData } from '../data/careers';
import { questionsData } from '../data/questions';
import { simulationsData } from '../data/simulations';
export const dimensions = { interests: 'Análisis', skills: 'Organización', values: 'Impacto social', workPreferences: 'Comunicación', expectations: 'Creatividad' };
export function scoreAnswers(answers) {
  if (!questionsData.every(q => Number.isInteger(answers[q.id]) && answers[q.id] >= 1 && answers[q.id] <= 5)) return null;
  return Object.fromEntries(Object.keys(dimensions).map(d => {
    const qs = questionsData.filter(q => q.dimension === d);
    return [d, Math.round(qs.reduce((n,q) => n + answers[q.id], 0) / qs.length * 10) / 10];
  }));
}
export function recommendations(state) {
  if (!state.studentScores) return [];
  return careersData.map(c => {
    const weight = Object.values(c.profile).reduce((a,b) => a+b, 0);
    const base = Math.round(Object.entries(c.profile).reduce((n,[key,w]) => n + ((state.studentScores[key]-1)/4)*w, 0) / weight * 100);
    const sim = simulationsData.find(s => s.careerId === c.id);
    const evidence = sim && state.completedSimulations[sim.id];
    const ratings = evidence?.ratings;
    const experience = ratings ? Math.round((Object.values(ratings).reduce((a,b) => a+b,0)/4-1)/4*100) : null;
    const compatibility = experience === null ? base : Math.round(base*.75 + experience*.25);
    const strongest = Object.keys(dimensions).sort((a,b) => state.studentScores[b]*c.profile[b]-state.studentScores[a]*c.profile[a]).slice(0,2);
    return { ...c, base, compatibility, evidence, sim, experience, reason: 'Tus respuestas sobre '+strongest.map(k => dimensions[k].toLowerCase()).join(' y ')+' aportan más a esta afinidad.' };
  }).sort((a,b) => b.compatibility-a.compatibility || a.name.localeCompare(b.name));
}
export function routeProgress(state) {
  return [Boolean(state.studentScores), state.explored.length > 0, Object.keys(state.completedSimulations).length > 0, state.comparisonReviewed, Boolean(state.finalCertainty)].filter(Boolean).length;
}
export function downloadText(filename, text, type='text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text], {type}));
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

