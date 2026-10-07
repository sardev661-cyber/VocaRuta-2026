import { Outlet, Link } from 'react-router-dom';
import Brand from '../components/Brand';
import { ArrowUpRight } from 'lucide-react';
export default function PublicLayout() {
  return <div className="public-shell"><a className="skip-link" href="#contenido">Saltar al contenido</a><header className="site-header"><div className="page-width header-inner"><Brand/><nav aria-label="Navegación principal"><Link to="/#como-funciona">Cómo funciona</Link><Link to="/familias">Para familias</Link><Link to="/colegio">Colegios</Link></nav><Link className="btn btn-small" to="/app">Mi ruta <ArrowUpRight size={16}/></Link></div></header><main id="contenido"><Outlet/></main><footer className="site-footer page-width"><div><Brand/><p>Descubre. Prueba. Decide.</p></div><p>Una primera experiencia para elegir con más información.<br/><span>Hecho para explorar. La decisión siempre es tuya.</span></p><Link to="/acerca">Sobre el MVP y privacidad <ArrowUpRight size={15}/></Link></footer></div>;
}
