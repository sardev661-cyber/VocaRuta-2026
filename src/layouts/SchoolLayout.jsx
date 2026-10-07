import { Outlet, Link } from 'react-router-dom';
import Brand from '../components/Brand';
export default function SchoolLayout(){return <div><header className="site-header"><div className="page-width header-inner"><Brand/><span>Espacio para colegios</span><Link className="btn btn-outline" to="/app">Ver ruta del estudiante</Link></div></header><main className="page-width section-pad"><Outlet/></main></div>;}
