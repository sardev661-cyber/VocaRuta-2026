export const schoolData = {
  stats: {
    totalStudents: 120,
    completedRoute: 78,
    simulationsDone: 345,
  },
  topCareers: [
    { name: 'Ingeniería de Sistemas', count: 45 },
    { name: 'Administración', count: 38 },
    { name: 'Psicología', count: 32 },
    { name: 'Medicina', count: 28 },
    { name: 'Derecho', count: 25 },
  ],
  certaintyChange: {
    before: 2.1,
    after: 4.2
  },
  students: [
    { id: 1, name: 'Mateo Quispe', progress: 100, status: 'Completado', recommended: 'Ingeniería de Sistemas' },
    { id: 2, name: 'Valentina Rojas', progress: 100, status: 'Completado', recommended: 'Psicología' },
    { id: 3, name: 'Camila Flores', progress: 60, status: 'En progreso (Prueba)', recommended: '-' },
    { id: 4, name: 'Sebastian Condori', progress: 20, status: 'En progreso (Explora)', recommended: '-' },
    { id: 5, name: 'Luciana Silva', progress: 100, status: 'Completado', recommended: 'Arquitectura' },
    { id: 6, name: 'Joaquin Mendoza', progress: 80, status: 'En progreso (Compara)', recommended: '-' },
    { id: 7, name: 'Sofia Castro', progress: 100, status: 'Completado', recommended: 'Medicina' },
    { id: 8, name: 'Diego Vargas', progress: 0, status: 'No iniciado', recommended: '-' },
    // A few more mock students
    { id: 9, name: 'Valeria Ramos', progress: 100, status: 'Completado', recommended: 'Comunicaciones' },
    { id: 10, name: 'Matias Castillo', progress: 100, status: 'Completado', recommended: 'Economía' }
  ]
};
