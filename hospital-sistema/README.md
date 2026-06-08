Sistema ERP / CRM — Hospital La Caleta (DEMO)
Mini-sistema modular estático (HTML/CSS/JS) que se integra al sitio del Hospital La Caleta.
No necesita servidor ni base de datos: funciona directo en GitHub Pages.

⚠️ Todos los datos (pacientes, indicadores, correos) son demostrativos, no reales.

Módulos
MóduloArchivoQué haceAccesologin.htmlLogin simulado (entrada al sistema)ERP — Dashboarderp.htmlTablero de gestión: camas, atenciones, inventario, cirugíasCRM — Correoscrm-email.htmlRedacción y envío simulado de correos a pacientes, con plantillasCRM — Fidelizacióncrm-fidelizacion.htmlRetención, satisfacción y segmentación de pacientesTemasistema.cssEstilos (paleta azul #1a3a6b + celeste #00aeef)Lógicasistema.jsAutenticación, almacenamiento y datos demo
Acceso de demostración

Usuario: admin · Contraseña: 123456
También: recepcion / crm (misma contraseña)

Subir a GitHub Pages

Sube toda la carpeta hospital-sistema/ a tu repositorio (junto a tu index.html).
En el repo: Settings → Pages → Branch: main → /(root) → Save.
La ruta quedará así:
https://TU-USUARIO.github.io/TU-REPO/hospital-sistema/login.html

Enlazar desde tu sitio público
Agrega este enlace en el <nav> de tu index.html (lista <ul>):
html<li><a href="hospital-sistema/login.html">Sistema ERP/CRM</a></li>
O un botón en el hero:
html<a href="hospital-sistema/login.html" class="btn">Acceso al Sistema</a>