let rotation = 0;

function spin() {
  const extra = Math.floor(Math.random() * 360);
  rotation += 1440 + extra;
  document.getElementById("wheel").style.transform =
    `rotate(${rotation}deg)`;
}

// PRUEBA: girar con la tecla G
document.addEventListener("keydown", (e) => {
  if (e.key === "g") {
    spin();
  }
});
