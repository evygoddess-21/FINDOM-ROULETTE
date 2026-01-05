const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const center = canvas.width / 2;
let rotation = 0;

// Premios que quieres
const premios = ["555tk", "NO LUCKY PIG, TRY AGAIN", "666TK", "1000TK", "2000TK", "333TK", "DAY OFF", "444TK", "888TK", "222TK"  ];
const colores = ["#ff5c5c","#ffd93d","#6bff95","#4dabff","#b56bff","#ff6bd6"];
const segmento = 360 / premios.length;

// Dibujar la ruleta
function drawWheel() {
  for (let i = 0; i < premios.length; i++) {
    const start = (segmento * i - 90) * Math.PI / 180;
    const end = (segmento * (i + 1) - 90) * Math.PI / 180;

    // Color de segmento
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, start, end);
    ctx.fillStyle = colores[i % colores.length];
    ctx.fill();
    ctx.closePath();

    // Texto del premio
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((start + end) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(premios[i], center - 10, 5);
    ctx.restore();
  }
}

// Animar el giro
function spin() {
  const indice = Math.floor(Math.random() * premios.length);
  const angulo = indice * segmento + Math.random() * segmento;
  rotation += 1440 + angulo;

  let start = null;
  const duration = 4000; // 4 segundos

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const angle = rotation * easeOutCubic(progress);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-center, -center);
    drawWheel();
    ctx.restore();
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      alert(`¡Ganaste: ${premios[indice]}!`);
    }
  }
  requestAnimationFrame(animate);
}

// Easing para giro suave
function easeOutCubic(t) { return (--t)*t*t+1; }

// Dibujar ruleta inicial
drawWheel();
