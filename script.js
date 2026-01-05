let rotation = 0;

// Define los premios que quieres
const premios = [
  "555",
  "4444",
  "222",
  "111",
  "888",
  "1000"
];

// Cada segmento ocupa este ángulo (360 / cantidad de premios)
const segmento = 360 / premios.length;

function spin() {
  // Elegimos un premio aleatorio
  const indice = Math.floor(Math.random() * premios.length);

  // Calculamos el ángulo donde debe caer
  const angulo = indice * segmento + Math.random() * segmento;

  // Aumentamos la rotación total
  rotation += 1440 + angulo; // 1440 = 4 giros completos

  document.getElementById("wheel").style.transform =
    `rotate(${rotation}deg)`;

  // Mostrar qué premio salió después de la animación
  setTimeout(() => {
    alert(`¡Ganaste: ${premios[indice]}!`);
  }, 4000); // coincide con la duración de la animación
}
