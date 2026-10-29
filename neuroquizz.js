const app = {
    state: {
        userName: '', category: '', score: 0, wrongAnswers: 0, consecutiveHits: 0, currentLevel: 'Fácil',
        questionIndex: 0, shuffledQuestions: [], canAnswer: true, totalQuestions: 20, gameInProgress: false,
        timerInterval: null, timeLeft: 20, maxTime: 20, usedJoker5050: false, usedJokerAudience: false, usedJokerTutor: false,
        manualLevel: 'auto', soundEnabled: true, language: 'es', typewriterInterval: null, aiExplained: false,
        userStats: { gamesPlayed: 0, totalCorrect: 0, totalWrong: 0, bestScore: 0, currentStreak: 0, history: [] }
    },
    aiExplanations: {
        // Math
        "¿Cuánto es 8 x 7?": "La multiplicación de 8 por 7 consiste en sumar el número 8 siete veces. El resultado es 56.",
        "Raíz cuadrada de 81": "La raíz cuadrada de un número es otro número que multiplicado por sí mismo da el primero. Dado que 9 x 9 = 81, la raíz cuadrada es 9.",
        "Si 3x = 12, ¿x?": "Para despejar x, dividimos ambos lados entre 3: x = 12 / 3, dando como resultado 4.",
        "Área cuadrado lado 5": "El área de un cuadrado es lado por lado (Lado²). Así, 5 x 5 = 25.",
        "Grados círculo": "Un círculo completo representa una rotación angular estándar de 360 grados.",
        "120+85": "Sumando paso a paso: 120 + 80 = 200, y agregando las 5 unidades restantes obtenemos 205.",
        "Doble de 48": "El doble de 48 se calcula multiplicando por 2: 48 x 2 = 96.",
        "Serie 2,4,8,16...": "Esta es una progresión geométrica donde cada término se duplica. El siguiente es 16 x 2 = 32.",
        "mm en cm": "Un centímetro equivale exactamente a 10 milímetros en el sistema métrico decimal.",
        "Triángulo 3 lados iguales": "Un triángulo con tres lados de igual longitud es un triángulo Equilátero.",
        "15% de 200": "El 15% representa 15 de cada 100. Como son 200, multiplicamos 15 x 2 = 30.",
        "2+2x2": "Por jerarquía de operaciones, primero se multiplica (2 x 2 = 4) y luego se suma (2 + 4 = 6).",
        "Lados hexágono": "Un hexágono es una figura geométrica regular de seis lados y seis vértices.",
        "Pi 2 decimales": "El número pi aproximado a dos cifras decimales es 3.14.",
        "Caras cubo": "Un cubo es un poliedro regular compuesto por 6 caras cuadradas congruentes.",
        "Velocidad 180km/3h": "La velocidad es distancia sobre tiempo (v = d/t). 180 km / 3 h = 60 km/h.",
        "Ángulos triángulo": "La suma de los tres ángulos internos de cualquier triángulo plano siempre es igual a 180°.",
        "Raíz cúbica 27": "Buscamos un número que multiplicado tres veces por sí mismo sea 27. Como 3 x 3 x 3 = 27, la respuesta es 3.",
        "Romano L": "En la numeración romana, la letra L representa el número 50.",
        "0.5 fracción": "El número decimal 0.5 representa la mitad de una unidad, lo que equivale a la fracción 1/2.",
        "y=2x+3, x=5": "Sustituyendo x: y = 2(5) + 3 = 10 + 3 = 13.",
        "Número primo": "Un número primo es divisible únicamente por sí mismo y por 1. El 17 es el único primo en la lista.",
        "Volumen cubo lado3": "El volumen de un cubo es Lado³. Así, 3³ = 3 x 3 x 3 = 27.",
        "Pitágoras 3,4": "Por teorema de Pitágoras (c² = a² + b²): c² = 3² + 4² = 9 + 16 = 25. La raíz cuadrada de 25 es 5.",
        "Log10(100)": "El logaritmo en base 10 de 100 es 2, ya que 10² = 100.",
        "Derivada x²": "Usando la regla de derivación para potencias, d/dx(x^n) = n*x^(n-1). Por tanto, es 2x.",
        "Valor e": "El número e (base del logaritmo natural) tiene un valor aproximado de 2.71.",
        "Ángulo 90°": "Un ángulo de exactamente 90 grados se clasifica como un ángulo recto.",
        "MCD 12 y 18": "El Máximo Común Divisor de 12 y 18 es 6, el número más grande que divide exactamente a ambos.",
        "Probabilidad 0": "Un suceso con probabilidad 0 es un evento imposible de ocurrir.",

        // Culture
        "¿Cuál es el salto de agua más alto del mundo?": "El Salto Ángel en el estado Bolívar tiene una altura de 979 metros, siendo el más alto del mundo.",
        "¿Cuál es la flor nacional de Venezuela?": "La Orquídea (Cattleya mossiae) es la flor nacional de Venezuela desde 1951.",
        "¿A quién se le conoce como 'El Libertador'?": "Simón Bolívar es reconocido históricamente como 'El Libertador' de varias naciones sudamericanas.",
        "¿Cuál es el plato nacional de Venezuela?": "El Pabellón Criollo, compuesto por arroz, caraotas negras, carne mechada y tajadas de plátano, es el plato nacional de Venezuela.",
        "¿Cuál es el ave nacional de Venezuela?": "El Turpial es el ave nacional de Venezuela, declarada en el año 1958 por su vibrante plumaje y canto.",
        "¿En qué estado se encuentran los Médanos de Coro?": "Los Médanos de Coro, un asombroso parque nacional de dunas de arena, se localiza en el estado Falcón.",
        "¿Cuál es el pico más alto de Venezuela?": "El Pico Bolívar, con una altura de 4,978 metros, es el punto geográfico más alto de Venezuela.",
        "¿Cuál es la capital de Venezuela?": "La ciudad de Caracas es la capital y el centro administrativo de Venezuela.",
        "¿En qué estado se encuentra el Lago de Maracaibo?": "El Lago de Maracaibo, una de las mayores reservas de agua de Sudamérica, se ubica en el estado Zulia.",
        "¿Cuál es la moneda oficial de Venezuela?": "La moneda oficial del país es el Bolívar.",
        "¿Qué se celebra el 5 de julio en Venezuela?": "El 5 de julio de 1811 se conmemora la firma del Acta de la Declaración de la Independencia de Venezuela.",
        "¿Cuál es el árbol nacional de Venezuela?": "El Araguaney, con su vistosa floración amarilla, es el árbol nacional desde 1948.",
        "¿Quién escribió la letra del Himno Nacional?": "Vicente Salias escribió la letra del Himno Nacional de Venezuela, conocido como 'Gloria al Bravo Pueblo'.",
        "¿Cuál es el río más largo de Venezuela?": "El río Orinoco, con aproximadamente 2,140 km de longitud, es el río más largo de Venezuela y uno de los más caudalosos del mundo.",
        "¿En qué estado se produce el Relámpago del Catatumbo?": "El Relámpago del Catatumbo es un fenómeno meteorológico único que ocurre sobre el lago de Maracaibo, en el estado Zulia.",
        "¿Qué batalla selló la independencia de Venezuela?": "La Batalla de Carabobo, librada el 24 de junio de 1821, selló definitivamente la independencia de Venezuela.",
        "¿Cuántos estados tiene Venezuela?": "Venezuela está dividida en 23 estados, un Distrito Capital (Caracas) y las Dependencias Federales.",
        "¿Cuál es el parque nacional más antiguo de Venezuela?": "El Parque Nacional Henri Pittier, creado en 1937, es el parque nacional más antiguo de Venezuela.",
        "¿En qué año fue fundada la ciudad de Caracas?": "Santiago de León de Caracas fue fundada el 25 de julio de 1567 por Diego de Losada.",
        "¿Qué se celebra el 24 de junio en Venezuela?": "El 24 de junio se celebra la Batalla de Carabobo de 1821, que selló la independencia de Venezuela y es también el Día del Ejército.",

        // History
        "¿Quién pintó la Mona Lisa?": "El maestro renacentista italiano Leonardo da Vinci pintó el famoso retrato de la Mona Lisa.",
        "Revolución Francesa año": "La Revolución Francesa, hito del fin del absolutismo, dio inicio formal en 1789.",
        "Primer hombre en la Luna": "El astronauta Neil Armstrong caminó en la Luna el 21 de julio de 1969 en la misión Apolo 11.",
        "Imperio Romano caída": "El Imperio Romano de Occidente cayó en el año 476 d.C., marcando el inicio de la Edad Media.",
        "Descubrimiento de América": "Cristóbal Colón desembarcó en tierras americanas el 12 de octubre de 1492.",
        "Guerra Mundial inicio": "La Primera Guerra Mundial comenzó en 1914 tras el asesinato del archiduque Francisco Fernando.",
        "Quién escribió 'Cien años de soledad'": "El Nobel de literatura colombiano Gabriel García Márquez escribió esta obra maestra en 1967.",
        "Muro de Berlín caída": "El colapso del Muro de Berlín ocurrió el 9 de noviembre de 1989, unificando a Alemania.",

        // Logic
        "Si todos los A son B y algunos B son C, entonces:": "Al ser un silogismo incompleto, no se puede asegurar una relación directa entre A y C.",
        "Completa: 3, 6, 9, 12, ?": "La secuencia avanza de 3 en 3 (progresión aritmética). Sigue el número 15.",
        "¿Qué número sigue? 1, 1, 2, 3, 5, ?": "Es la Sucesión de Fibonacci. El número siguiente es la suma de los dos anteriores: 3 + 5 = 8.",
        "Un reloj marca las 3:00, ¿ángulo agujas?": "A las 3:00, las agujas forman un ángulo recto exacto de 90 grados.",
        "Si 2+3=10, 7+2=63, 6+5=66, entonces 9+5=?": "El patrón es: (a + b) * a. Para 9 y 5: (9 + 5) * 9 = 14 * 9 = 126.",
        "Tres personas mienten siempre, una dice verdad. A: 'B miente', B: 'C miente', C: 'A miente', D: 'Yo digo verdad' ¿Quién dice verdad?": "Si analizas las contradicciones cíclicas entre A, B y C, todos ellos deben mentir. Por tanto, D es el único que dice la verdad."
    },
    questionsBank: {
        math: [
            { q: "¿Cuánto es 8 x 7?", a: ["54","56","64","49"], c:"56", level:"Fácil" }, { q: "Raíz cuadrada de 81", a:["7","8","9","10"], c:"9", level:"Fácil" },
            { q: "Si 3x = 12, ¿x?", a:["3","4","6","2"], c:"4", level:"Fácil" }, { q: "Área cuadrado lado 5", a:["10","20","25","30"], c:"25", level:"Fácil" },
            { q: "Grados círculo", a:["180","90","360","270"], c:"360", level:"Fácil" }, { q: "120+85", a:["195","205","215","185"], c:"205", level:"Fácil" },
            { q: "Doble de 48", a:["86","96","76","106"], c:"96", level:"Fácil" }, { q: "Serie 2,4,8,16...", a:["24","30","32","64"], c:"32", level:"Fácil" },
            { q: "mm en cm", a:["1","10","100","1000"], c:"10", level:"Fácil" }, { q: "Triángulo 3 lados iguales", a:["Isósceles","Escaleno","Equilátero","Rectángulo"], c:"Equilátero", level:"Fácil" },
            { q: "15% de 200", a:["20","25","30","35"], c:"30", level:"Normal" }, { q: "2+2x2", a:["8","6","4","10"], c:"6", level:"Normal" },
            { q: "Lados hexágono", a:["5","6","7","8"], c:"6", level:"Normal" }, { q: "Pi 2 decimales", a:["3.12","3.16","3.14","3.18"], c:"3.14", level:"Normal" },
            { q: "Caras cubo", a:["4","6","8","12"], c:"6", level:"Normal" }, { q: "Velocidad 180km/3h", a:["50","60","70","80km/h"], c:"60km/h", level:"Normal" },
            { q: "Ángulos triángulo", a:["90°","180°","270°","360°"], c:"180°", level:"Normal" }, { q: "Raíz cúbica 27", a:["3","9","2","4"], c:"3", level:"Normal" },
            { q: "Romano L", a:["10","50","100","500"], c:"50", level:"Normal" }, { q: "0.5 fracción", a:["1/4","1/3","1/2","2/5"], c:"1/2", level:"Normal" },
            { q: "y=2x+3, x=5", a:["10","13","15","8"], c:"13", level:"Difícil" }, { q: "Número primo", a:["9","15","17","21"], c:"17", level:"Difícil" },
            { q: "Volumen cubo lado3", a:["9","18","27","81"], c:"27", level:"Difícil" }, { q: "Pitágoras 3,4", a:["5","6","7","25"], c:"5", level:"Difícil" },
            { q: "Log10(100)", a:["1","2","3","10"], c:"2", level:"Difícil" }, { q: "Derivada x²", a:["x","2","2x","x/2"], c:"2x", level:"Difícil" },
            { q: "Valor e", a:["3.14","2.71","1.41","1.61"], c:"2.71", level:"Difícil" }, { q: "Ángulo 90°", a:["Agudo","Obtuso","Recto","Llano"], c:"Recto", level:"Difícil" },
            { q: "MCD 12 y 18", a:["2","3","6","9"], c:"6", level:"Difícil" }, { q: "Probabilidad 0", a:["Seguro","Probable","Imposible","Raro"], c:"Imposible", level:"Difícil" }
        ],
        culture: [
            { q: "¿Cuál es el salto de agua más alto del mundo?", a:["Iguazú","Niágara","Salto Ángel","Victoria"], c:"Salto Ángel", level:"Fácil" },
            { q: "¿Cuál es la flor nacional de Venezuela?", a:["Rosa","Orquídea","Araguaney","Lirio"], c:"Orquídea", level:"Fácil" },
            { q: "¿A quién se le conoce como 'El Libertador'?", a:["Sucre","Miranda","Simón Bolívar","Páez"], c:"Simón Bolívar", level:"Fácil" },
            { q: "¿Cuál es el plato nacional de Venezuela?", a:["Hallaca","Arepa","Pabellón Criollo","Cachapa"], c:"Pabellón Criollo", level:"Fácil" },
            { q: "¿Cuál es el ave nacional de Venezuela?", a:["Cóndor","Turpial","Águila","Cardenal"], c:"Turpial", level:"Fácil" },
            { q: "¿En qué estado se encuentran los Médanos de Coro?", a:["Zulia","Falcón","Mérida","Bolívar"], c:"Falcón", level:"Fácil" },
            { q: "¿Cuál es el pico más alto de Venezuela?", a:["Humboldt","Naiguatá","Pico Bolívar","Pico Espejo"], c:"Pico Bolívar", level:"Fácil" },
            { q: "¿Cuál es la capital de Venezuela?", a:["Valencia","Maracaibo","Caracas","Barquisimeto"], c:"Caracas", level:"Fácil" },
            { q: "¿En qué estado se encuentra el Lago de Maracaibo?", a:["Zulia","Anzoátegui","Sucre","Táchira"], c:"Zulia", level:"Fácil" },
            { q: "¿Cuál es la moneda oficial de Venezuela?", a:["Peso","Bolívar","Dólar","Real"], c:"Bolívar", level:"Fácil" },
            { q: "¿Qué se celebra el 5 de julio en Venezuela?", a:["Día de la Bandera","Independencia","Batalla de Carabobo","Día del Maestro"], c:"Independencia", level:"Normal" },
            { q: "¿Cuál es el árbol nacional de Venezuela?", a:["Samán","Araguaney","Ceiba","Pino"], c:"Araguaney", level:"Fácil" },
            { q: "¿Quién escribió la letra del Himno Nacional?", a:["Andrés Bello","Vicente Salias","Juan Landaeta","Simón Bolívar"], c:"Vicente Salias", level:"Normal" },
            { q: "¿Cuál es el río más largo de Venezuela?", a:["Caroní","Orinoco","Apure","Meta"], c:"Orinoco", level:"Normal" },
            { q: "¿En qué estado se produce el Relámpago del Catatumbo?", a:["Falcón","Mérida","Zulia","Barinas"], c:"Zulia", level:"Normal" },
            { q: "¿Qué batalla selló la independencia de Venezuela?", a:["Batalla de Boyacá","Batalla de Carabobo","Batalla de Junín","Batalla de La Victoria"], c:"Batalla de Carabobo", level:"Normal" },
            { q: "¿Cuántos estados tiene Venezuela?", a:["20","23","25","21"], c:"23", level:"Normal" },
            { q: "¿Cuál es el parque nacional más antiguo de Venezuela?", a:["Canaima","Henri Pittier","Morrocoy","El Ávila"], c:"Henri Pittier", level:"Difícil" },
            { q: "¿En qué año fue fundada la ciudad de Caracas?", a:["1498","1567","1600","1521"], c:"1567", level:"Difícil" },
            { q: "¿Qué se celebra el 24 de junio en Venezuela?", a:["Día de la Bandera","Batalla de Carabobo","Independencia","Día del Ejército"], c:"Batalla de Carabobo", level:"Difícil" }
        ],
        history: [
            { q: "¿Quién pintó la Mona Lisa?", a:["Van Gogh","Picasso","Da Vinci","Rembrandt"], c:"Da Vinci", level:"Normal" },
            { q: "Revolución Francesa año", a:["1776","1789","1799","1812"], c:"1789", level:"Normal" },
            { q: "Primer hombre en la Luna", a:["Armstrong","Gagarin","Aldrin","Shepard"], c:"Armstrong", level:"Fácil" },
            { q: "Imperio Romano caída", a:["395 dC","476 dC","1453 dC","753 aC"], c:"476 dC", level:"Difícil" },
            { q: "Descubrimiento de América", a:["1492","1500","1510","1485"], c:"1492", level:"Fácil" },
            { q: "Guerra Mundial inicio", a:["1914","1918","1939","1945"], c:"1914", level:"Normal" },
            { q: "Quién escribió 'Cien años de soledad'", a:["Vargas Llosa","Cortázar","García Márquez","Fuentes"], c:"García Márquez", level:"Fácil" },
            { q: "Muro de Berlín caída", a:["1987","1989","1991","1985"], c:"1989", level:"Normal" }
        ],
        logic: [
            { q: "Si todos los A son B y algunos B son C, entonces:", a:["Algunos A son C","Todos A son C","Ningún A es C","No se puede asegurar"], c:"No se puede asegurar", level:"Difícil" },
            { q: "Completa: 3, 6, 9, 12, ?", a:["13","14","15","16"], c:"15", level:"Fácil" },
            { q: "¿Qué número sigue? 1, 1, 2, 3, 5, ?", a:["7","8","9","10"], c:"8", level:"Normal" },
            { q: "Un reloj marca las 3:00, ¿ángulo agujas?", a:["90°","180°","45°","0°"], c:"90°", level:"Normal" },
            { q: "Si 2+3=10, 7+2=63, 6+5=66, entonces 9+5=?", a:["70","84","126","90"], c:"126", level:"Difícil" },
            { q: "Tres personas mienten siempre, una dice verdad. A: 'B miente', B: 'C miente', C: 'A miente', D: 'Yo digo verdad' ¿Quién dice verdad?", a:["A","B","C","D"], c:"D", level:"Difícil" }
        ]
    },
    translations: {
        es: {
            // Nav
            nav_home: 'Inicio', nav_stats: 'Estadísticas', nav_reset: 'Reiniciar Datos',
            // Hero / welcome
            badge_active: 'Plataforma Activa v5.0',
            hero_line1: 'Domina el arte', hero_line2: 'del ',
            hero_hl: 'conocimiento',
            hero_desc: 'Evaluación interactiva adaptativa con telemetría cognitiva en tiempo real. Desafía tu mente y mejora tu rendimiento académico con Inteligencia Artificial.',
            stat_games: 'Partidas', stat_avg: 'Promedio', stat_best: 'Mejor pts.',
            // Login
            login_title: 'Acceso al Sistema', login_subtitle: 'Autenticación requerida',
            login_label: 'Nombre de Usuario', login_placeholder: 'Ingresa tu nombre...',
            login_btn: 'Comenzar Desafío',
            // Categories
            greeting_select: 'selecciona una categoría',
            score_best: 'Mejor', score_avg: 'Prom',
            btn_back: 'Volver',
            opt_q10: '10 preguntas', opt_q20: '20 preguntas', opt_q30: '30 preguntas',
            opt_auto: 'Adaptativo (IA)', opt_easy: 'Solo Fácil', opt_normal: 'Solo Normal', opt_hard: 'Solo Difícil',
            cat_eyebrow: 'Selección de Módulo', cat_title_pre: 'Elige tu ', cat_title_em: 'categoría',
            // Game
            btn_exit: 'Salir',
            joker_audience: 'Público', joker_tutor: 'Tutor IA',
            panel_difficulty: 'Dificultad', panel_time: 'Tiempo', panel_score: 'Puntaje',
            question_of: 'de',
            question_label: 'Pregunta',
            feedback_correct: '¡Correcto!', feedback_wrong: 'Incorrecto',
            feedback_delegated: 'Delegado a IA',
            // Results
            btn_back_home: 'Volver al inicio', btn_export_txt: 'Exportar TXT',
            result_title_pre: '¡Desafío completado, ', result_title_post: '!',
            res_correct: 'Aciertos', res_wrong: 'Errores', res_accuracy: 'Precisión', res_score: 'Puntuación',
            res_final_level: 'Nivel Final', res_total_games: 'Partidas totales',
            btn_play_again: 'Jugar de Nuevo', btn_see_stats: 'Ver Estadísticas',
            // Result messages
            msg_excellent: '¡Excelente!', msg_great: '¡Muy bien!', msg_good: '¡Buen trabajo!', msg_keep: '¡Sigue intentando!',
            // Level names
            level_easy: 'Fácil', level_normal: 'Normal', level_hard: 'Difícil',
            // Statistics
            stats_eyebrow: 'Historial de Rendimiento', stats_title_pre: 'Estadísticas de ',
            kpi_games: 'Partidas Jugadas', kpi_avg: 'Promedio General', kpi_best: 'Mejor Puntuación',
            hist_title: 'Registros Históricos', hist_empty: 'Sin partidas registradas',
            hist_correct: 'ACIERTOS', hist_accuracy: 'PRECISIÓN',
            chart_title: 'Curva de Aprendizaje — Últimas 5 partidas',
            btn_download_hist: 'Descargar Historial', btn_reset_data: 'Reiniciar Datos',
            // Footer
            footer_terms: 'Términos', footer_privacy: 'Privacidad', footer_support: 'Soporte',
            // Tutor
            tutor_sub: 'Modelo Adaptativo v5',
            tutor_ready: 'El Tutor de IA está listo. Pulsa <strong style="color:var(--blue-400)">Tutor IA</strong> durante una pregunta para recibir una explicación paso a paso.',
            tutor_delegate: 'Delegar a IA',
            tutor_delegate_desc: 'La IA resolverá la pregunta automáticamente',
            tutor_analyzing: '// Análisis en curso...', tutor_explanation: '// Explicación de la IA',
            tutor_delegating: '// Ejecución delegada',
            tutor_analyzing_msg: 'Analizando el desafío...',
            tutor_delegating_msg: 'IA ejecutando flujo de resolución...',
            tutor_step1: 'Paso 1: Extrayendo datos clave...', tutor_step2: 'Paso 2: Evaluando respuestas correctas...',
            tutor_done: '🤖 ¡Resolución completada con éxito!', tutor_done_sub: 'Se ha delegado la respuesta correcta a la interfaz de usuario.',
            tutor_ready_header: '// NeuroAI Tutor listo',
            // Confirm
            confirm_exit: '¿Perder progreso?', confirm_lose: '¿Salir? Se perderá el progreso.', confirm_reset: '¿Eliminar todos los datos?',
            alert_name: 'Ingresa tu nombre',
            // Category names (used in history)
            cat_math: 'Matemáticas', cat_culture: 'Cultura', cat_history: 'Historia', cat_logic: 'Lógica'
        },
        en: {
            // Nav
            nav_home: 'Home', nav_stats: 'Statistics', nav_reset: 'Reset Data',
            // Hero / welcome
            badge_active: 'Platform Active v5.0',
            hero_line1: 'Master the art', hero_line2: 'of ',
            hero_hl: 'knowledge',
            hero_desc: 'Adaptive interactive evaluation with real-time cognitive telemetry. Challenge your mind and improve your academic performance with Artificial Intelligence.',
            stat_games: 'Games', stat_avg: 'Average', stat_best: 'Best pts.',
            // Login
            login_title: 'System Access', login_subtitle: 'Authentication required',
            login_label: 'Username', login_placeholder: 'Enter your name...',
            login_btn: 'Start Challenge',
            // Categories
            greeting_select: 'select a category',
            score_best: 'Best', score_avg: 'Avg',
            btn_back: 'Back',
            opt_q10: '10 questions', opt_q20: '20 questions', opt_q30: '30 questions',
            opt_auto: 'Adaptive (AI)', opt_easy: 'Easy only', opt_normal: 'Normal only', opt_hard: 'Hard only',
            cat_eyebrow: 'Module Selection', cat_title_pre: 'Choose your ', cat_title_em: 'category',
            // Game
            btn_exit: 'Exit',
            joker_audience: 'Audience', joker_tutor: 'AI Tutor',
            panel_difficulty: 'Difficulty', panel_time: 'Time', panel_score: 'Score',
            question_of: 'of',
            question_label: 'Question',
            feedback_correct: 'Correct!', feedback_wrong: 'Incorrect',
            feedback_delegated: 'Delegated to AI',
            // Results
            btn_back_home: 'Back to home', btn_export_txt: 'Export TXT',
            result_title_pre: 'Challenge completed, ', result_title_post: '!',
            res_correct: 'Correct', res_wrong: 'Wrong', res_accuracy: 'Accuracy', res_score: 'Score',
            res_final_level: 'Final Level', res_total_games: 'Total games',
            btn_play_again: 'Play Again', btn_see_stats: 'View Statistics',
            // Result messages
            msg_excellent: 'Excellent!', msg_great: 'Very good!', msg_good: 'Good job!', msg_keep: 'Keep trying!',
            // Level names
            level_easy: 'Easy', level_normal: 'Normal', level_hard: 'Hard',
            // Statistics
            stats_eyebrow: 'Performance History', stats_title_pre: 'Statistics of ',
            kpi_games: 'Games Played', kpi_avg: 'Overall Average', kpi_best: 'Best Score',
            hist_title: 'Historical Records', hist_empty: 'No games recorded',
            hist_correct: 'CORRECT', hist_accuracy: 'ACCURACY',
            chart_title: 'Learning Curve — Last 5 games',
            btn_download_hist: 'Download History', btn_reset_data: 'Reset Data',
            // Footer
            footer_terms: 'Terms', footer_privacy: 'Privacy', footer_support: 'Support',
            // Tutor
            tutor_sub: 'Adaptive Model v5',
            tutor_ready: 'The AI Tutor is ready. Press <strong style="color:var(--blue-400)">AI Tutor</strong> during a question to receive a step-by-step explanation.',
            tutor_delegate: 'Delegate to AI',
            tutor_delegate_desc: 'The AI will solve the question automatically',
            tutor_analyzing: '// Analysis in progress...', tutor_explanation: '// AI Explanation',
            tutor_delegating: '// Delegated execution',
            tutor_analyzing_msg: 'Analyzing the challenge...',
            tutor_delegating_msg: 'AI running resolution flow...',
            tutor_step1: 'Step 1: Extracting key data...', tutor_step2: 'Step 2: Evaluating correct answers...',
            tutor_done: '🤖 Resolution completed successfully!', tutor_done_sub: 'The correct answer has been delegated to the UI.',
            tutor_ready_header: '// NeuroAI Tutor ready',
            // Confirm
            confirm_exit: 'Lose progress?', confirm_lose: 'Exit? Progress will be lost.', confirm_reset: 'Delete all data?',
            alert_name: 'Please enter your name',
            // Category names (used in history)
            cat_math: 'Mathematics', cat_culture: 'Culture', cat_history: 'History', cat_logic: 'Logic'
        }
    },
    init() { 
        try {
            this.loadUserStats(); 
            this.loadPreferences(); 
            this.applyLanguage(this.state.language);
            this.showScreen('screen-welcome'); 
            this.updateAllStats(); 
            this.generateCategories(); 
            this.initEventListeners();
            this.initDynamicEffects();
        } catch(e) { console.error("Error en init:", e); alert("Error al iniciar: "+e.message); }
    },
    // Translation helper — returns string for current or given language
    t(key, lang) {
        const l = lang || this.state.language || 'es';
        const dict = this.translations[l] || this.translations['es'];
        return dict[key] !== undefined ? dict[key] : (this.translations['es'][key] || key);
    },
    // Apply all data-i18n text nodes and attributes to the DOM
    applyLanguage(lang) {
        this.state.language = lang || 'es';
        document.documentElement.lang = this.state.language;

        // Translate all [data-i18n] elements (innerText / innerHTML)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = this.t(key);
            // For tutor_ready we allow HTML (has <strong>)
            if (key === 'tutor_ready') {
                el.innerHTML = val;
            } else {
                el.innerText = val;
            }
        });

        // Translate placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
        });

        // Translate <option> elements
        document.querySelectorAll('[data-i18n-opt]').forEach(el => {
            el.innerText = this.t(el.getAttribute('data-i18n-opt'));
        });

        // Re-render categories if the container exists
        const catContainer = document.getElementById('categoriesContainer');
        if (catContainer && catContainer.children.length > 0) {
            this.generateCategories();
        }

        // Update greeting text with current user name
        const displayName = document.getElementById('display-name');
        if (displayName && this.state.userName) {
            displayName.innerText = this.state.userName;
        }

        // Update level indicator display
        this.updateLevelDisplay();

        // Update history if on statistics screen
        this.updateAllStats();
    },
    loadPreferences() { 
        try {
            // Force dark mode system-wide to align with OLED Black Ethereal Glass
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
            document.getElementById('darkModeToggle').innerText = '☀️'; 

            const sound = localStorage.getItem('soundEnabled')!=='false'; 
            this.state.soundEnabled=sound; 
            document.getElementById('soundToggle').innerText=sound?'🔊':'🔇'; 
            const lang = localStorage.getItem('language')||'es'; 
            this.state.language=lang; 
            document.getElementById('languageSelect').value=lang;
        } catch(e) { console.error(e); }
    },
    initEventListeners() { 
        document.getElementById('darkModeToggle').onclick=()=>{ 
            const isDark=document.documentElement.classList.toggle('dark'); 
            localStorage.setItem('darkMode',isDark); 
            document.getElementById('darkModeToggle').innerText=isDark?'☀️':'🌙'; 
        }; 
        document.getElementById('soundToggle').onclick=()=>{ 
            this.state.soundEnabled=!this.state.soundEnabled; 
            localStorage.setItem('soundEnabled',this.state.soundEnabled); 
            document.getElementById('soundToggle').innerText=this.state.soundEnabled?'🔊':'🔇'; 
            if(this.state.soundEnabled) this.playSound('correct'); 
        }; 
        document.getElementById('languageSelect').onchange=(e)=>{ 
            const newLang = e.target.value;
            localStorage.setItem('language', newLang);
            this.applyLanguage(newLang);
        };
        const exportHistoryBtn = document.getElementById('exportHistoryBtn');
        if (exportHistoryBtn) exportHistoryBtn.onclick = () => this.exportFullHistory();
    },
    generateCategories() { 
        const container=document.getElementById('categoriesContainer'); 
        if(!container) return;
        container.innerHTML='';
        const meta = {
            math:    { name:'Matemáticas',  icon:'functions', cls:'cat-math',  deco:'∑', desc:'Álgebra, geometría, lógica numérica' },
            culture: { name:'Cultura',       icon:'public',    cls:'cat-cult',  deco:'🌎', desc:'Venezuela: geografía, historia y símbolos' },
            history: { name:'Historia',      icon:'history',   cls:'cat-hist',  deco:'🏛', desc:'Grandes eventos de la humanidad' },
            logic:   { name:'Razonamiento',  icon:'psychology',cls:'cat-logic', deco:'⚡', desc:'Secuencias, silogismos y puzzles' }
        };
        Object.keys(this.questionsBank).forEach(cat => {
            const m = meta[cat];
            const btn = document.createElement('button');
            btn.className = `cat-card ${m.cls}`;
            btn.setAttribute('aria-label', `Categoría ${m.name}`);
            btn.innerHTML = `
                <span class="cat-deco">${m.deco}</span>
                <div class="cat-content">
                    <div class="cat-icon">
                        <span class="material-symbols-outlined">${m.icon}</span>
                    </div>
                    <div class="cat-name">${m.name}</div>
                    <div class="cat-desc">${m.desc}</div>
                    <span class="cat-tag">${this.questionsBank[cat].length} preguntas</span>
                </div>
            `;
            btn.onclick = () => app.selectCategory(cat);
            container.appendChild(btn);
        });
        // Pad to next line with dummy reference if needed
        const old_fn_start = true; // marker to not remove this block
        if(false) {
            let btn=document.createElement('button'); 
            
            let colClass = '';
            let gradientClass = '';
            let decoratorHtml = '';
            
            switch(cat) {
                case 'math':
                    colClass = 'md:col-span-2 md:row-span-2 min-h-[340px]';
                    gradientClass = 'cat-math-gradient';
                    decoratorHtml = `
                        <div class="mt-4 p-4 bg-blue-950/15 border border-blue-500/10 w-full rounded-xl flex items-center justify-between text-xs text-blue-400">
                            <span>Matriz de análisis lineal activo</span>
                            <span class="font-tech text-[10px] px-2 py-0.5 bg-blue-500/10 rounded-full">ALG-01</span>
                        </div>
                    `;
                    break;
            }
        }
    },
    selectCategory(cat) { 
        this.closeTutor();
        this.state.aiExplained = false;
        this.state.category=cat; this.state.score=0; this.state.wrongAnswers=0; this.state.consecutiveHits=0; 
        this.state.questionIndex=0; this.state.currentLevel='Fácil'; this.state.canAnswer=true; this.state.gameInProgress=true; 
        this.state.usedJoker5050=false; this.state.usedJokerAudience=false; this.state.usedJokerTutor=false; this.state.timeLeft=this.state.maxTime; 
        if(this.state.timerInterval) clearInterval(this.state.timerInterval); 
        const numQ=parseInt(document.getElementById('numQuestionsSelect').value); 
        this.state.totalQuestions=Math.min(numQ,this.questionsBank[cat].length); 
        this.state.manualLevel=document.getElementById('manualLevelSelect').value; 
        let filtered=[...this.questionsBank[cat]]; 
        if(this.state.manualLevel!=='auto') filtered=filtered.filter(q=>q.level===this.state.manualLevel); 
        if(filtered.length<this.state.totalQuestions) filtered=[...this.questionsBank[cat]]; 
        this.state.shuffledQuestions=filtered.sort(()=>Math.random()-0.5).slice(0,this.state.totalQuestions); 
        this.updateLevelDisplay(); 
        document.getElementById('game-score').innerText='0';
        const scorePnl = document.getElementById('game-score-panel');
        if (scorePnl) scorePnl.innerText = '0';
        document.getElementById('live-correct').innerText='0'; 
        document.getElementById('live-wrong').innerText='0'; 
        document.getElementById('joker5050').disabled=false; 
        document.getElementById('jokerAudience').disabled=false; 
        document.getElementById('jokerTutor').disabled=false;
        this.showScreen('screen-game'); 
        this.renderQuestion(); 
    },
    updateLevelDisplay() { 
        const lvlEl = document.getElementById('game-level-indicator');
        // Map internal level key to translated name
        const levelMap = { 'Fácil':'level_easy', 'Normal':'level_normal', 'Difícil':'level_hard',
                           'Easy':'level_easy', 'Hard':'level_hard' };
        const lvlKey = levelMap[this.state.currentLevel] || 'level_normal';
        if (lvlEl) lvlEl.innerText = this.t(lvlKey);
        const sbTele = document.getElementById('sb-tele-text');
        const gamesWord = this.state.language === 'en' ? 'GAMES' : 'PARTIDAS';
        if (sbTele) sbTele.innerText = this.state.userStats.gamesPlayed + ' ' + gamesWord;
    },
    renderQuestion() { 
        if(this.state.questionIndex>=this.state.shuffledQuestions.length){ this.endGame(); return; } 
        if(this.state.timerInterval) clearInterval(this.state.timerInterval); 
        const qWrapper = document.getElementById('question-card-wrapper');
        if (qWrapper) {
            qWrapper.classList.remove('q-correct', 'q-shake');
        }
        const circle = document.getElementById('timerCircle'); 
        const text = document.getElementById('timerText'); 
        if (circle) { circle.classList.remove('timer-warning', 'timer-danger'); }
        if (text)   { text.classList.remove('text-amber-500', 'text-red-500'); }
        if(this.state.typewriterInterval) {
            clearInterval(this.state.typewriterInterval);
            this.state.typewriterInterval = null;
        }
        this.state.canAnswer=true; this.state.timeLeft=this.state.maxTime; 
        this.state.aiExplained = false;
        document.getElementById('jokerTutor').disabled = this.state.usedJokerTutor;
        
        const headerEl = document.getElementById('tutor-header-text');
        if (headerEl) headerEl.innerText = this.t('tutor_ready_header');
        
        const tutorContent = document.getElementById('tutor-content');
        if (tutorContent) {
            tutorContent.innerHTML = `<p style="font-style:italic;color:var(--text-400)">${this.t('tutor_ready')}</p>`;
        }
        this.updateTimerDisplay(); this.startTimer(); 
        const q=this.state.shuffledQuestions[this.state.questionIndex]; 
        document.getElementById('question-number').innerText=`${this.t('question_label')} ${this.state.questionIndex+1} ${this.t('question_of')} ${this.state.totalQuestions}`; 
        document.getElementById('question-text').innerText=q.q; 
        const progress=((this.state.questionIndex)/this.state.totalQuestions)*100; 
        document.getElementById('game-progress-fill').style.width=progress+'%'; 
        let options=[...q.a]; 
        options.sort(()=>Math.random()-0.5); 
        const container=document.getElementById('options-container'); 
        if(!container) return;
        container.innerHTML=''; 
        const letters = ['A', 'B', 'C', 'D'];
        options.forEach((opt, idx)=>{ 
            let btn=document.createElement('button'); 
            btn.className='opt-btn';
            btn.setAttribute('data-option', opt);
            btn.innerHTML = `<span class="opt-key">${letters[idx]}</span><span>${opt}</span>`;
            btn.onclick=()=>this.checkAnswer(opt,q.c); 
            container.appendChild(btn); 
        }); 
    },
    startTimer(){ 
        this.state.timerInterval=setInterval(()=>{ 
            if(!this.state.canAnswer) return; 
            if(this.state.timeLeft<=0){ 
                clearInterval(this.state.timerInterval); 
                this.checkAnswer('', this.state.shuffledQuestions[this.state.questionIndex].c); 
            } else { 
                this.state.timeLeft--; 
                this.updateTimerDisplay(); 
            } 
        },1000); 
    },
    updateTimerDisplay(){ 
        const circle=document.getElementById('timerCircle'); 
        const text=document.getElementById('timerText'); 
        const percent=this.state.timeLeft/this.state.maxTime; 
        const dasharray=276.46; 
        const offset=dasharray*(1-percent); 
        if(circle) circle.style.strokeDashoffset=offset; 
        if(text) text.innerText=this.state.timeLeft; 

        // Urgency timer states — applied to the SVG container parent
        const timerWrap = document.getElementById('question-card-wrapper');
        if (circle) {
            if (this.state.timeLeft <= 5) {
                circle.classList.add('timer-danger');
                circle.classList.remove('timer-warning');
            } else if (this.state.timeLeft <= 10) {
                circle.classList.add('timer-warning');
                circle.classList.remove('timer-danger');
            } else {
                circle.classList.remove('timer-warning', 'timer-danger');
            }
        }
    },
    async checkAnswer(selected,correct, delegated = false){ 
        if(!this.state.canAnswer) return; 
        this.state.canAnswer=false; 
        if(this.state.timerInterval) clearInterval(this.state.timerInterval); 
        const isCorrect=(selected===correct); 
        
        // Animate card based on correctness
        const qWrapper = document.getElementById('question-card-wrapper');
        if (qWrapper) {
            if (isCorrect) {
                qWrapper.classList.add('animate-card-correct');
            } else {
                qWrapper.classList.add('animate-card-shake');
            }
        }

        if(this.state.soundEnabled) this.playSound(isCorrect?'correct':'wrong'); 
        if(navigator.vibrate) navigator.vibrate(isCorrect?50:200); 
        const btns=document.querySelectorAll('.opt-btn'); 
        btns.forEach(btn=>{ 
            btn.disabled=true; 
            const btnOpt = btn.getAttribute('data-option');
            if(btnOpt===correct) btn.classList.add('correct'); 
            else if(btnOpt===selected && !isCorrect) btn.classList.add('wrong'); 
        }); 
        if(isCorrect){ 
            if (delegated) {
                this.state.consecutiveHits=0;
                if(qWrapper) qWrapper.classList.add('q-correct');
                this.showFeedback(true, this.t('feedback_delegated'));
            } else {
                this.state.score++; this.state.consecutiveHits++; 
                document.getElementById('game-score').innerText=this.state.score;
                const scorePnl = document.getElementById('game-score-panel');
                if(scorePnl) scorePnl.innerText = this.state.score;
                document.getElementById('live-correct').innerText=this.state.score; 
                let newLevel=this.calculateAdaptiveLevel(); 
                this.state.currentLevel=newLevel; 
                this.updateLevelDisplay(); 
                if(qWrapper) qWrapper.classList.add('q-correct');
                this.showFeedback(true); 
            }
        } else { 
            this.state.wrongAnswers++; this.state.consecutiveHits=0; 
            document.getElementById('live-wrong').innerText=this.state.wrongAnswers; 
            if(qWrapper) qWrapper.classList.add('q-shake');
            this.showFeedback(false); 
        } 
        setTimeout(()=>{ this.closeTutor(); this.state.questionIndex++; this.renderQuestion(); },1500); 
    },
    calculateAdaptiveLevel(){ 
        if(this.state.manualLevel!=='auto') return this.state.manualLevel; 
        let streak=this.state.consecutiveHits; 
        let accuracy=this.state.score/(this.state.score+this.state.wrongAnswers+0.001); 
        let timeBonus=(this.state.timeLeft/this.state.maxTime)>0.5?1:0; 
        let score=streak + (accuracy>0.7?2:0) + timeBonus; 
        // Always store internal Spanish key for consistent data; display via t()
        if(score>=5) return 'Difícil'; 
        else if(score>=3) return 'Normal'; 
        else return 'Fácil'; 
    },
    showFeedback(isCorrect, customText = null){ 
        const overlay=document.getElementById('feedback-overlay'); 
        const icon=document.getElementById('feedback-icon'); 
        const text=document.getElementById('feedback-text'); 
        const circle=document.getElementById('feedback-circle'); 
        if(!overlay) return;
        if(isCorrect){ 
            icon.innerText='check_circle'; 
            icon.style.color='#10B981'; 
            text.innerText=customText || '¡Correcto!'; 
            circle.style.borderColor='#10B981'; 
        } 
        else { 
            icon.innerText='cancel'; 
            icon.style.color='#EF4444'; 
            text.innerText=customText || 'Incorrecto'; 
            circle.style.borderColor='#EF4444'; 
        } 
        overlay.style.opacity='1'; 
        setTimeout(()=>overlay.style.opacity='0',1200); 
    },
    playSound(type){ 
        try {
            const audioCtx=new (window.AudioContext||window.webkitAudioContext)(); 
            const osc=audioCtx.createOscillator(); 
            const gain=audioCtx.createGain(); 
            osc.connect(gain); gain.connect(audioCtx.destination); 
            osc.type='sine'; osc.frequency.value=type==='correct'?880:440; 
            gain.gain.value=0.1; osc.start(); 
            gain.gain.exponentialRampToValueAtTime(0.00001,audioCtx.currentTime+0.5); 
            osc.stop(audioCtx.currentTime+0.5); 
        } catch(e) { console.warn("Audio no soportado"); }
    },
    useFiftyFifty(){ 
        if(this.state.usedJoker5050) return; 
        this.state.usedJoker5050=true; 
        document.getElementById('joker5050').disabled=true; 
        this.playSound('correct'); 
        
        const q = this.state.shuffledQuestions[this.state.questionIndex];
        const btns = Array.from(document.querySelectorAll('.opt-btn'));
        const incorrectBtns = btns.filter(btn => btn.getAttribute('data-option') !== q.c);
        
        // Pick 2 random incorrect buttons to hide
        const shuffledIncorrects = incorrectBtns.sort(() => Math.random() - 0.5);
        const toHide = shuffledIncorrects.slice(0, 2);
        toHide.forEach(btn => {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        });
    },
    useAudience(){ 
        if(this.state.usedJokerAudience) return; 
        this.state.usedJokerAudience=true; 
        document.getElementById('jokerAudience').disabled=true; 
        this.playSound('correct');
        
        const btns = Array.from(document.querySelectorAll('.opt-btn')).filter(btn => btn.style.opacity !== '0');
        if(btns.length){ 
            const q = this.state.shuffledQuestions[this.state.questionIndex];
            
            // Generate percentages
            const correctPct = Math.floor(Math.random() * 21) + 55; // 55 to 75
            const remaining = 100 - correctPct;
            
            let pcts = [];
            const incorrectCount = btns.length - 1;
            if (incorrectCount > 0) {
                if (incorrectCount === 1) {
                    pcts = [remaining];
                } else {
                    let sum = 0;
                    const vals = Array.from({length: incorrectCount}, () => Math.random());
                    const valSum = vals.reduce((a, b) => a + b, 0);
                    const integerVals = vals.map(v => Math.round((v / valSum) * remaining));
                    const currentSum = integerVals.reduce((a, b) => a + b, 0);
                    integerVals[0] += (remaining - currentSum);
                    pcts = integerVals;
                }
            }
            
            let incorrectIdx = 0;
            btns.forEach(btn => {
                const optVal = btn.getAttribute('data-option');
                let pct = 0;
                if (optVal === q.c) {
                    pct = correctPct;
                } else {
                    pct = pcts[incorrectIdx++];
                }
                
                // Create percentage label
                const pctSpan = document.createElement('span');
                pctSpan.className = 'audience-pct';
                pctSpan.style.marginLeft = 'auto';
                pctSpan.style.fontFamily = "'JetBrains Mono', monospace";
                pctSpan.style.fontWeight = '700';
                pctSpan.style.color = optVal === q.c ? 'var(--success)' : 'var(--text-400)';
                pctSpan.style.fontSize = '12px';
                pctSpan.innerText = `${pct}%`;
                btn.appendChild(pctSpan);
                
                // Add indicator progress bar
                const bar = document.createElement('div');
                bar.className = 'audience-bar';
                bar.style.position = 'absolute';
                bar.style.left = '0';
                bar.style.top = '0';
                bar.style.bottom = '0';
                bar.style.width = `${pct}%`;
                bar.style.background = optVal === q.c ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)';
                bar.style.zIndex = '0';
                bar.style.pointerEvents = 'none';
                btn.style.position = 'relative';
                
                Array.from(btn.children).forEach(child => {
                    if (child !== bar) child.style.position = 'relative';
                });
                btn.appendChild(bar);
                
                if (optVal === q.c) {
                    btn.style.borderColor = 'rgba(34,197,94,0.4)';
                    btn.style.boxShadow = '0 0 15px rgba(34,197,94,0.15)';
                }
            });
        } 
    },
    openTutor() {
        const drawer = document.getElementById('ai-tutor-drawer');
        if (drawer) drawer.classList.add('open');
        if (this.state.aiExplained) return;
        
        this.state.aiExplained = true;
        this.state.usedJokerTutor = true;
        document.getElementById('jokerTutor').disabled = true;
        
        const q = this.state.shuffledQuestions[this.state.questionIndex];
        const explanation = this.aiExplanations[q.q] || "Analizando el problema lógico del quizz. La solución se basa en resolver el enunciado usando lógica inductiva o deducción formal.";
        
        const headerEl = document.getElementById('tutor-header-text');
        if (headerEl) headerEl.innerText = this.t('tutor_analyzing');
        
        const contentEl = document.getElementById('tutor-content');
        if (contentEl) {
            contentEl.innerHTML = `<div style="color:var(--text-400);display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-spinner animate-spin" style="font-size:16px;"></i><span>${this.t('tutor_analyzing_msg')}</span></div>`;
            setTimeout(() => {
                if (headerEl) headerEl.innerText = this.t('tutor_explanation');
                this.typewriter(contentEl, explanation);
            }, 800);
        }
    },
    closeTutor() {
        const drawer = document.getElementById('ai-tutor-drawer');
        if (drawer) drawer.classList.remove('open');
    },
    typewriter(element, text, speed = 15) {
        if (this.state.typewriterInterval) clearInterval(this.state.typewriterInterval);
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            element.innerHTML = text;
            return;
        }
        element.innerHTML = '';
        let i = 0;
        this.state.typewriterInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + '<span class="tw-cursor"></span>';
                i++;
            } else {
                element.innerHTML = text;
                clearInterval(this.state.typewriterInterval);
            }
        }, speed);
    },
    delegateToAI() {
        if (!this.state.canAnswer) return;
        this.state.canAnswer = false;
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);
        
        const headerEl = document.getElementById('tutor-header-text');
        if (headerEl) headerEl.innerText = this.t('tutor_delegating');
        
        const contentEl = document.getElementById('tutor-content');
        if (contentEl) {
            contentEl.innerHTML = `
                <div style="display:flex;flex-direction:column;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;font-weight:700;color:var(--blue-400);font-size:13px;">
                        <i class="ph-bold ph-spinner animate-spin" style="font-size:14px;"></i>
                        <span>${this.t('tutor_delegating_msg')}</span>
                    </div>
                    <p style="font-size:11px;color:var(--text-400);">${this.t('tutor_step1')}</p>
                    <p style="font-size:11px;color:var(--text-400);">${this.t('tutor_step2')}</p>
                </div>
            `;
        }
        setTimeout(() => {
            const q = this.state.shuffledQuestions[this.state.questionIndex];
            if (contentEl) {
                contentEl.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:8px;">
                        <p style="font-weight:700;color:var(--success);font-size:13px;">${this.t('tutor_done')}</p>
                        <p style="font-size:11px;color:var(--text-400);">${this.t('tutor_done_sub')}</p>
                    </div>
                `;
            }
            this.state.canAnswer = true;
            this.checkAnswer(q.c, q.c, true);
        }, 1500);
    },
    exportToTxt(){ 
        let content=`NeuroQuizz Resultados\nUsuario: ${this.state.userName}\nFecha: ${new Date().toLocaleString()}\nCategoría: ${this.state.category}\nAciertos: ${this.state.score}\nErrores: ${this.state.wrongAnswers}\nPrecisión: ${Math.round((this.state.score/(this.state.score+this.state.wrongAnswers))*100)}%\nPuntuación: ${this.state.score}\nNivel alcanzado: ${this.state.currentLevel}`; 
        const blob=new Blob([content],{type:'text/plain'}); 
        const a=document.createElement('a'); 
        a.href=URL.createObjectURL(blob); 
        a.download=`neuroquizz_${this.state.userName}.txt`; 
        a.click(); 
        URL.revokeObjectURL(a.href); 
    },
    exportFullHistory() {
        const stats = this.state.userStats;
        const history = stats.history;
        if (!history.length) { alert("No hay partidas registradas para exportar."); return; }
        const totalCorrect = stats.totalCorrect;
        const totalWrong = stats.totalWrong;
        const totalGames = stats.gamesPlayed;
        const bestScore = stats.bestScore;
        const avgAccuracy = totalGames > 0 ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0;
        let content = `=== NEUROQUIZZ - HISTORIAL COMPLETO ===\n`;
        content += `Usuario: ${this.state.userName || "Anónimo"}\n`;
        content += `Fecha de exportación: ${new Date().toLocaleString()}\n`;
        content += `\n--- RESUMEN GLOBAL ---\n`;
        content += `Partidas jugadas: ${totalGames}\n`;
        content += `Total aciertos: ${totalCorrect}\n`;
        content += `Total errores: ${totalWrong}\n`;
        content += `Mejor puntuación: ${bestScore}\n`;
        content += `Precisión media: ${avgAccuracy}%\n`;
        content += `\n--- LISTADO DE PARTIDAS (${history.length}) ---\n\n`;
        history.forEach((game, idx) => {
            let catName = game.category === 'math' ? 'Matemáticas' : game.category === 'culture' ? 'Cultura' : game.category === 'history' ? 'Historia' : 'Lógica';
            content += `Partida #${idx + 1}\n`;
            content += `  Fecha: ${game.date}\n`;
            content += `  Categoría: ${catName}\n`;
            content += `  Aciertos: ${game.score} / ${game.total}\n`;
            content += `  Precisión: ${game.accuracy}%\n`;
            content += `  Nivel alcanzado: ${game.level || 'N/A'}\n`;
            content += `  Puntuación obtenida: ${game.score}\n`;
            content += `--------------------------------\n\n`;
        });
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `neuroquizz_historial_${this.state.userName || "usuario"}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },
    endGame(){ 
        this.state.gameInProgress=false; 
        if(this.state.timerInterval) clearInterval(this.state.timerInterval);
        if(this.state.typewriterInterval) {
            clearInterval(this.state.typewriterInterval);
            this.state.typewriterInterval = null;
        }
        const accuracy=Math.round((this.state.score/(this.state.score+this.state.wrongAnswers))*100)||0; 
        document.getElementById('result-score').innerText=this.state.score; 
        // Translate level for display
        const levelMap = { 'Fácil':'level_easy', 'Normal':'level_normal', 'Difícil':'level_hard' };
        const lvlKey = levelMap[this.state.currentLevel] || 'level_normal';
        document.getElementById('result-level').innerText=this.t(lvlKey); 
        document.getElementById('result-correct').innerText=this.state.score; 
        document.getElementById('result-wrong').innerText=this.state.wrongAnswers; 
        document.getElementById('result-accuracy').innerText=accuracy+'%'; 
        let message = this.state.score>=25 ? this.t('msg_excellent') :
                      this.state.score>=20 ? this.t('msg_great') :
                      this.state.score>=15 ? this.t('msg_good') : this.t('msg_keep'); 
        document.getElementById('result-message').innerText=message; 
        this.state.userStats.gamesPlayed++; 
        this.state.userStats.totalCorrect+=this.state.score; 
        this.state.userStats.totalWrong+=this.state.wrongAnswers; 
        if(this.state.score>this.state.userStats.bestScore) this.state.userStats.bestScore=this.state.score; 
        this.state.userStats.history.push({category:this.state.category,score:this.state.score,total:this.state.totalQuestions,accuracy:accuracy,level:this.state.currentLevel,date:new Date().toLocaleDateString()}); 
        if(this.state.userStats.history.length>20) this.state.userStats.history=this.state.userStats.history.slice(-20); 
        this.saveUserStats(); 
        this.updateAllStats(); 
        this.showScreen('screen-results'); 
    },
    saveUserStats(){ localStorage.setItem('neuroquizz_user_stats',JSON.stringify(this.state.userStats)); },
    loadUserStats(){ const saved=localStorage.getItem('neuroquizz_user_stats'); if(saved) this.state.userStats=JSON.parse(saved); },
    updateAllStats(){ 
        const safeSet = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
        const avg = this.state.userStats.gamesPlayed > 0
            ? Math.round((this.state.userStats.totalCorrect / (this.state.userStats.totalCorrect + this.state.userStats.totalWrong)) * 100) : 0;
        const gamesWord = this.state.language === 'en' ? 'GAMES' : 'PARTIDAS';
        // Sidebar telemetry
        safeSet('sb-tele-text', this.state.userStats.gamesPlayed + ' ' + gamesWord);
        // Hero welcome stats
        safeSet('h-stat-games', this.state.userStats.gamesPlayed);
        safeSet('h-stat-avg',   avg + '%');
        safeSet('h-stat-best',  this.state.userStats.bestScore);
        // Category screen
        safeSet('quick-best-score', this.state.userStats.bestScore);
        safeSet('quick-avg-score',  avg + '%');
        // Stats screen
        safeSet('stats-total-games',  this.state.userStats.gamesPlayed);
        safeSet('stats-overall-avg',  avg + '%');
        safeSet('stats-best-ever',    this.state.userStats.bestScore);
        safeSet('stats-user-name',    this.state.userName || 'Usuario');
        // Result screen
        safeSet('result-total-games', this.state.userStats.gamesPlayed);
        // History list
        const hist = this.state.userStats.history;
        const container = document.getElementById('history-container');
        if(!container) { this.updateChart(); return; }
        if(hist.length === 0) {
            container.innerHTML = `<p style="color:var(--text-400);font-size:13px;text-align:center;padding:24px 0;">${this.t('hist_empty')}</p>`;
        } else {
            const catName = c => this.t('cat_' + c);
            container.innerHTML = hist.slice().reverse().map(g => `
                <div class="hist-item">
                    <div>
                        <p style="font-weight:700;font-size:12px;color:var(--text-100);margin-bottom:2px;">${catName(g.category)}</p>
                        <p style="font-size:10px;color:var(--text-400);font-family:'JetBrains Mono',monospace;">${g.date}</p>
                    </div>
                    <div style="display:flex;gap:16px;font-family:'JetBrains Mono',monospace;font-size:12px;">
                        <div style="text-align:center">
                            <p style="font-size:9px;color:var(--text-400);margin-bottom:2px;">${this.t('hist_correct')}</p>
                            <p style="font-weight:700;color:var(--success)">${g.score}/${g.total}</p>
                        </div>
                        <div style="text-align:center">
                            <p style="font-size:9px;color:var(--text-400);margin-bottom:2px;">${this.t('hist_accuracy')}</p>
                            <p style="font-weight:700;color:var(--orange-400)">${g.accuracy}%</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        this.updateChart();
    },
    updateChart(){ 
        const ctx=document.getElementById('progressChart')?.getContext('2d'); 
        if(!ctx) return; 
        const scores=this.state.userStats.history.slice(-5).map(g=>g.score); 
        if(window.progressChartInstance) window.progressChartInstance.destroy(); 
        
        // Orange → Blue gradient matching new theme
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(249, 115, 22, 0.75)');
        gradient.addColorStop(1, 'rgba(96, 165, 250, 0.12)');

        window.progressChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['#1','#2','#3','#4','#5'],
                datasets: [{
                    label: 'Puntuación',
                    data: scores,
                    backgroundColor: gradient,
                    borderColor: '#f97316',
                    borderWidth: 1.5,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        grid: { color: 'rgba(255,255,255,0.04)', borderColor: 'transparent' },
                        ticks: { color: '#64748b', font: { family: "'JetBrains Mono'", size: 10 } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#64748b', font: { family: "'JetBrains Mono'", size: 10 } }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#111318',
                        titleColor: '#f1f5f9',
                        bodyColor: '#f97316',
                        borderColor: 'rgba(255,255,255,0.08)',
                        borderWidth: 1, padding: 10,
                        displayColors: false,
                        bodyFont:  { family: "'JetBrains Mono'", size: 12 },
                        titleFont: { family: "'Inter'", size: 12, weight: 'bold' }
                    }
                }
            }
        }); 
    },
    showScreen(id){
        this.updateSidebarActiveState(id);
        const screens = ['screen-welcome','screen-categories','screen-game','screen-results','screen-statistics'];
        let currentActive = null;
        screens.forEach(s => {
            const el = document.getElementById(s);
            if (el && !el.classList.contains('hide')) currentActive = el;
        });
        if (currentActive && currentActive.id !== id) {
            currentActive.classList.remove('in');
            currentActive.classList.add('out');
            setTimeout(() => {
                currentActive.classList.add('hide');
                currentActive.classList.remove('out');
                this.activateScreen(id);
            }, 280);
        } else {
            this.activateScreen(id);
        }
    },
    updateSidebarActiveState(screenId) {
        const sbHome  = document.getElementById('sb-home');
        const sbStats = document.getElementById('sb-stats');
        if (sbHome)  sbHome.classList.toggle('active',  screenId !== 'screen-statistics');
        if (sbStats) sbStats.classList.toggle('active', screenId === 'screen-statistics');
    },
    activateScreen(id) {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('hide', 'out');
            void el.offsetWidth;
            el.classList.add('in');
        }
        window.scrollTo(0, 0);
    },
    initDynamicEffects() {
        // Cursor spotlight tracking for all .spotlight-card elements
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.spotlight-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });

            // Subtle parallax background neural wireframe shift
            const bgContainer = document.getElementById('neural-background-container');
            if (bgContainer) {
                const winW = window.innerWidth;
                const winH = window.innerHeight;
                const moveX = ((e.clientX - winW / 2) / winW) * 35;
                const moveY = ((e.clientY - winH / 2) / winH) * 35;
                bgContainer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            }
        });
    },
    showStats(){ this.updateAllStats(); this.showScreen('screen-statistics'); },
    goHome(){ if(this.state.gameInProgress && confirm(this.t('confirm_exit'))) this.resetAndGoHome(); else this.resetAndGoHome(); },
    resetAndGoHome(){ 
        this.state.gameInProgress=false; 
        this.showScreen('screen-welcome'); 
        if(this.state.timerInterval) clearInterval(this.state.timerInterval); 
        if(this.state.typewriterInterval) {
            clearInterval(this.state.typewriterInterval);
            this.state.typewriterInterval = null;
        }
    },
    goBackToWelcome(){ this.resetAndGoHome(); },
    confirmExitGame(){ if(this.state.gameInProgress && confirm(this.t('confirm_lose'))) this.resetAndGoHome(); else this.resetAndGoHome(); },
    resetAllData(){ if(confirm(this.t('confirm_reset'))){ this.state.userStats={gamesPlayed:0,totalCorrect:0,totalWrong:0,bestScore:0,currentStreak:0,history:[]}; this.saveUserStats(); this.updateAllStats(); this.goHome(); } },
    submitName(){ const input=document.getElementById('user-name-input'); if(!input.value.trim()) return alert(this.t('alert_name')); this.state.userName=input.value.trim(); document.getElementById('display-name').innerText=this.state.userName; document.getElementById('header-user-name').innerText=this.state.userName; document.getElementById('result-name').innerText=this.state.userName; this.updateAllStats(); this.applyLanguage(this.state.language); this.showScreen('screen-categories'); }
};
window.onload=()=>app.init();
