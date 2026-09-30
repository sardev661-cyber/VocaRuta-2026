import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useJourney } from '../../context/JourneyContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Modal } from '../../components/ui/Modal';
import { Download, Share2, Compass, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function ReportPage() {
  const { state, dispatch } = useJourney();
  const navigate = useNavigate();
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [finalCertainty, setFinalCertainty] = useState(state.finalCertainty || null);

  const topCareers = state.recommendedCareers.slice(0, 3);
  const initialCertainty = state.initialCertainty || 0;

  const handleCertaintyChange = (val) => {
    setFinalCertainty(val);
    dispatch({ type: 'SET_FINAL_CERTAINTY', payload: val });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      
      {/* Header and Print Controls - Hidden when printing */}
      <div className="print:hidden">
        <SectionHeader 
          title="Tu ruta personal" 
          description="Has completado todas las etapas de VocaRuta. Aquí tienes el resumen de tu proceso y los siguientes pasos."
          action={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowShareModal(true)}>
                <Share2 className="w-4 h-4 mr-2" /> Compartir
              </Button>
              <Button onClick={handlePrint}>
                <Download className="w-4 h-4 mr-2" /> Descargar PDF
              </Button>
            </div>
          }
        />
      </div>

      {/* Print-only Header */}
      <div className="hidden print:block text-center mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Reporte Vocacional VocaRuta</h1>
        <p className="text-slate-500 mt-2">Documento generado para Estudiante (Ejemplo)</p>
      </div>

      {/* Top 3 Careers */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 print:text-2xl">Alternativas Recomendadas</h3>
        <div className="space-y-6">
          {topCareers.map((career, idx) => {
            const simId = `sim-${career.id.substring(0,3)}`;
            const hasSim = state.completedSimulations[simId];
            
            return (
              <Card key={career.id} className="p-6 md:p-8 flex flex-col md:flex-row gap-8 border-slate-200 shadow-sm print:shadow-none print:border-slate-300">
                <div className="shrink-0 flex flex-col items-center justify-center md:w-32">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl mb-3 border-4 border-white shadow-sm ring-1 ring-primary-50">
                    #{idx + 1}
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{career.compatibility}%</div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Afinidad</span>
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{career.name}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h5 className="font-semibold text-slate-900 flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-success-500" /> Por qué encaja contigo
                      </h5>
                      <p className="text-sm text-slate-600">
                        Muestra alta coincidencia con tus intereses principales y tus expectativas de estilo de trabajo. Además, el perfil coincide con tus valores declarados.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-900 flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-warning-500" /> Experiencia Práctica
                      </h5>
                      <p className="text-sm text-slate-600">
                        {hasSim 
                          ? "Completaste la simulación práctica con resultados positivos que validaron tu interés." 
                          : "Aún no has realizado la simulación práctica para esta carrera. Recomendamos hacerla."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h5 className="font-semibold text-slate-900 mb-3">Siguientes pasos recomendados:</h5>
                    <ul className="space-y-2">
                      <li className="flex gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                        Conversa con un estudiante o profesional joven de {career.name}.
                      </li>
                      <li className="flex gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                        Revisa la malla curricular de las 3 universidades de tu interés.
                      </li>
                      <li className="flex gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                        Asiste a la próxima feria vocacional para conversar con facultades.
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Certainty Evolution - Hidden in print or reformatted if needed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 print:mt-8">
        <Card className="p-8 bg-slate-900 text-white">
          <h3 className="text-xl font-bold mb-6">Tu evolución</h3>
          <p className="text-slate-300 mb-8">Veamos cómo ha cambiado tu nivel de certeza tras completar VocaRuta.</p>
          
          <div className="flex justify-between items-center mb-10">
            <div className="text-center">
              <div className="text-xs text-slate-400 uppercase tracking-widest mb-2">Antes</div>
              <div className="w-16 h-16 rounded-full border-2 border-slate-600 flex items-center justify-center text-2xl font-bold">
                {initialCertainty}/5
              </div>
            </div>
            
            <div className="flex-grow flex justify-center">
              <ArrowRight className="text-slate-500 w-6 h-6" />
            </div>

            <div className="text-center">
              <div className="text-xs text-primary-400 uppercase tracking-widest mb-2">Ahora</div>
              <div className={clsx(
                "w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-bold",
                finalCertainty ? "border-primary-500 bg-primary-600" : "border-slate-600 border-dashed text-slate-500"
              )}>
                {finalCertainty ? `${finalCertainty}/5` : '?'}
              </div>
            </div>
          </div>

          {!finalCertainty && (
            <div className="print:hidden animate-in slide-in-from-bottom-2">
              <p className="text-sm font-medium text-center mb-4">Indica tu nivel de seguridad actual:</p>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => handleCertaintyChange(num)}
                    className="w-10 h-10 rounded-md bg-slate-800 text-slate-300 hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-8 border-primary-100 bg-primary-50 flex flex-col justify-center print:hidden">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">La decisión es tuya</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            VocaRuta te ha dado datos objetivos, compatibilidad basada en tus respuestas y experiencia real. Tienes mejores argumentos para decidir.
          </p>
          <Button onClick={() => navigate(ROUTES.EXPLORE)} variant="outline" className="w-fit bg-white border-primary-200 text-primary-700 hover:bg-primary-50">
            Seguir explorando carreras
          </Button>
        </Card>
      </div>

      {/* Share Modal */}
      <Modal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)}
        title="Compartir con Padres / Tutores"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Ingresa el correo de tus padres para enviarles un acceso a tu reporte resumido.
          </p>
          <input 
            type="email" 
            placeholder="correo@ejemplo.com"
            className="w-full h-12 rounded-lg border border-slate-300 px-4 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
          <Button className="w-full" onClick={() => setShowShareModal(false)}>
            Enviar Invitación
          </Button>
          <p className="text-xs text-center text-slate-400 mt-4">
            (Esto es un prototipo visual, el correo no se enviará realmente)
          </p>
        </div>
      </Modal>

      {/* Print Footer */}
      <div className="hidden print:block mt-12 text-center text-sm text-slate-400 pt-6 border-t border-slate-200">
        Generado por VocaRuta - Plataforma de Orientación Vocacional | vocaruta.com
      </div>
    </div>
  );
}
