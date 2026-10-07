import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Download, Printer, Route, Sparkles } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { recommendations, downloadText } from '../../utils/journey';

const actions = [
  'Revisar el plan de estudios de dos instituciones por alternativa.',
  'Conversar con un estudiante o profesional y preparar cinco preguntas.',
  'Buscar una experiencia adicional: taller, curso abierto, voluntariado o feria.',
  'Compartir esta ruta con una persona de confianza u orientador.'
];

export default function ReportPage() {
  const { state, dispatch } = useJourney();
  const careers = useMemo(() => recommendations(state).slice(0,3), [state]);
  const complete = Boolean(state.studentScores && careers.length);
  const reportText = useMemo(() => {
    const lines = ['VOCARUTA - MI RUTA PERSONAL', '', `Nombre: ${state.profile?.name || 'Explorador'}`, `Etapa: ${state.profile?.grade || 'No indicada'}`, '', 'ALTERNATIVAS PARA SEGUIR EXPLORANDO'];
    careers.forEach((c,i) => lines.push(`${i+1}. ${c.name} - ${c.compatibility}% de afinidad orientativa`, c.reason, `Actividad habitual: ${c.tasks}`, c.evidence ? `Experiencia: completada (${c.experience}% de interés declarado)` : 'Experiencia: pendiente', ''));
    lines.push('PRÓXIMOS PASOS'); actions.forEach((a,i) => lines.push(`${state.actionPlan[i]?'[x]':'[ ]'} ${a}`));
    if (state.reflection) lines.push('', 'MI REFLEXIÓN', state.reflection);
    lines.push('', 'Este reporte es una guía exploratoria del MVP. No es un diagnóstico psicológico ni una predicción de éxito. Contrasta la información con fuentes oficiales y orientación humana.');
    return lines.join('\n');
  }, [careers,state]);

  if (!complete) return <div className="stack"><div className="page-title"><div><span className="eyebrow">05 / DECIDE</span><h1>Primero construyamos evidencia.</h1><p>Completa Conócete para generar una ruta basada en tus respuestas.</p></div></div><section className="panel empty-state"><Route size={36}/><h2>Tu ruta personal aún está en blanco.</h2><Link className="btn" to="/app/conocete">Empezar Conócete <ArrowRight size={17}/></Link></section></div>;

  return <div className="stack report-page"><div className="page-title print-hide"><div><span className="eyebrow">05 / DECIDE</span><h1>Tu ruta personal.</h1><p>No es una sentencia final. Es un mapa para seguir haciendo mejores preguntas.</p></div><div className="hero-actions"><button className="btn btn-outline" onClick={() => downloadText('mi-ruta-vocaruta.txt', reportText)}><Download size={16}/> Descargar resumen</button><button className="btn" onClick={() => window.print()}><Printer size={16}/> Guardar como PDF</button></div></div><section className="report-sheet"><header className="report-header"><div><span className="eyebrow">VOCARUTA · REPORTE EXPLORATORIO</span><h1>{state.profile?.name ? 'La ruta de '+state.profile.name : 'Mi ruta personal'}</h1><p>{state.profile?.grade || 'Exploración vocacional'} · Descubre. Prueba. Decide.</p></div><div className="report-mark"><Route size={32}/><span>La decisión<br/>sigue siendo tuya.</span></div></header><section><div className="section-heading compact"><div><span className="eyebrow">ALTERNATIVAS PARA VALIDAR</span><h2>Tres caminos para seguir explorando.</h2></div><p>La afinidad combina tu cuestionario y, cuando existe, tu propia reflexión después de una experiencia.</p></div><div className="report-careers">{careers.map((c,i) => <article key={c.id}><span className="report-rank">0{i+1}</span><div><span className="eyebrow">{c.area}</span><h3>{c.name}</h3><p>{c.reason}</p><p><b>Actividad:</b> {c.tasks}</p>{c.evidence ? <span className="status done"><Check size={14}/> Experiencia realizada · {c.experience}% de interés declarado</span> : <span className="status">Experiencia aún no realizada</span>}</div><div className="score-ring" style={{'--score':c.compatibility}}><strong>{c.compatibility}%</strong><small>afinidad</small></div></article>)}</div></section><section className="report-grid"><div><span className="eyebrow">TU EVOLUCIÓN</span><h2>¿Cómo cambió tu claridad?</h2><div className="certainty-change"><span><small>ANTES</small><b>{state.initialCertainty || '—'}/5</b></span><ArrowRight/><span><small>AHORA</small><b>{state.finalCertainty || '?'}/5</b></span></div>{!state.finalCertainty&&<><p className="print-hide">¿Qué tan clara sientes tu elección ahora?</p><div className="rating-row print-hide">{[1,2,3,4,5].map(n=><button key={n} onClick={() => dispatch({type:'SET_FINAL_CERTAINTY',payload:n})}>{n}</button>)}</div></>}</div><div><span className="eyebrow">MI REFLEXIÓN</span><h2>Lo que quiero recordar.</h2><textarea className="print-hide" maxLength={1200} value={state.reflection} onChange={e=>dispatch({type:'REFLECTION',payload:e.target.value})} placeholder="Escribe qué descubriste, qué dudas siguen abiertas y qué quieres investigar..."/><p className="reflection-print">{state.reflection || 'Aún no has escrito una reflexión.'}</p></div></section><section className="action-plan"><span className="eyebrow">PRÓXIMOS PASOS</span><h2>Una decisión informada se construye.</h2>{actions.map((a,i)=><label key={a}><input type="checkbox" checked={Boolean(state.actionPlan[i])} onChange={()=>dispatch({type:'ACTION',payload:i})}/><span>{a}</span></label>)}</section><footer className="report-disclaimer"><Sparkles size={20}/><p><b>Lo que este reporte sí es:</b> una guía para priorizar preguntas y experiencias. <b>Lo que no es:</b> un diagnóstico psicológico, una promesa laboral ni una orden para elegir. La metodología de este MVP requiere validación profesional.</p></footer></section><div className="report-actions print-hide"><Link className="text-link" to="/app/explora">Seguir explorando alternativas</Link><Link className="btn" to="/app">Volver a mi ruta <ArrowRight size={16}/></Link></div></div>;
}
