import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useJourney } from '../../context/JourneyContext';
import { careerService } from '../../services/careerService';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Table, TableHeader, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { EmptyState } from '../../components/ui/EmptyState';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Search, Info, Check, X } from 'lucide-react';
import { clsx } from 'clsx';

export default function ComparePage() {
  const { state, dispatch } = useJourney();
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.compareList.length === 0) {
      setLoading(false);
      return;
    }

    // Fetch details for the selected careers to compare
    Promise.all(state.compareList.map(id => careerService.getCareerById(id)))
      .then(data => {
        // Find their compatibility scores from state if available
        const withCompat = data.map(c => {
          const recCareer = state.recommendedCareers.find(r => r.id === c.id);
          return {
            ...c,
            compatibility: recCareer ? recCareer.compatibility : 0
          };
        });
        setCareers(withCompat);
        setLoading(false);
      });
  }, [state.compareList, state.recommendedCareers]);

  if (loading) return <div className="p-8 text-center text-slate-500">Cargando comparador...</div>;

  if (careers.length === 0) {
    return (
      <div className="animate-in fade-in">
        <SectionHeader title="Compara opciones" />
        <EmptyState 
          icon={<Search className="w-12 h-12" />}
          title="Aún no has seleccionado carreras para comparar"
          description="Ve a la sección 'Explora' y agrega hasta 3 carreras que te interesen para verlas lado a lado."
          action={<Button onClick={() => navigate(ROUTES.EXPLORE)}>Ir a Explorar</Button>}
        />
      </div>
    );
  }

  const getDemandColor = (demand) => {
    switch(demand.toLowerCase()) {
      case 'alta': return 'success';
      case 'media': return 'warning';
      case 'baja': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionHeader 
        title="Compara lado a lado" 
        description="Analiza los datos concretos de las carreras que más te interesan para tomar una decisión informada."
        action={
          <Button onClick={() => {
            dispatch({ type: 'SET_STAGE', payload: Math.max(state.currentStage, 5) });
            navigate(ROUTES.REPORT);
          }}>
            Ir a Resultado Final
          </Button>
        }
      />

      <Alert variant="info" className="mb-6">
        <span className="font-semibold">Nota: </span>
        Todos los datos mostrados (salarios, pensiones, demanda) son datos referenciales de ejemplo y pueden variar por universidad o región.
      </Alert>

      <Card className="overflow-hidden">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4 bg-slate-50 border-r border-slate-200">Característica</TableHead>
              {careers.map(career => (
                <TableHead key={career.id} className="w-1/4 text-center bg-white">
                  <span className="text-lg font-bold text-slate-900 block">{career.name}</span>
                  <span className="text-sm font-medium text-primary-600 mt-1 block">{career.compatibility}% Compatibilidad</span>
                </TableHead>
              ))}
              {/* Fill empty columns if less than 3 */}
              {[...Array(3 - careers.length)].map((_, i) => (
                <TableHead key={`empty-${i}`} className="w-1/4 bg-slate-50 border-l border-slate-100 text-center opacity-50">
                  <div className="text-sm text-slate-400 font-normal">Espacio disponible</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell className="font-medium bg-slate-50 border-r border-slate-200">Duración promedio</TableCell>
              {careers.map(career => (
                <TableCell key={career.id} className="text-center">{career.duration}</TableCell>
              ))}
              {[...Array(3 - careers.length)].map((_, i) => <TableCell key={`e1-${i}`} className="bg-slate-50/50" />)}
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium bg-slate-50 border-r border-slate-200">Cursos principales</TableCell>
              {careers.map(career => (
                <TableCell key={career.id} className="align-top">
                  <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                    {career.mainCourses.map(course => <li key={course}>{course}</li>)}
                  </ul>
                </TableCell>
              ))}
              {[...Array(3 - careers.length)].map((_, i) => <TableCell key={`e2-${i}`} className="bg-slate-50/50" />)}
            </TableRow>

            <TableRow>
              <TableCell className="font-medium bg-slate-50 border-r border-slate-200">Demanda Laboral <Info className="inline w-3 h-3 text-slate-400" /></TableCell>
              {careers.map(career => (
                <TableCell key={career.id} className="text-center">
                  <Badge variant={getDemandColor(career.demand)}>{career.demand}</Badge>
                </TableCell>
              ))}
              {[...Array(3 - careers.length)].map((_, i) => <TableCell key={`e3-${i}`} className="bg-slate-50/50" />)}
            </TableRow>

            <TableRow>
              <TableCell className="font-medium bg-slate-50 border-r border-slate-200">Salario Referencial <br/><span className="text-xs text-slate-400 font-normal">Junior - Semi Senior</span></TableCell>
              {careers.map(career => (
                <TableCell key={career.id} className="text-center font-medium text-slate-700">
                  {career.salaryRange}
                </TableCell>
              ))}
              {[...Array(3 - careers.length)].map((_, i) => <TableCell key={`e4-${i}`} className="bg-slate-50/50" />)}
            </TableRow>

            <TableRow>
              <TableCell className="font-medium bg-slate-50 border-r border-slate-200">Pensión Referencial <br/><span className="text-xs text-slate-400 font-normal">Universidades Privadas</span></TableCell>
              {careers.map(career => (
                <TableCell key={career.id} className="text-center text-slate-600">
                  {career.tuitionRange}
                </TableCell>
              ))}
              {[...Array(3 - careers.length)].map((_, i) => <TableCell key={`e5-${i}`} className="bg-slate-50/50" />)}
            </TableRow>

            <TableRow>
              <TableCell className="font-medium bg-slate-50 border-r border-slate-200 rounded-bl-lg">Simulación VocaRuta</TableCell>
              {careers.map(career => {
                const hasSim = state.completedSimulations.hasOwnProperty(`sim-${career.id.substring(0,3)}`);
                return (
                  <TableCell key={career.id} className="text-center">
                    {hasSim ? (
                      <span className="flex items-center justify-center gap-1 text-success-600 font-medium text-sm">
                        <Check className="w-4 h-4" /> Realizada
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1 text-slate-400 font-medium text-sm">
                        <X className="w-4 h-4" /> Pendiente
                      </span>
                    )}
                  </TableCell>
                );
              })}
              {[...Array(3 - careers.length)].map((_, i) => <TableCell key={`e6-${i}`} className="bg-slate-50/50 rounded-br-lg" />)}
            </TableRow>
          </tbody>
        </Table>
      </Card>
      
      {careers.length < 3 && (
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate(ROUTES.EXPLORE)}>
            + Agregar otra carrera
          </Button>
        </div>
      )}
    </div>
  );
}
