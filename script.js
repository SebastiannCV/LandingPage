// ── Sombra en nav al hacer scroll ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 40
    ? '0 4px 16px rgba(0,0,0,0.4)'
    : 'none';
});

// ── Animación al aparecer elementos ──
const items = document.querySelectorAll(
  '.card, .chart-box, .espec-item, .horario-item, .barra-item, .bpm-step, .mapa-dato'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

items.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── BPM: abrir imagen al hacer clic ──
const bpmImgWrap = document.getElementById('bpmImgWrap');
if (bpmImgWrap) {
  bpmImgWrap.addEventListener('click', () => {
    openBPMModal();
  });
}

function openBPMModal() {
  const modal = document.getElementById('bpmModal');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBPMModal() {
  const modal = document.getElementById('bpmModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function toggleBPMZoom() {
  openBPMModal();
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBPMModal();
});

// ── Colores para gráficos ──
const azul        = '#1a3a6b';
const celeste     = '#00aeef';
const celesClaro  = '#7dd4f5';
const celesMin    = '#b3e5fc';

// ── Gráfico 1: Barras — atenciones mensuales ──
new Chart(document.getElementById('chartAtenciones'), {
  type: 'bar',
  data: {
    labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    datasets: [{
      label: 'Atenciones',
      data: [3200,2980,3450,3100,3600,3300,3750,3500,3200,3800,3600,3100],
      backgroundColor: celeste,
      borderRadius: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#eef4fa' },
        ticks: { font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      }
    }
  }
});

// ── Gráfico 2: Dona — distribución por servicio ──
new Chart(document.getElementById('chartServicios'), {
  type: 'doughnut',
  data: {
    labels: ['Consulta Externa','Emergencia','Hospitalización','Cirugía','Laboratorio'],
    datasets: [{
      data: [42, 25, 15, 10, 8],
      backgroundColor: [azul, celeste, celesClaro, celesMin, '#e0f5fd'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 10 },
          boxWidth: 12,
          padding: 8
        }
      }
    }
  }
});

// ── Gráfico 3: Barras horizontales — género ──
new Chart(document.getElementById('chartGenero'), {
  type: 'bar',
  data: {
    labels: ['Femenino', 'Masculino', 'Sin especificar'],
    datasets: [{
      label: 'Pacientes',
      data: [22400, 17800, 1200],
      backgroundColor: [azul, celeste, celesClaro],
      borderRadius: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: '#eef4fa' },
        ticks: { font: { size: 10 } }
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      }
    }
  }
});

// ── Gráfico 4: Línea — cirugías por trimestre ──
new Chart(document.getElementById('chartCirugias'), {
  type: 'line',
  data: {
    labels: ['T1-22','T2-22','T3-22','T4-22','T1-23','T2-23','T3-23','T4-23','T1-24','T2-24','T3-24','T4-24'],
    datasets: [{
      label: 'Cirugías',
      data: [210,245,230,260,280,265,290,310,295,320,335,350],
      borderColor: celeste,
      backgroundColor: 'rgba(0,174,239,0.08)',
      pointBackgroundColor: azul,
      tension: 0.3,
      fill: true,
      pointRadius: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: '#eef4fa' },
        ticks: { font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 9 } }
      }
    }
  }
});
