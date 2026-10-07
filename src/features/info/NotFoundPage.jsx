import { Link } from 'react-router-dom';
export default function NotFoundPage(){return <section className="page-width section-pad"><div className="panel empty-state"><span className="eyebrow">RUTA NO ENCONTRADA</span><h1>Este camino no existe.</h1><p>Vuelve al inicio y continúa explorando desde allí.</p><Link className="btn" to="/">Ir al inicio</Link></div></section>;}
