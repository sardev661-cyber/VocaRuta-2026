import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { ArrowRight, Compass, FlaskConical, BarChart3, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8 border border-primary-100">
            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
            Plataforma de Orientación Vocacional
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Descubre. Prueba. <span className="text-primary-600">Decide.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Antes de elegir una carrera, vive una parte de ella. Combina autoconocimiento y simulaciones reales para tomar la mejor decisión.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.REGISTER}>
              <Button className="h-14 px-8 text-lg w-full sm:w-auto shadow-sm">
                Empieza gratis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={ROUTES.SCHOOL}>
              <Button variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto">
                Para Colegios
              </Button>
            </Link>
          </div>
        </Container>
        {/* Subtle background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50 rounded-full blur-3xl -z-10 opacity-50"></div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20 bg-white border-y border-slate-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Una ruta clara hacia tu futuro</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Sigue 5 etapas diseñadas para guiarte desde la incertidumbre hasta la decisión con argumentos sólidos.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { num: 1, title: 'Conócete', desc: 'Evalúa tus intereses, habilidades y valores.', icon: <Compass className="h-6 w-6 text-primary-600" /> },
              { num: 2, title: 'Explora', desc: 'Recibe recomendaciones de carreras compatibles.', icon: <SearchIcon className="h-6 w-6 text-primary-600" /> },
              { num: 3, title: 'Prueba', desc: 'Resuelve simulaciones prácticas de la vida real.', icon: <FlaskConical className="h-6 w-6 text-primary-600" /> },
              { num: 4, title: 'Compara', desc: 'Analiza mercado, salarios y malla curricular.', icon: <BarChart3 className="h-6 w-6 text-primary-600" /> },
              { num: 5, title: 'Decide', desc: 'Descarga un reporte integral para tu familia.', icon: <CheckCircle2 className="h-6 w-6 text-primary-600" /> }
            ].map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary-100 z-10 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                {step.num !== 5 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-slate-100 -z-0"></div>}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why we are different */}
      <section id="beneficios" className="py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Mucho más que un test vocacional</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Los tests tradicionales solo te dicen qué eres. VocaRuta te permite experimentar la carrera antes de comprometerte 5 años de tu vida.
              </p>
              <ul className="space-y-6">
                {[
                  { title: 'Simulaciones reales', desc: 'Resuelve problemas que un profesional enfrenta en su día a día.', icon: <Zap className="h-5 w-5 text-accent-500" /> },
                  { title: 'Datos objetivos', desc: 'Información del mercado laboral para decisiones con los pies en la tierra.', icon: <BarChart3 className="h-5 w-5 text-accent-500" /> },
                  { title: 'Reporte para padres', desc: 'Herramientas para alinear expectativas con tu familia.', icon: <ShieldCheck className="h-5 w-5 text-accent-500" /> }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Card className="p-2 border-slate-200 shadow-xl bg-white rotate-2 transform hover:rotate-0 transition-transform duration-500">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-700 font-bold">EC</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Simulación: Economía</h3>
                      <p className="text-xs text-slate-500">Inflación vs Desempleo</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-10 border-2 border-primary-200 rounded-lg bg-white"></div>
                    <div className="h-10 border border-slate-200 rounded-lg bg-white"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-primary-900 text-white text-center">
        <Container className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para encontrar tu ruta?</h2>
          <p className="text-primary-200 text-lg mb-10">Crea tu cuenta gratuita y toma el control de tu futuro profesional hoy mismo.</p>
          <Link to={ROUTES.REGISTER}>
            <Button variant="secondary" className="h-14 px-10 text-lg text-primary-900 bg-white hover:bg-slate-50 shadow-lg">
              Empieza ahora
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
