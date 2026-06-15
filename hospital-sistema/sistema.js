/* =====================================================
   Hospital La Caleta — Sistema ERP / CRM (DEMO)
   Lógica compartida: autenticación simulada, almacenamiento
   y datos de demostración.
   NOTA: Todos los datos son DEMOSTRATIVOS (no reales).
   ===================================================== */

/* ---- Almacenamiento robusto (funciona en GitHub Pages y en
   vistas previas sin localStorage, con respaldo en memoria) ---- */
const Store = (() => {
  let mem = {};
  let ok = true;
  try {
    const k = '__lc_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
  } catch (e) { ok = false; }
  return {
    get(k) { try { return ok ? localStorage.getItem(k) : (mem[k] ?? null); } catch (e) { return mem[k] ?? null; } },
    set(k, v) { try { ok ? localStorage.setItem(k, v) : (mem[k] = v); } catch (e) { mem[k] = v; } },
    del(k) { try { ok ? localStorage.removeItem(k) : (delete mem[k]); } catch (e) { delete mem[k]; } }
  };
})();

/* ---- Usuarios de demostración ---- */
const DEMO_USERS = [
  { user: 'admin',     pass: '123456', nombre: 'Dirección General', rol: 'Administrador' },
  { user: 'recepcion', pass: '123456', nombre: 'María Quiroz',       rol: 'Admisión' },
  { user: 'crm',       pass: '123456', nombre: 'Equipo Fidelización', rol: 'CRM' }
];

/* ---- Autenticación ---- */
const Auth = {
  login(user, pass) {
    const found = DEMO_USERS.find(u => u.user === user.trim() && u.pass === pass);
    if (!found) return false;
    Store.set('lc_session', JSON.stringify({
      user: found.user, nombre: found.nombre, rol: found.rol, ts: Date.now()
    }));
    return true;
  },
  current() {
    try { return JSON.parse(Store.get('lc_session')); } catch (e) { return null; }
  },
  logout() {
    Store.del('lc_session');
    window.location.href = 'login.html';
  },
  /* Protege las páginas internas; redirige al login si no hay sesión */
  require() {
    const s = this.current();
    if (!s) { window.location.href = 'login.html'; return null; }
    return s;
  }
};

/* ---- Pinta el usuario en la barra superior ---- */
function renderUserChip() {
  const s = Auth.current();
  if (!s) return;
  const ini = s.nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  document.querySelectorAll('[data-avatar]').forEach(el => el.textContent = ini);
  document.querySelectorAll('[data-username]').forEach(el => el.textContent = s.nombre);
  document.querySelectorAll('[data-userrole]').forEach(el => el.textContent = s.rol);
}

/* ---- Sidebar móvil ---- */
function initSidebar() {
  const sb = document.querySelector('.sidebar');
  const bd = document.querySelector('.backdrop');
  document.querySelectorAll('[data-menu-toggle]').forEach(btn =>
    btn.addEventListener('click', () => {
      sb && sb.classList.toggle('open');
      bd && bd.classList.toggle('show');
    })
  );
  bd && bd.addEventListener('click', () => {
    sb.classList.remove('open'); bd.classList.remove('show');
  });
}

/* ---- Toast ---- */
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = '✓ ' + msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 2800);
}

/* =====================================================
   DATOS DE DEMOSTRACIÓN (no reales)
   ===================================================== */
const DEMO = {
  /* Plantillas de correo del CRM */
  plantillas: {
    'Recordatorio de cita':
      'Estimado(a) {nombre}:\n\nLe recordamos su cita en el servicio de {espec} en el Hospital La Caleta. Por favor, preséntese 20 minutos antes con su DNI.\n\nAtentamente,\nÁrea de Admisión — Hospital La Caleta',
    'Resultado disponible':
      'Estimado(a) {nombre}:\n\nLe informamos que sus resultados ya están disponibles. Puede recogerlos en módulo de Laboratorio, de lunes a sábado.\n\nHospital La Caleta — Chimbote',
    'Campaña preventiva':
      'Estimado(a) {nombre}:\n\nLo(a) invitamos a nuestra campaña gratuita de prevención. Cuidar su salud es nuestra prioridad.\n\nHospital La Caleta — MINSA / GORE Áncash',
    'Encuesta de satisfacción':
      'Estimado(a) {nombre}:\n\nGracias por confiar en nosotros. Nos gustaría conocer su opinión sobre la atención recibida en {espec}. Su respuesta nos ayuda a mejorar.\n\nGracias,\nEquipo de Fidelización — Hospital La Caleta'
  }
};

/* Paleta para Chart.js */
const COLORS = {
  azul: '#1a3a6b', azulO: '#122a52', cel: '#00aeef',
  celClaro: '#7dd4f5', celMin: '#b3e5fc', soft: '#e0f5fd'
};