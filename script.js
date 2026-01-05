let rotation = 0;
const premios = 6; // Número de segmentos
const transitionTime = 4000; // 4 segundos

function spin() {
  // Elegir un premio aleatorio
  const indice = Math.floor(Math.random() * premios);

  // Calcular ángulo final
  const angulo = 360 * 4 + indice * (360 / premios) + Math.random() * (360 / premios);
  rotation += angulo;

  // Aplicar la rotación
  document.getElementById("wheel").style.transform = `rotate(${rotation}deg)`;

  // Mostrar premio después de la animación
  setTimeout(() => {
    alert(`¡Ganaste: Premio ${indice + 1}!`);
  }, transitionTime);
}

// Giro automático por tip
window.addEventListener("message", (event) => {
  const data = event.data;
  const montoDeseado = 100; // Cambia esto por el monto que quieras
  if (data.type === "tip" && data.amount >= montoDeseado) {
    spin();
  }
});
