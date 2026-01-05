let rotation = 0;

// CONEXIÓN WEBSOCKET
const socket = new WebSocket("WSS_DEL_LISTENER");

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "tip") {
    spin();
  }
};

function spin() {
  const extra = Math.floor(Math.random() * 360);
  rotation += 1440 + extra;
  document.getElementById("wheel").style.transform =
    `rotate(${rotation}deg)`;
}
