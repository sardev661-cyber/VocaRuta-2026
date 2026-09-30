import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useJourney } from '../../context/JourneyContext';
import { assessmentService } from '../../services/assessmentService';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { clsx } from 'clsx';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AssessmentPage() {
  const { state, dispatch } = useJourney();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(state.assessmentAnswers || {});
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    assessmentService.getQuestions().then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  const currentQ = questions[currentIndex];

  const handleSelect = (val) => {
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);
    
    // Auto advance after small delay for better UX
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const handleFinish = () => {
    // Calculate dimension scores (average per dimension)
    const scores = {};
    const counts = {};
    
    questions.forEach(q => {
      const val = answers[q.id] || 3;
      scores[q.dimension] = (scores[q.dimension] || 0) + val;
      counts[q.dimension] = (counts[q.dimension] || 0) + 1;
    });
    
    // Average
    Object.keys(scores).forEach(dim => {
      scores[dim] = Math.round((scores[dim] / counts[dim]) * 10) / 10;
    });

    dispatch({ 
      type: 'SAVE_ASSESSMENT_ANSWERS', 
      payload: { answers, scores } 
    });
    
    setCompleted(true);
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Cargando preguntas...</div>;

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-success-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Cuestionario completado</h2>
        <p className="text-slate-600 mb-8 text-center max-w-md">
          Hemos analizado tu perfil. Ya estamos listos para mostrarte las alternativas que mejor se alinean contigo.
        </p>
        <Button onClick={() => navigate(ROUTES.EXPLORE)} className="h-12 px-8">
          Ver mis resultados <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Pregunta {currentIndex + 1} de {questions.length}</span>
          <span>{Math.round(((currentIndex) / questions.length) * 100)}%</span>
        </div>
        <ProgressBar value={currentIndex} max={questions.length} className="h-2.5" />
      </div>

      <Card className="p-8 md:p-12 min-h-[320px] flex flex-col justify-center text-center">
        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-10 leading-relaxed">
          {currentQ.text}
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-lg mx-auto">
          <span className="hidden sm:block text-xs font-medium text-slate-400 w-24 text-right">Nada</span>
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-center">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => handleSelect(num)}
                className={clsx(
                  "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-primary-200 border-2",
                  answers[currentQ.id] === num
                    ? "bg-primary-600 text-white border-primary-600 scale-110 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary-400 hover:bg-slate-50"
                )}
              >
                {num}
              </button>
            ))}
          </div>
          <span className="hidden sm:block text-xs font-medium text-slate-400 w-24 text-left">Mucho</span>
        </div>
        <div className="flex justify-between w-full mt-4 sm:hidden px-2 text-xs font-medium text-slate-400">
          <span>Nada</span>
          <span>Mucho</span>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => setCurrentIndex(prev => prev - 1)}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Anterior
        </Button>
        
        {currentIndex === questions.length - 1 ? (
          <Button 
            onClick={handleFinish}
            disabled={!answers[currentQ.id]}
          >
            Finalizar <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Button 
            onClick={() => setCurrentIndex(prev => prev + 1)}
            disabled={!answers[currentQ.id]}
          >
            Siguiente <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
