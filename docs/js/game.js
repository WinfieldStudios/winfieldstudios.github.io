(() => {
  const CANVAS = document.getElementById("game");
  if (!CANVAS) return;

  const CONTEXT = CANVAS.getContext("2d");
  const WIDTH = CANVAS.width;
  const HEIGHT = CANVAS.height;

  // --- Input ---
  const keys = new Set();
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
    keys.add(e.key);
  });
  window.addEventListener("keyup", (e) => keys.delete(e.key));

  // --- Game state ---
  const player = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    r: 16,
    speed: 260 // pixels per second
  };

  let last = performance.now();

  function update(dt) {
    let dx = 0, dy = 0;

    if (keys.has("ArrowUp") || keys.has("w") || keys.has("W")) dy -= 1;
    if (keys.has("ArrowDown") || keys.has("s") || keys.has("S")) dy += 1;
    if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) dx -= 1;
    if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) dx += 1;

    // normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      const inv = 1 / Math.sqrt(2);
      dx *= inv;
      dy *= inv;
    }

    player.x += dx * player.speed * dt;
    player.y += dy * player.speed * dt;

    // clamp to screen
    player.x = Math.max(player.r, Math.min(W - player.r, player.x));
    player.y = Math.max(player.r, Math.min(H - player.r, player.y));
  }

  function draw() {
    // background
    CONTEXT.clearRect(0, 0, WIDTH, HEIGHT);

    // subtle floor grid (optional but helps)
    CONTEXT.globalAlpha = 0.18;
    for (let x = 0; x < WIDTH; x += 40) {
      CONTEXT.beginPath();
      CONTEXT.moveTo(x, 0);
      CONTEXT.lineTo(x, HEIGHT);
      CONTEXT.stroke();
    }
    for (let y = 0; y < HEIGHT; y += 40) {
      CONTEXT.beginPath();
      CONTEXT.moveTo(0, y);
      CONTEXT.lineTo(WIDTH, y);
      CONTEXT.stroke();
    }
    CONTEXT.globalAlpha = 1;

    // player
    CONTEXT.beginPath();
    CONTEXT.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    CONTEXT.fill();

    // UI text
    CONTEXT.clearRect(0,0,0,0); // no-op, just keeping it simple
    CONTEXT.save();
    CONTEXT.font = "16px Open Sans, sans-serif";
    CONTEXT.fillText(`x: ${player.x.toFixed(0)}  y: ${player.y.toFixed(0)}`, 12, 24);
    CONTEXT.restore();
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    update(dt);
    draw();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
