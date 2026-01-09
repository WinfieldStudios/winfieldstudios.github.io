(() => {
  const canvas = document.getElementById("game");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // --- Input ---
  const keys = new Set();
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
    keys.add(e.key);
  });
  window.addEventListener("keyup", (e) => keys.delete(e.key));

  // --- Game state ---
  const player = {
    x: W / 2,
    y: H / 2,
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
    ctx.clearRect(0, 0, W, H);

    // subtle floor grid (optional but helps)
    ctx.globalAlpha = 0.18;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    ctx.fill();

    // UI text
    ctx.clearRect(0,0,0,0); // no-op, just keeping it simple
    ctx.save();
    ctx.font = "16px Open Sans, sans-serif";
    ctx.fillText(`x: ${player.x.toFixed(0)}  y: ${player.y.toFixed(0)}`, 12, 24);
    ctx.restore();
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
