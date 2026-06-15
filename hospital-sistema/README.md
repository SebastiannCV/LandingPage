# Hospital La Caleta — Sitio web institucional y Sistema ERP/CRM

Proyecto académico que simula la presencia digital del **Hospital La Caleta** (Chimbote, Áncash, Perú). Se compone de dos partes que comparten la misma identidad visual (azul institucional y celeste):

1. **Sitio público (web institucional)** — la página de cara al paciente y al ciudadano.
2. **Sistema interno ERP/CRM** — una plataforma de gestión a la que se entra mediante inicio de sesión.

Está construido únicamente con **HTML, CSS y JavaScript** (sin frameworks ni servidor). La persistencia de datos se logra con `localStorage` del navegador.

> **Nota:** Todos los datos del sistema interno (pacientes, encuestas, correos, indicadores) son **demostrativos**, no corresponden a información real de pacientes.

---

## Estructura de carpetas

```
proyecto/
│
├── index.html                  ← Sitio público (web institucional)
├── style.css
├── script.js
├── logo.png
├── foto1.jpg … foto5.jpg
├── BPM-Caleta.jpg
│
└── hospital-sistema/           ← Sistema interno ERP/CRM
    ├── login.html              ← Inicio de sesión
    ├── erp.html                ← Dashboard de gestión (ERP)
    ├── crm-pacientes.html      ← Gestión de pacientes
    ├── crm-email.html          ← Módulo de correos
    ├── crm-encuesta.html       ← Encuesta de satisfacción
    ├── crm-fidelizacion.html   ← Tablero de fidelización
    ├── sistema.css             ← Estilos del sistema
    └── sistema.js              ← Lógica compartida (Auth, Store, datos demo)
```

---

## Cómo ejecutar el proyecto

No requiere instalación ni servidor. Basta con abrir `index.html` en un navegador moderno (Chrome, Edge, Firefox).

Desde el sitio público se accede al sistema interno mediante el botón **"Acceso al sistema"**, ubicado en la barra de navegación, que lleva a `hospital-sistema/login.html`.

### Usuarios de demostración

El acceso al sistema es simulado. Las credenciales están definidas en `sistema.js`:

| Usuario     | Contraseña | Rol           |
|-------------|------------|---------------|
| `admin`     | `123456`   | Administrador |
| `recepcion` | `123456`   | Admisión      |
| `crm`       | `123456`   | CRM           |

Algunas acciones (como restaurar listas o reiniciar encuestas) solo están disponibles para el usuario **admin**.

---

## Parte 1 — Sitio público (web institucional)

Página informativa de una sola pantalla con desplazamiento. Incluye:

- Sección de presentación, indicadores y horarios de atención.
- **Servicios** y **Nosotros** con la historia y categoría del hospital.
- **Cartera de Servicios**: se abre en una ventana (modal) al pulsar el enlace del menú, mostrando los servicios centrales, especialidades médicas y servicios quirúrgicos.
- **Procesos**: ventana con el diagrama BPM del proceso de cita médica, sus pasos y explicación; la imagen del diagrama puede ampliarse a pantalla completa.
- **Estadísticas**: gráficos con datos referenciales del sector salud (Chart.js).
- Mapa de ubicación, datos de contacto y pie de página institucional.

---

## Parte 2 — Sistema interno ERP/CRM

Plataforma de gestión protegida por inicio de sesión. Si se intenta abrir cualquier página interna sin haber iniciado sesión, el sistema redirige automáticamente al login.

### Módulos

**Dashboard ERP (`erp.html`)**
Indicadores operativos del hospital. Incluye una fila de **"Indicadores CRM en vivo"** que muestra datos reales tomados de los módulos de Pacientes y Encuesta (total de pacientes, nuevos, encuestas respondidas y satisfacción promedio).

**Gestión de Pacientes (`crm-pacientes.html`)**
Permite registrar pacientes (nombre, DNI, edad, teléfono, correo y especialidad) y los lista en una tabla. Incluye validaciones: DNI de 8 dígitos, teléfono de 9 dígitos, y al menos un medio de contacto (teléfono o correo). Parte de una lista base de pacientes y se le pueden añadir nuevos. El administrador puede restaurar la lista inicial.

**Módulo de Correos (`crm-email.html`)**
Permite redactar y "enviar" correos (envío simulado) a los pacientes registrados que tengan correo, usando plantillas predefinidas. Mantiene una bandeja de correos enviados.

**Encuesta de Satisfacción (`crm-encuesta.html`)**
Formulario interactivo con calificación por estrellas (5 preguntas), una pregunta de recomendación (sí/no) y un comentario opcional. Puede asociarse a un paciente registrado o responderse de forma anónima. Muestra los resultados acumulados (promedios, % de recomendación, comentarios). El administrador puede reiniciar las encuestas.

**Tablero de Fidelización (`crm-fidelizacion.html`)**
Reúne en un solo panel los datos reales de Encuesta y Pacientes: satisfacción promedio, % de recomendación, segmentación de pacientes (nuevos vs. existentes) y distribución por especialidad.

---

## Persistencia de datos (punto clave)

Los datos que el usuario genera **no se pierden** al cerrar la pestaña, cerrar sesión o cerrar el navegador. Esto se logra guardándolos en el **`localStorage`** del navegador, a través de un objeto auxiliar llamado `Store` definido en `sistema.js` (con respaldo en memoria por si `localStorage` no estuviera disponible).

Cada módulo guarda su información bajo una clave propia:

| Dato                     | Clave en localStorage |
|--------------------------|-----------------------|
| Pacientes registrados    | `lc_pacientes`        |
| Encuestas respondidas    | `lc_encuestas`        |
| Correos enviados         | `lc_enviados`         |
| Sesión activa            | `lc_session`          |

### Cómo comprobar la persistencia

1. Iniciar sesión (`admin` / `123456`).
2. En **Pacientes**, registrar un paciente nuevo.
3. En **Encuesta**, responder una o más encuestas.
4. Cerrar sesión (o cerrar el navegador) y volver a entrar.
5. Verificar que los pacientes y encuestas **siguen ahí**, y que el **Dashboard** y **Fidelización** reflejan esos datos.

> Los módulos están **conectados entre sí**: un paciente registrado aparece luego como posible destinatario en Correos y como opción en la Encuesta, y se contabiliza en el Dashboard y en Fidelización.

---

## Tecnologías utilizadas

- **HTML5** — estructura de las páginas.
- **CSS3** — diseño, modales y diseño responsivo.
- **JavaScript** — interactividad y lógica de los módulos.
- **localStorage** — persistencia de datos en el navegador.
- **Chart.js** — gráficos del dashboard y los tableros.
- **Font Awesome** — iconografía del sitio público.

---

## Créditos

Proyecto académico desarrollado con fines educativos. Hospital La Caleta — Chimbote, Áncash, Perú.