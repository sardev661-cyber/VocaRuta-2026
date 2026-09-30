import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useJourney } from '../../context/JourneyContext';
import { careerService } from '../../services/careerService';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Alert } from '../../components/ui/Alert';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Badge } from '../../components/ui/Badge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { PlayCircle, PlusCircle, Check } from 'lucide-react';

const DIMENSION_LABELS = {
  interests: 'Intereses',
  skills: 'Habilidades',
  values: 'Valores',
  workPreferences: 'Estilo de Trabajo',
  expectations: 'Expectativas'
};

export default function ExplorePage() {
  const { state, dispatch } = useJourney();
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.studentScores) {
      navigate(ROUTES.ASSESSMENT);
      return;
    }

    // Always fetch latest recommendations in case scores updated
    careerService.getRecommendedCareers(state.studentScores, 5).then(data => {
      setCareers(data);
      dispatch({ type: 'SET_RECOMMENDED_CAREERS', payload: data });
      setLoading(false);
    });
  }, [state.studentScores, navigate, dispatch]);

  const toggleCompare = (careerId) => {
    dispatch({ type: 'TOGGLE_COMPARE', payload: careerId });
  };

  const handleTestCareer = (careerId) => {
    dispatch({ type: 'SET_STAGE', payload: Math.max(state.currentStage, 3) });
    navigate(`${ROUTES.SIMULATIONS}?career=${careerId}`);
  };

  if (loading || !state.studentScores) return <div className="p-8 text-center text-slate-500">Analizando perfil...</div>;

  // Prepare radar data
  const radarData = Object.keys(DIMENSION_LABELS).map(key => ({
    subject: DIMENSION_LABELS[key],
    A: state.studentScores[key] || 0,
    fullMark: 5,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionHeader 
        title="Tus alternativas recomendadas" 
        description="Estas son las carreras que muestran mayor alineación con tus respuestas."
        action={
          <Button onClick={() => {
            dispatch({ type: 'SET_STAGE', payload: Math.max(state.currentStage, 3) });
            navigate(ROUTES.SIMULATIONS);
          }}>
            Ir a Simulaciones <PlayCircle className="ml-2 w-4 h-4" />
          </Button>
        }
      />

      <Alert variant="warning" className="mb-6">
        <span className="font-semibold">Importante: </span>
        La compatibilidad no es una probabilidad de éxito profesional ni una regla estricta. Es una guía para que sepas qué áreas priorizar en tu exploración.
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {careers.map((career, idx) => {
            const isComparing = state.compareList.includes(career.id);
            const canCompare = state.compareList.length < 3 || isComparing;
            
            return (
              <Card key={career.id} className="p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{career.name}</h3>
                    {idx === 0 && <Badge variant="primary">Mayor compatibilidad</Badge>}
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{career.description}</p>
                  
                  <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 border border-slate-100 italic">
                    "{career.name} aparece entre tus alternativas porque presentas interés alto en las dimensiones requeridas y compartes el perfil de habilidades."
                    <span className="text-xs text-slate-400 block mt-1">(Explicación referencial)</span>
                  </div>
                </div>
                
                <div className="shrink-0 flex flex-col items-center justify-center min-w-[140px] md:border-l md:border-slate-100 md:pl-6">
                  <div className="text-4xl font-bold text-primary-600 mb-1">
                    {career.compatibility}%
                  </div>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Compatibilidad</span>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <Button onClick={() => handleTestCareer(career.id)} className="w-full text-sm h-9">
                      Probar carrera
                    </Button>
                    <Button 
                      variant={isComparing ? "secondary" : "outline"} 
                      className="w-full text-sm h-9"
                      onClick={() => toggleCompare(career.id)}
                      disabled={!canCompare}
                    >
                      {isComparing ? <><Check className="w-4 h-4 mr-1" /> Comparando</> : <><PlusCircle className="w-4 h-4 mr-1" /> Comparar</>}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Tu perfil VocaRuta</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar name="Estudiante" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              Este radar muestra tus puntajes de 1 a 5 en cada dimensión según tus respuestas.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
