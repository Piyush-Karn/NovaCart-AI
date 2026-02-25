/* ── PARTICLES SYSTEM (Premium Stardust) ─────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const PARTICLE_COUNT = 80; // Slightly more, but smaller

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.2 + 0.2; // Tiny particles
    this.vx = (Math.random() - 0.5) * 0.15; // Move very slowly
    this.vy = (Math.random() - 0.5) * 0.15;
    this.alpha = Math.random() * 0.3 + 0.05; // Faint
    this.pulse = Math.random() * Math.PI * 2;
  };

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.pulse += 0.01;
      const pAlpha = p.alpha + Math.sin(p.pulse) * 0.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, pAlpha)})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', resize);
})();