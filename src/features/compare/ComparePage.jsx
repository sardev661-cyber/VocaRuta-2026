import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, FlaskConical, Plus, X } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { careersData } from '../../data/careers';
import { recommendations } from '../../utils/journey';

export default function ComparePage() {
  const { state, dispatch } = useJourney();
  const navigate = useNavigate();
  const all = state.studentScores ? recommendations(state) : careersData;
  const careers = state.compareList.map(id => all.find(c => c.id === id)).filter(Boolean);

  function continueJourney() {
    dispatch({ type: 'REVIEW_COMPARISON' });
    navigate('/app/decide');
  }

  if (!careers.length) return <div className="stack"><div className="page-title"><div><span className="eyebrow">04 / COMPARA</span><h1>Pon tus opciones sobre la mesa.</h1><p>Elige hasta tres carreras para ver sus diferencias con calma.</p></div></div><section className="panel empty-state"><Plus size={34}/><h2>Tu comparador está vacío.</h2><p>Explora el catálogo y marca las alternativas que quieres revisar lado a lado.</p><Link className="btn" to="/app/explora">Elegir alternativas <ArrowRight size={17}/></Link></section></div>;

  const rows = [
    ['Qué harías', c => c.tasks],
    ['Qué estudiarías', c => c.mainCourses.join(' · ')],
    ['Dónde podrías trabajar', c => c.work],
    ['Duración aproximada', c => c.duration],
    ['Experiencia VocaRuta', c => c.sim ? state.completedSimulations[c.sim.id] ? 'Completada' : 'Disponible para probar' : 'Aún no disponible en el MVP'],
  ];

  return <div className="stack"><div className="page-title"><div><span className="eyebrow">04 / COMPARA</span><h1>Distintas rutas, distintas preguntas.</h1><p>Compara actividades y formación. No existe una carrera perfecta en abstracto.</p></div><span className="badge">{careers.length} de 3 alternativas</span></div><div className="notice">Este MVP no muestra montos ni salarios. Para una decisión real, consulta planes de estudio, condiciones y fuentes oficiales actualizadas.</div><div className="compare-scroll"><table className="compare-table"><thead><tr><th>Aspecto</th>{careers.map(c => <th key={c.id}><button className="icon-button compare-remove" aria-label={'Quitar '+c.name} onClick={() => dispatch({type:'TOGGLE_COMPARE',payload:c.id})}><X size={16}/></button><span className="eyebrow">{c.area}</span><h2>{c.name}</h2>{c.compatibility !== undefined && <div className="affinity large">{c.compatibility}% <small>afinidad orientativa</small></div>}</th>)}</tr></thead><tbody>{rows.map(([label, value]) => <tr key={label}><th>{label}</th>{careers.map(c => <td key={c.id}>{label==='Experiencia VocaRuta' && c.sim ? <><span className={state.completedSimulations[c.sim.id]?'status done':'status'}>{state.completedSimulations[c.sim.id]?<Check size={14}/>:<FlaskConical size={14}/>} {value(c)}</span><Link className="text-link small" to={'/app/prueba/'+c.sim.id}> {state.completedSimulations[c.sim.id]?'Revisar':'Probar'} →</Link></> : value(c)}</td>)}</tr>)}</tbody></table></div>{careers.length<3&&<Link className="text-link" to="/app/explora"><Plus size={16}/> Agregar otra alternativa</Link>}<section className="next-banner"><div><h3>¿Qué quieres validar después?</h3><p>El reporte convertirá esta comparación en acciones concretas para seguir investigando.</p></div><button className="btn" onClick={continueJourney}>Construir mi ruta <ArrowRight size={17}/></button></section></div>;
}
