import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useJourney } from '../../context/JourneyContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ArrowRight, Compass, Search, FlaskConical, BarChart3, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function DashboardPage() {
  const { state, dispatch } = useJourney();
  const navigate = useNavigate();
  const [certainty, setCertainty] = useState(state.initialCertainty || 0);

  const STAGES_INFO = [
    { id: 1, title: 'Conócete', desc: 'Descubre tus intereses y habilidades', route: ROUTES.ASSESSMENT, icon: <Compass className="w-5 h-5" /> },
    { id: 2, title: 'Explora', desc: 'Revisa tus carreras compatibles', route: ROUTES.EXPLORE, icon: <Search className="w-5 h-5" /> },
    { id: 3, title: 'Prueba', desc: 'Vive simulaciones reales', route: ROUTES.SIMULATIONS, icon: <FlaskConical className="w-5 h-5" /> },
    { id: 4, title: 'Compara', desc: 'Analiza mercado y datos', route: ROUTES.COMPARE, icon: <BarChart3 className="w-5 h-5" /> },
    { id: 5, title: 'Decide', desc: 'Obtén tu reporte final', route: ROUTES.REPORT, icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const handleSetCertainty = (val) => {
    setCertainty(val);
    dispatch({ type: 'SET_INITIAL_CERTAINTY', payload: val });
  };

  const handleContinue = () => {
    const nextRoute = STAGES_INFO[state.currentStage - 1]?.route || ROUTES.REPORT;
    navigate(nextRoute);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionHeader 
        title="Hola, Estudiante" 
        description="Bienvenido a tu ruta de orientación vocacional."
      />

      {state.initialCertainty === null && (
        <Card className="p-6 bg-primary-50 border-primary-100">
          <h3 className="font-semibold text-primary-900 mb-2">Antes de empezar...</h3>
          <p className="text-primary-700 text-sm mb-4">¿Qué tan seguro estás de tu elección de carrera hoy? (1 = Nada seguro, 5 = Muy seguro)</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => handleSetCertainty(num)}
                className={clsx(
                  "w-12 h-12 rounded-lg font-medium text-lg transition-colors border",
                  certainty === num 
                    ? "bg-primary-600 text-white border-primary-600" 
                    : "bg-white text-slate-600 border-slate-300 hover:border-primary-400"
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {STAGES_INFO.map((stage) => {
          const isCompleted = state.currentStage > stage.id;
          const isCurrent = state.currentStage === stage.id;
          const isLocked = state.currentStage < stage.id;

          return (
            <Card 
              key={stage.id} 
              className={clsx(
                "p-5 relative overflow-hidden transition-all",
                isCurrent && "ring-2 ring-primary-500 border-transparent shadow-md",
                isLocked && "opacity-60 bg-slate-50",
                isCompleted && "bg-white border-primary-100"
              )}
            >
              <div className={clsx(
                "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
                isCompleted ? "bg-primary-100 text-primary-600" :
                isCurrent ? "bg-primary-600 text-white" :
                "bg-slate-200 text-slate-400"
              )}
              >
                {stage.icon}
              </div>
              <h4 className={clsx("font-semibold mb-1", isLocked ? "text-slate-500" : "text-slate-900")}>
                {stage.id}. {stage.title}
              </h4>
              <p className="text-xs text-slate-500">{stage.desc}</p>
              
              {isCompleted && (
                <div className="absolute top-4 right-4 w-5 h-5 bg-success-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle className="w-3 h-3" />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleContinue} 
          disabled={state.initialCertainty === null}
          className="h-12 px-6"
        >
          {state.currentStage === 1 ? 'Empezar mi ruta' : 'Continuar mi ruta'}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
