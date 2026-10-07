import { Link } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';
export default function LoginPage(){const {state}=useJourney();return <section className="page-width section-pad"><div className="panel narrow"><span className="eyebrow">BIENVENIDO DE NUEVO</span><h1>Retoma tu ruta.</h1><p>{state.profile ? 'Tu avance está guardado en este navegador.':'Este MVP funciona sin cuentas. Crea un perfil local para empezar.'}</p><Link className="btn" to={state.profile?'/app':'/registro'}>{state.profile?'Continuar mi ruta':'Crear mi perfil'}</Link></div></section>;}
