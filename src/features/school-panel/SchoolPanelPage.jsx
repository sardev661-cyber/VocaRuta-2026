import { useState, useEffect } from 'react';
import { schoolService } from '../../services/schoolService';
import { Card } from '../../components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CheckCircle, FlaskConical, Search, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function SchoolPanelPage() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    schoolService.getSchoolDashboardData().then(res => setData(res));
  }, []);

  if (!data) return <div className="p-8 text-slate-500 text-center">Cargando datos del colegio...</div>;

  const filteredStudents = data.students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panel del Colegio</h1>
          <p className="text-slate-500">Promoción 2026 - Colegio San Ignacio</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          <AlertCircle className="w-4 h-4 text-slate-400" /> 
          Los datos se presentan de forma agregada. Datos de ejemplo.
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Estudiantes Registrados</p>
              <h3 className="text-2xl font-bold text-slate-900">{data.stats.totalStudents}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center text-success-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Ruta Completada</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  {Math.round((data.stats.completedRoute / data.stats.totalStudents) * 100)}%
                </h3>
                <span className="text-xs text-slate-500">({data.stats.completedRoute} alumnos)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center" style={{ color: '#14b8a6' }}>
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Simulaciones Realizadas</p>
              <h3 className="text-2xl font-bold text-slate-900">{data.stats.simulationsDone}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-6">Carreras más exploradas</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCareers} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={120} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 text-white flex flex-col justify-center">
          <h3 className="font-bold text-slate-100 mb-2">Impacto en la certeza de los estudiantes</h3>
          <p className="text-slate-400 text-sm mb-8">Promedio del nivel de seguridad al elegir carrera de la promoción.</p>
          
          <div className="flex items-center justify-between px-8">
            <div className="text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Antes de VocaRuta</span>
              <div className="text-4xl font-bold text-white">{data.certaintyChange.before}</div>
              <span className="text-sm text-slate-400">/ 5.0</span>
            </div>
            
            <div className="h-1 flex-grow mx-8 bg-slate-800 rounded-full relative">
              <div className="absolute top-0 left-0 h-full bg-primary-500 rounded-full w-full opacity-50" />
              <div className="absolute -top-1.5 right-0 w-4 h-4 bg-primary-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>

            <div className="text-center">
              <span className="text-xs text-primary-400 uppercase tracking-wider block mb-2">Después de VocaRuta</span>
              <div className="text-4xl font-bold text-primary-500">{data.certaintyChange.after}</div>
              <span className="text-sm text-slate-400">/ 5.0</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Student List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900">Directorio de Estudiantes</h3>
          <div className="w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Buscar alumno..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Estudiante</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Principal Recomendación</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={clsx(
                            "h-full rounded-full",
                            student.progress === 100 ? "bg-success-500" : "bg-primary-500"
                          )}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      student.progress === 100 ? 'success' : 
                      student.progress > 0 ? 'primary' : 'default'
                    }>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{student.recommended}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  No se encontraron estudiantes con ese nombre.
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
