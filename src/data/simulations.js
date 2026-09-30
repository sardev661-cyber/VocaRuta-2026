export const simulationsData = [
  {
    id: 'sim-eco',
    careerId: 'economia',
    title: 'Inflación vs Desempleo: ¿Qué recomiendas?',
    duration: '15 min',
    difficulty: 'Media',
    status: 'available', // available, upcoming
    steps: [
      {
        id: 'step1',
        type: 'intro',
        content: 'Eres el analista principal del Banco Central. El país enfrenta una inflación del 8% (muy por encima de la meta del 3%), pero al mismo tiempo el desempleo acaba de subir al 7%.',
      },
      {
        id: 'step2',
        type: 'data',
        content: 'Si subes las tasas de interés, frenarás la inflación, pero es probable que el desempleo empeore porque las empresas pedirán menos préstamos para crecer. Si bajas las tasas, fomentarás el empleo, pero la inflación podría dispararse aún más.',
      },
      {
        id: 'step3',
        type: 'decision',
        content: '¿Qué política recomendarías implementar este mes y por qué?',
        options: [
          { id: 'opt1', text: 'Subir las tasas de interés fuertemente para controlar la inflación primero.' },
          { id: 'opt2', text: 'Bajar las tasas para estimular el empleo, asumiendo el riesgo inflacionario.' },
          { id: 'opt3', text: 'Mantener las tasas iguales y esperar más datos el próximo mes.' }
        ]
      },
      {
        id: 'step4',
        type: 'feedback',
        content: 'En economía rara vez hay una respuesta "correcta" sin costos. Tomar decisiones analizando el "costo de oportunidad" es el día a día de un economista. Lo importante es cómo justificaste tu elección basándote en los datos.'
      }
    ]
  },
  {
    id: 'sim-mkt',
    careerId: 'marketing',
    title: 'Define el público objetivo de una nueva bebida',
    duration: '10 min',
    difficulty: 'Baja',
    status: 'available',
    steps: [
      {
        id: 'step1',
        type: 'intro',
        content: 'Tu empresa va a lanzar una bebida energizante natural a base de frutas locales, sin azúcar añadida. Tu tarea es definir la campaña inicial.'
      },
      {
        id: 'step2',
        type: 'decision',
        content: '¿A qué segmento de público dirigirías el 80% del presupuesto de lanzamiento?',
        options: [
          { id: 'opt1', text: 'Deportistas de alto rendimiento (18-30 años).' },
          { id: 'opt2', text: 'Jóvenes universitarios en época de exámenes.' },
          { id: 'opt3', text: 'Profesionales jóvenes preocupados por su salud.' }
        ]
      },
      {
        id: 'step3',
        type: 'feedback',
        content: 'El marketing se trata de encontrar el "nicho" más rentable y afín al producto, y luego crear mensajes específicos para ellos.'
      }
    ]
  },
  {
    id: 'sim-der',
    careerId: 'derecho',
    title: 'Argumentos de defensa en un caso de contrato',
    duration: '20 min',
    difficulty: 'Alta',
    status: 'upcoming',
    steps: []
  },
  {
    id: 'sim-ind',
    careerId: 'industrial',
    title: 'Reorganiza una línea de ensamblaje',
    duration: '15 min',
    difficulty: 'Media',
    status: 'upcoming',
    steps: []
  }
];
