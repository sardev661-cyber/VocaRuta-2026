import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useJourney } from '../../context/JourneyContext';
import { simulationService } from '../../services/simulationService';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Badge } from '../../components/ui/Badge';
import { Play, Clock, BarChart, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SimulationsPage() {
  const { state } = useJourney();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedCareer = searchParams.get('career');
  
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    simulationService.getSimulations().then(data => {
      // If a career is pre-selected, we could sort to put it first, but for now just load all
      setSimulations(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Cargando simulaciones...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionHeader 
        title="Prueba la Carrera" 
        description="Vive simulaciones reales de los problemas que enfrentan los profesionales en su día a día. Una experiencia vale más que mil descripciones."
        action={
          Object.keys(state.completedSimulations).length > 0 && (
            <Button onClick={() => navigate(ROUTES.COMPARE)}>
              Continuar a Compara <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {simulations.map((sim) => {
          const isCompleted = state.completedSimulations[sim.id];
          const isAvailable = sim.status === 'available';
          const isHighlighted = preSelectedCareer === sim.careerId;

          return (
            <Card 
              key={sim.id} 
              className={`p-6 flex flex-col h-full ${isHighlighted ? 'ring-2 ring-primary-500 border-transparent shadow-md' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <Badge variant={isAvailable ? (isCompleted ? 'success' : 'primary') : 'default'}>
                    {isCompleted ? 'Completada' : isAvailable ? 'Disponible' : 'Próximamente'}
                  </Badge>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{sim.title}</h3>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    {sim.careerId}
                  </p>
                </div>
                {isCompleted && (
                  <div className="text-success-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 mb-6 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {sim.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart className="w-4 h-4 text-slate-400" />
                  Dificultad {sim.difficulty}
                </div>
              </div>

              <div className="mt-auto">
                <Button 
                  onClick={() => navigate(ROUTES.SIMULATION_DETAIL.replace(':id', sim.id))}
                  disabled={!isAvailable}
                  className="w-full"
                  variant={isCompleted ? 'outline' : 'primary'}
                >
                  {isCompleted ? 'Volver a intentar' : isAvailable ? 'Iniciar Simulación' : 'No disponible aún'}
                  {isAvailable && !isCompleted && <Play className="ml-2 w-4 h-4" />}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
