import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../app/routes';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

export default function SchoolLayout() {
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: ROUTES.SCHOOL },
    { icon: <Users className="w-5 h-5" />, label: 'Alumnos', path: '#' },
    { icon: <FileText className="w-5 h-5" />, label: 'Reportes', path: '#' },
    { icon: <Settings className="w-5 h-5" />, label: 'Configuración', path: '#' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-6">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">VocaRuta B2B</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 mt-4 space-y-1">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className={clsx("shrink-0", isActive ? "text-primary-600" : "text-slate-400")}>
                  {item.icon}
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link to={ROUTES.HOME} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5 text-slate-400" />
            Cerrar sesión
          </Link>
        </div>
      </aside>

      <main className="flex-grow p-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}