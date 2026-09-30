import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      navigate(ROUTES.DASHBOARD);
    }, 800);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-lg border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl text-white font-bold text-2xl mb-4">V</div>
          <h1 className="text-2xl font-bold text-slate-900">Bienvenido de vuelta</h1>
          <p className="text-sm text-slate-500 mt-2">Ingresa a tu cuenta para continuar tu ruta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Correo electrónico" 
            type="email" 
            placeholder="tu@correo.com" 
            required 
          />
          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-slate-600">Recordarme</span>
            </label>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">¿Olvidaste tu contraseña?</a>
          </div>

          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          ¿No tienes una cuenta?{' '}
          <Link to={ROUTES.REGISTER} className="text-primary-600 hover:text-primary-700 font-semibold">
            Regístrate aquí
          </Link>
        </div>
      </Card>
    </div>
  );
}
