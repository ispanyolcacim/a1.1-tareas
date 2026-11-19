export const questions = [
  {
    prompt: [['özellik', '¿Cómo'], ['fiil', 'es'], ['özne', 'mi casa?']],
    choices: [
      [['özellik', 'Grande']], [['özellik', 'Pequeña']], [['özellik', 'Mediana']],
      [['diğer', 'No'], ['fiil', 'tengo'], ['nesne', 'casa,'], ['fiil', 'tengo'], ['nesne', 'un chalet']],
    ],
    correct: 1,
  },
  {
    prompt: [['diğer', '¿Dónde'], ['fiil', 'está'], ['özne', 'la casa de mis abuelos?']],
    choices: ['En la ciudad', 'Frente al mar', 'En la montaña', 'En una ladera'].map(place => [['diğer', place]]),
    correct: 2,
  },
  {
    prompt: [['diğer', '¿En qué estancia'], ['fiil', 'está'], ['özne', 'la chimenea?']],
    choices: [
      [['diğer', 'En la cocina']], [['diğer', 'En la sala']], [['diğer', 'En el jardín']],
      [['diğer', 'No'], ['fiil', 'tienen']],
    ],
    correct: 1,
  },
  {
    prompt: [['nesne', '¿Qué'], ['fiil', 'tienen'], ['özne', 'los dormitorios?']],
    choices: ['Ventanas muy grandes', 'Chimeneas', 'Sofás', 'Televisión'].map(object => [['nesne', object]]),
    correct: 0,
  },
  {
    prompt: [['diğer', '¿Para qué'], ['fiil', 'usan'], ['nesne', 'la despensa?']],
    choices: ['libros y mesas', 'flores', 'herramientas de jardín', 'comida'].map(food => [['diğer', 'Para almacenar ' + food]]),
    correct: 3,
  },
  {
    prompt: [['özellik', '¿Cómo'], ['fiil', 'son'], ['özne', 'las flores?']],
    choices: [
      [['özellik', 'De muchos colores']], [['özellik', 'De muchas especies diferentes']],
      [['özellik', 'Rojas y azules']], [['diğer', 'No'], ['fiil', 'hay'], ['nesne', 'flores de colores']],
    ],
    correct: 0,
  },
];

export const reading = [
  [
    [['özne', 'Mi casa'], ['fiil', 'es'], ['özellik', 'muy pequeña,'], ['bağlaç', 'pero'], ['özne', 'la{la-casa} de mis abuelos'], ['fiil', 'es'], ['özellik', 'enorme,'], ['fiil', 'parece'], ['özellik', 'una mansión.']],
    [['özne', 'Su casa'], ['fiil', 'está situada'], ['diğer', 'en lo alto de una montaña.']],
    [['fiil', 'Tiene'], ['nesne', 'seis habitaciones, tres baños y un comedor muy grande.']],
    [['diğer', 'También'], ['fiil', 'tiene'], ['nesne', 'una gran sala con un sofá, una televisión de grandes dimensiones y una chimenea,'], ['özellik', 'perfecta para disfrutar los días más fríos del año.']],
  ],
  [
    [['özne', 'Cada dormitorio'], ['fiil', 'tiene'], ['nesne', 'grandes ventanales con vistas a la montaña.']],
    [['özne', 'La cocina'], ['fiil', 'tiene'], ['nesne', 'una despensa'], ['diğer', 'donde almacenar toda la comida.']],
    [['bağlaç', 'Además,'], ['özne', 'mis abuelos'], ['fiil', 'tienen'], ['nesne', 'una biblioteca de gran tamaño,'], ['özellik', 'llena de libros y mesas para estudiar y leer.']],
  ],
  [
    [['diğer', 'En el exterior de la casa'], ['fiil', 'hay'], ['nesne', 'un precioso jardín lleno de árboles y flores de todos los colores.']],
  ],
];

// A numbered placeholder keeps the word in the same grammatical phrase as the audio.
export const interview = [
  ['A', [
    [['işaret', 'Hola,'], ['fiil', 'vamos a hablar'], ['diğer', 'primero'], ['nesne', 'la introducción.']],
    [['diğer', '¿[1]'], ['fiil', 'te llamas?']],
  ]],
  ['Maylena', [[['fiil', 'Me{me-reflexivo} [2]'], ['özellik', 'Maylena Chaviano.']]]],
  ['A', [[['bağlaç', '¿Y'], ['nesne', 'cuántos [3]'], ['fiil', 'tienes?']]]],
  ['Maylena', [[['fiil', 'Tengo'], ['nesne', 'treinta y un años de edad.']]]],
  ['A', [[['bağlaç', '¿Y'], ['diğer', 'de [4]'], ['fiil', 'eres?']]]],
  ['Maylena', [[['fiil', 'Soy'], ['özellik', 'cubana.']]]],
  ['A', [[['bağlaç', '¿Y'], ['fiil', 'háblame'], ['diğer', 'un [5] de ti misma,'], ['özellik', 'cómo'], ['özne', 'tú'], ['fiil', 'eres?']]]],
  ['Maylena', [
    [['işaret', 'Bueno,'], ['fiil', 'soy'], ['özellik', 'alegre, [6],'], ['dolaylı', 'me'], ['fiil', 'gusta'], ['özne', 'conocer [7] nueva.']],
    [['dolaylı', 'Me'], ['fiil', 'encanta'], ['özne', '[8].']],
    [['diğer', 'No'], ['fiil', 'soy'], ['özellik', '[9].']],
  ]],
  ['A', [[['bağlaç', '¿Y'], ['özne', 'qué'], ['dolaylı', 'te{te-a-ti}'], ['fiil', 'gusta'], ['özne', 'hacer?']]]],
  ['Maylena', [
    [['diğer', '¿De hobby o…?']],
    [['işaret', 'Bueno, pues'], ['dolaylı', 'me'], ['fiil', 'gusta'], ['özne', '[10] diferentes tipos de baile,']],
    [['fiil', 'estoy estudiando,']],
    [['dolaylı', 'me'], ['fiil', 'gusta'], ['diğer', 'mucho'], ['özne', 'la [11] donde estoy ahora, conocer lugares nuevos, viajar.']],
  ]],
  ['A', [[['bağlaç', '¿Y'], ['özne', 'qué'], ['diğer', 'no'], ['dolaylı', 'te{te-a-ti}'], ['fiil', 'gusta'], ['özne', 'hacer?']]]],
  ['Maylena', [
    [['diğer', 'No'], ['dolaylı', 'me'], ['fiil', 'gusta'], ['özne', '[12].']],
    [['diğer', 'No'], ['dolaylı', 'me'], ['fiil', 'gusta'], ['özne', 'como estar…, como que…,'], ['fiil', 'pasamos'], ['diğer', 'por{por-esa} esa…']],
  ]],
  ['A', [[['diğer', '¿Dónde'], ['fiil', 'vives?']]]],
  ['Maylena', [[['diğer', 'Ahora'], ['fiil', '[13]'], ['diğer', 'en Canadá, Montreal.']]]],
  ['A', [[['işaret', 'Ah,'], ['diğer', '¿por [14] [15]'], ['fiil', 'vives'], ['diğer', 'en Canadá?']]]],
  ['Maylena', [[['fiil', 'Vivo'], ['diğer', 'casi un año.']]]],
  ['A', [[['bağlaç', '¿Y'], ['diğer', 'dónde'], ['fiil', 'vivías'], ['diğer', 'antes de Canadá?']]]],
  ['Maylena', [[['diğer', 'En Boston.']]]],
  ['A', [[['bağlaç', '¿Y'], ['diğer', 'cuánto tiempo no'], ['fiil', 'vives'], ['diğer', 'en Cuba?']]]],
  ['Maylena', [[['diğer', 'Ya'], ['fiil', 'llevo'], ['diğer', 'más de diez años'], ['diğer', '[16] de Cuba.']]]],
  ['A', [[['bağlaç', 'Y'], ['diğer', 'la [17] pregunta,'], ['özellik', '¿quién'], ['fiil', 'es'], ['özne', 'tu mejor amigo o amiga,'], ['bağlaç', 'y'], ['özellik', 'cómo'], ['fiil', 'es'], ['özne', 'la persona?']]]],
  ['Maylena', [
    [['işaret', 'Bueno, pues,'], ['özne', 'mi [18] amigo'], ['fiil', 'se llama'], ['özellik', 'Juan Zavala.']],
    [['bağlaç', 'Y'], ['özne', 'mi mejor amiga'], ['fiil', 'es,'], ['işaret', 'bueno,'], ['özellik', 'mi mamá y Aygergía.']],
  ]],
  ['A', [[['bağlaç', '¿Y'], ['özellik', 'cómo'], ['fiil', 'es'], ['özne', 'Juan?']]]],
  ['Maylena', [
    [['işaret', 'Pues'], ['fiil', 'es'], ['diğer', 'también'], ['özellik', 'alegre,'], ['dolaylı', 'le'], ['fiil', 'gusta'], ['özne', 'la [19], el baile,']],
    [['fiil', 'es'], ['özellik', 'muy dedicado y serio'], ['diğer', 'en su trabajo y en sus estudios,'], ['bağlaç', 'y'], ['özellik', '[20]'], ['diğer', 'en progresar con su carrera.']],
  ]],
  ['A', [[['işaret', 'Muchas gracias.']], [['işaret', 'Adiós.']]]],
];

export const answers = [
  'Cómo', 'llamo', 'años', 'dónde', 'poquito', 'sociable', 'gente', 'bailar', 'paciente', 'aprender',
  'escuela', 'esperar', 'vivo', 'cuánto', 'tiempo', 'fuera', 'última', 'mejor', 'música', 'ambicioso',
];
