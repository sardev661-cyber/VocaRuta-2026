import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../app/routes';
import { Button } from '../components/ui/Button';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">VocaRuta</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#como-funciona" className="hover:text-slate-900 transition-colors">Cómo funciona</a>
            <a href="#beneficios" className="hover:text-slate-900 transition-colors">Beneficios</a>
            <Link to={ROUTES.PRICING} className="hover:text-slate-900 transition-colors">Planes</Link>
            <Link to={ROUTES.SCHOOL} className="hover:text-slate-900 transition-colors">Para Colegios</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline" className="hidden sm:inline-flex">Iniciar sesión</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button>Empieza gratis</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-slate-800 rounded-md flex items-center justify-center text-white font-bold text-sm">V</div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">VocaRuta</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
              Descubre. Prueba. Decide. La plataforma de orientación vocacional basada en simulaciones prácticas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to={ROUTES.HOME} className="hover:text-primary-600">Inicio</Link></li>
              <li><Link to={ROUTES.PRICING} className="hover:text-primary-600">Planes</Link></li>
              <li><Link to={ROUTES.SCHOOL} className="hover:text-primary-600">Para Colegios</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary-600">Términos de servicio</a></li>
              <li><a href="#" className="hover:text-primary-600">Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-100 text-sm text-slate-400">
          © {new Date().getFullYear()} VocaRuta. Datos referenciales de ejemplo.
        </div>
      </footer>
    </div>
  );
}