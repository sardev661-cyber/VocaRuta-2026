import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useJourney } from '../../context/JourneyContext';
import { simulationService } from '../../services/simulationService';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';
import { clsx } from 'clsx';
import { ArrowLeft, CheckCircle2, TrendingUp } from 'lucide-react';

export default function SimulationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useJourney();
  
  const [simulation, setSimulation] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Feedback state
  const [isFeedbackPhase, setIsFeedbackPhase] = useState(false);
  const [feedbackAnswers, setFeedbackAnswers] = useState({});
  const [completedResult, setCompletedResult] = useState(null);

  useEffect(() => {
    simulationService.getSimulationById(id).then(data => {
      if (!data) navigate(ROUTES.SIMULATIONS);
      setSimulation(data);
    });
  }, [id, navigate]);

  if (!simulation) return <div className="p-8 text-center">Cargando...</div>;

  const steps = simulation.steps || [];
  const currentStep = steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOption(null); // Reset for next decision
    } else {
      setIsFeedbackPhase(true);
    }
  };

  const handleFeedbackSubmit = () => {
    // Calculate a mock score increase based on feedback
    let score = 0;
    Object.values(feedbackAnswers).forEach(val => { score += val; });
    const boost = Math.round((score / 20) * 10); // max 10% boost

    const career = state.recommendedCareers.find(c => c.id === simulation.careerId);
    const oldCompat = career ? career.compatibility : 75;
    const newCompat = Math.min(99, oldCompat + boost);

    // Update global state
    dispatch({
      type: 'COMPLETE_SIMULATION',
      payload: { simId: simulation.id, feedback: feedbackAnswers }
    });

    if (career) {
      const updatedCareers = state.recommendedCareers.map(c => 
        c.id === career.id ? { ...c, compatibility: newCompat } : c
      );
      dispatch({ type: 'UPDATE_RECOMMENDED_CAREERS', payload: updatedCareers });
    }

    setCompletedResult({ oldCompat, newCompat });
  };

  // --- RENDERS ---

  if (completedResult) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Simulación Completada</h2>
        <p className="text-slate-600 mb-8">
          Esta ha sido una primera aproximación práctica. Has sumado experiencia que mejora la precisión de tus resultados.
        </p>

        <Card className="p-6 bg-primary-50 border-primary-100 mb-8 max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2 text-primary-800 font-medium">
            <TrendingUp className="w-5 h-5" /> Nueva Compatibilidad
          </div>
          <div className="flex items-center justify-center gap-4 text-3xl font-bold">
            <span className="text-slate-400 line-through">{completedResult.oldCompat}%</span>
            <span className="text-primary-600">{completedResult.newCompat}%</span>
          </div>
        </Card>

        <Button onClick={() => navigate(ROUTES.SIMULATIONS)} className="h-12 px-8">
          Volver a Simulaciones
        </Button>
      </div>
    );
  }

  if (isFeedbackPhase) {
    const questions = [
      { id: 'enjoy', text: '¿Disfrutaste resolver esta actividad?' },
      { id: 'learn', text: '¿Te gustaría aprender más sobre los conceptos vistos?' },
      { id: 'interest', text: '¿Te resultó interesante este tipo de problema?' },
      { id: 'future', text: '¿Te ves haciendo actividades como esta en tu futuro?' }
    ];

    return (
      <div className="max-w-2xl mx-auto py-8 animate-in fade-in">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">¿Qué te pareció?</h2>
          <p className="text-slate-500 mt-2">Tu retroalimentación recalculará la compatibilidad con esta carrera.</p>
        </div>

        <Card className="p-8 space-y-8">
          {questions.map(q => (
            <div key={q.id}>
              <p className="font-medium text-slate-900 mb-4">{q.text}</p>
              <div className="flex justify-between max-w-sm mx-auto">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => setFeedbackAnswers({ ...feedbackAnswers, [q.id]: num })}
                    className={clsx(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-full font-medium border-2 transition-all",
                      feedbackAnswers[q.id] === num
                        ? "bg-primary-600 border-primary-600 text-white shadow-md scale-110"
                        : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Card>

        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleFeedbackSubmit}
            disabled={Object.keys(feedbackAnswers).length < 4}
            className="h-12 px-8"
          >
            Finalizar y Guardar
          </Button>
        </div>
      </div>
    );
  }

  // Normal simulation step rendering
  return (
    <div className="max-w-3xl mx-auto py-4">
      <button 
        onClick={() => navigate(ROUTES.SIMULATIONS)}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Salir de la simulación
      </button>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{simulation.title}</h2>
        <ProgressBar value={currentStepIndex} max={steps.length} className="h-2" />
      </div>

      <Card className="p-6 md:p-10 min-h-[400px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="mb-8">
          {currentStep.type === 'intro' && <Badge variant="primary" className="mb-4">Contexto</Badge>}
          {currentStep.type === 'data' && <Badge variant="warning" className="mb-4">Datos</Badge>}
          {currentStep.type === 'decision' && <Badge variant="success" className="mb-4">Decisión</Badge>}
          {currentStep.type === 'feedback' && <Badge variant="default" className="mb-4">Retroalimentación del Experto</Badge>}
          
          <p className="text-lg text-slate-800 leading-relaxed font-medium">
            {currentStep.content}
          </p>
        </div>

        {currentStep.type === 'decision' && currentStep.options && (
          <div className="space-y-3 mt-4 mb-8">
            {currentStep.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={clsx(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  selectedOption === opt.id 
                    ? "border-primary-500 bg-primary-50 shadow-sm" 
                    : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
                )}
              >
                <div className="flex gap-3">
                  <div className={clsx(
                    "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5",
                    selectedOption === opt.id ? "border-primary-600" : "border-slate-300"
                  )}>
                    {selectedOption === opt.id && <div className="w-3 h-3 bg-primary-600 rounded-full" />}
                  </div>
                  <span className={selectedOption === opt.id ? "text-primary-900 font-medium" : "text-slate-700"}>
                    {opt.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentStep.type === 'decision' && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Justifica tu decisión (Opcional pero recomendado)</label>
            <textarea 
              className="w-full h-24 rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Basado en los datos presentados, considero que..."
            ></textarea>
          </div>
        )}

        <div className="mt-auto flex justify-end">
          <Button 
            onClick={handleNextStep}
            disabled={currentStep.type === 'decision' && !selectedOption}
            className="h-12 px-8"
          >
            {currentStepIndex === steps.length - 1 ? 'Terminar caso' : 'Continuar'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
