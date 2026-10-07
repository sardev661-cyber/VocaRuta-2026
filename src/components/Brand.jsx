import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Brand({to='/'}) { return <Link to={to} className="brand" aria-label="VocaRuta, inicio"><span className="brand-icon"><Compass size={24}/></span><span>Voca<span className="brand-accent">Ruta</span></span></Link>; }

