import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      if (profile === 'school') {
        navigate(ROUTES.SCHOOL);
      } else {
        navigate(ROUTES.DASHBOARD);
      }
    }, 800);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-lg border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl text-white font-bold text-2xl mb-4">V</div>
          <h1 className="text-2xl font-bold text-slate-900">Crea tu cuenta</h1>
          <p className="text-sm text-slate-500 mt-2">Empieza a descubrir tu vocación hoy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg mb-4">
            <button
              type="button"
              onClick={() => setProfile('student')}
              className={`py-1.5 text-sm font-medium rounded-md transition-colors ${profile === 'student' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Estudiante
            </button>
            <button
              type="button"
              onClick={() => setProfile('parent')}
              className={`py-1.5 text-sm font-medium rounded-md transition-colors ${profile === 'parent' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Padre/Tutor
            </button>
            <button
              type="button"
              onClick={() => setProfile('school')}
              className={`py-1.5 text-sm font-medium rounded-md transition-colors ${profile === 'school' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Colegio
            </button>
          </div>

          <Input 
            label="Nombre completo" 
            placeholder="Ej. Juan Pérez" 
            required 
          />
          <Input 
            label="Correo electrónico" 
            type="email" 
            placeholder="tu@correo.com" 
            required 
          />
          
          {profile === 'student' && (
            <>
              <Select label="Grado actual" required>
                <option value="">Selecciona tu grado</option>
                <option value="4">4° de Secundaria</option>
                <option value="5">5° de Secundaria</option>
                <option value="other">Otro</option>
              </Select>
              <Input 
                label="Colegio (Opcional)" 
                placeholder="Nombre de tu colegio" 
              />
            </>
          )}

          {profile === 'school' && (
            <Input 
              label="Nombre de la Institución" 
              placeholder="Colegio / Academia" 
              required
            />
          )}

          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="••••••••" 
            required 
          />

          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-700 font-semibold">
            Inicia sesión
          </Link>
        </div>
      </Card>
    </div>
  );
}
