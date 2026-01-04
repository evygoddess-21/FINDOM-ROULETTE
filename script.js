const prizes = [
  "Premio 1",
  "Premio 2",
  "Premio 3",
  "Premio Especial"
];

function spinWheel() {
  const wheel = document.getElementById("wheel");
  const result = document.getElementById("result");

  const angle = Math.floor(Math.random() * 360) + 720;
  wheel.style.transform = `rotate(${angle}deg)`;

  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  setTimeout(() => {
    result.textContent = prize;
  }, 3000);
}

window.addEventListener("message", e => {
  if (e.data === "SPIN") spinWheel();
});
