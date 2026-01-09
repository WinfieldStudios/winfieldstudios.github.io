(() => {
  const terminal = document.getElementById('terminal');
  const statusEl = document.getElementById('gameStatus');

  if (!terminal || !statusEl) return;

  // Terminal focus so arrow keys work immediately.
  terminal.focus();

  const W = 28;
  const H = 22;

  // Simple fixed obstacles (feel free to delete these later).
  const obstacles = new Set([
    '6,5', '7,5', '8,5', '9,5', '10,5',
    '18,9', '18,10', '18,11',
    '12,15', '13,15', '14,15', '15,15'
  ]);

  const player = {
    x: Math.floor(W / 2),
    y: Math.floor(H / 2)
  };

  function isWall(x, y) {
    return x === 0 || y === 0 || x === W - 1 || y === H - 1;
  }

  function isBlocked(x, y) {
    if (isWall(x, y)) return true;
    return obstacles.has(`${x},${y}`);
  }

  function render() {
    const lines = [];

    for (let y = 0; y < H; y++) {
      let line = '';
      for (let x = 0; x < W; x++) {
        if (x === player.x && y === player.y) {
          line += '@';
          continue;
        }

        if (isWall(x, y)) {
          line += '#';
          continue;
        }

        if (obstacles.has(`${x},${y}`)) {
          line += 'M'; // mushroom
          continue;
        }

        line += '.';
      }
      lines.push(line);
    }

    lines.push('');
    lines.push('Legend: @ you | # wall | M mushroom');

    terminal.textContent = lines.join('\n');
    statusEl.textContent = `Pos: (${player.x}, ${player.y})`;
  }

  function move(dx, dy) {
    const nx = player.x + dx;
    const ny = player.y + dy;
    if (isBlocked(nx, ny)) return;
    player.x = nx;
    player.y = ny;
    render();
  }

  function keyToDelta(key) {
    switch (key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        return [0, -1];
      case 'ArrowDown':
      case 's':
      case 'S':
        return [0, 1];
      case 'ArrowLeft':
      case 'a':
      case 'A':
        return [-1, 0];
      case 'ArrowRight':
      case 'd':
      case 'D':
        return [1, 0];
      default:
        return null;
    }
  }

  document.addEventListener('keydown', (e) => {
    const delta = keyToDelta(e.key);
    if (!delta) return;

    // Prevent the page from scrolling when using arrow keys.
    e.preventDefault();
    move(delta[0], delta[1]);
  });

  // Ensure clicking the terminal focuses it.
  terminal.addEventListener('mousedown', () => terminal.focus());

  render();
})();
