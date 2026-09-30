import { Link } from 'react-router-dom';
import { ROUTES } from '../app/routes';
import { Button } from '../components/ui/Button';
import { Stepper } from '../components/ui/Stepper';
import { useJourney } from '../context/JourneyContext';

const STAGES = ['Conócete', 'Explora', 'Prueba', 'Compara', 'Decide'];

export default function StudentLayout() {
  const { state } = useJourney();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
            <span className="font-bold text-xl text-slate-900 tracking-tight hidden sm:block">VocaRuta</span>
          </Link>
          
          <div className="flex-grow max-w-2xl mx-8 hidden md:block">
            <Stepper steps={STAGES} currentStep={state.currentStage - 1} />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-medium">
              U
            </div>
          </div>
        </div>
        
        {/* Mobile stepper */}
        <div className="md:hidden px-4 py-3 border-t border-slate-100 bg-slate-50">
          <Stepper steps={STAGES} currentStep={state.currentStage - 1} />
        </div>
      </header>
      
      <main className="flex-grow flex flex-col p-4 md:p-8 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}

// Need to import Outlet
import { Outlet } from 'react-router-dom';