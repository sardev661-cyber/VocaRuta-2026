import { useState } from 'react';
import { plansData } from '../../data/plans';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Container } from '../../components/ui/Container';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { CheckCircle2, Lock } from 'lucide-react';
import { clsx } from 'clsx';

export default function PricingPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="py-20 animate-in fade-in">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Invierte en la mejor decisión de tu vida</h1>
          <p className="text-lg text-slate-600">
            Descubre qué carrera estudiar reduciendo el margen de error. Elige el plan que mejor se adapte a tus necesidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plansData.map(plan => (
            <Card 
              key={plan.id}
              className={clsx(
                "p-8 flex flex-col relative overflow-hidden transition-all duration-300",
                plan.isPopular ? "border-primary-500 shadow-lg scale-100 md:scale-105" : "border-slate-200"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-primary-500" />
              )}
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                  {plan.tag && <Badge variant="warning">{plan.tag}</Badge>}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  {plan.price !== 'S/ 0' && <span className="text-slate-500">/ pago único</span>}
                </div>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={plan.isPopular ? "primary" : "outline"}
                className="w-full h-12 text-lg"
                onClick={() => plan.isPopular ? setShowPaymentModal(true) : null}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-bold">Mentorías 1 a 1</h4>
                <Badge className="bg-slate-700 text-slate-200 border-none">Próximamente</Badge>
              </div>
              <p className="text-slate-400 text-sm max-w-lg">
                Muy pronto podrás agendar sesiones de 45 minutos con estudiantes de últimos ciclos y egresados recientes de tus carreras compatibles.
              </p>
            </div>
            <Button variant="secondary" className="shrink-0 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white" disabled>
              Apúntate a la lista
            </Button>
          </Card>
        </div>

      </Container>

      {/* Payment Modal */}
      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Desbloquear Premium</h2>
          <p className="text-sm text-slate-500 mt-2">Acceso de por vida a la plataforma completa.</p>
        </div>

        <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 text-warning-800 text-sm mb-6 flex items-center justify-center text-center font-medium">
          Aviso: Pago no real. Esto es un prototipo visual.
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowPaymentModal(false); }}>
          <Input label="Número de tarjeta" placeholder="0000 0000 0000 0000" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Vencimiento" placeholder="MM/YY" />
            <Input label="CVC" placeholder="123" />
          </div>
          <Input label="Nombre en la tarjeta" placeholder="Juan Pérez" />
          
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 text-lg">
              Pagar S/ 49
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
