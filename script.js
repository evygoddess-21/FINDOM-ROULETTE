const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const center = canvas.width / 2;
let rotation = 0;

// Cambia aquí tus premios
const premios = ["Premio 1", "Premio 2", "Premio 3", "Premio 4", "Premio 5", "Premio 6"];
const colores = ["#FF5C5C","#FFD93D","#6BFF95","#4DABFF","#B56BFF","#FF6BD6"];
const segmentos = premios.length;

// Dibujar ruleta con premios
function drawWheel() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const anguloSegmento = (2*Math.PI) / segmentos;

  for (let i=0; i<segmentos; i++) {
    const start = i*anguloSegmento;
    const end = start + anguloSegmento;

    // Color
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, start, end);
    ctx.fillStyle = colores[i%colores.length];
    ctx.fill();
    ctx.closePath();

    // Texto del premio
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(start + anguloSegmento/2);
    ctx.textAlign = "right";
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(premios[i], center - 10, 5);
    ctx.restore();
  }
}

// Giro suave
function spin() {
  const indice = Math.floor(Math.random() * segmentos);
  const angulo = indice*(360/segmentos) + Math.random()*(360/segmentos);
  rotation += 1440 + angulo;

  let start = null;
  const duration = 4000;

  function animate(timestamp){
    if (!start) start = timestamp;
    const progress = Math.min((timestamp-start)/duration,1);
    const angle = rotation * easeOutCubic(progress) * Math.PI/180;

    ctx.save();
    ctx.translate(center,center);
    ctx.rotate(angle);
    ctx.translate(-center,-center);
    drawWheel();
    ctx.restore();

    if(progress<1){
      requestAnimationFrame(animate);
    } else {
      alert(`¡Ganaste: ${premios[indice]}!`);
    }
  }
  requestAnimationFrame(animate);
}

function easeOutCubic(t){return (--t)*t*t+1;}

drawWheel();

// Giro automático por tip
window.addEventListener("message", (event)=>{
  const data = event.data;
  const montoDeseado = 100; // Cambia este valor por el monto de tokens que quieras
  if(data.type === "tip" && data.amount >= montoDeseado){
    spin();
  }
});
