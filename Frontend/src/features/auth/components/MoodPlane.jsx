import React, { useRef, useEffect } from "react";

const QUADRANT_COLORS = [
  "#ffb84d", // high valence, high energy — happy
  "#ff5c5c", // low valence, high energy — tense
  "#6c7bd9", // low valence, low energy — sad
  "#5ce1c4", // high valence, low energy — calm
];

const MoodPlane = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // axis lines
      ctx.strokeStyle = "rgba(242, 237, 228, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();

      // drifting mood point (lissajous-style wander)
      t += 0.006;
      const radius = Math.min(w, h) * 0.48;
      const x = cx + Math.cos(t * 1.3) * (radius * 1.3);
const y = cy + Math.sin(t) * (radius * 0.6);

      // quadrant color based on position
      const valence = x > cx ? 1 : 0;
      const energy = y < cy ? 1 : 0;
      const qIndex = valence === 1 && energy === 1 ? 0
        : valence === 0 && energy === 1 ? 1
        : valence === 0 && energy === 0 ? 2
        : 3;
      const color = QUADRANT_COLORS[qIndex];

      // trailing glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 60);
      grad.addColorStop(0, color + "55");
      grad.addColorStop(1, color + "00");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="mood-plane">
      <canvas ref={canvasRef} />
      <span className="mood-plane__label mood-plane__label--top">energetic</span>
      <span className="mood-plane__label mood-plane__label--bottom">calm</span>
      <span className="mood-plane__label mood-plane__label--left">low mood</span>
      <span className="mood-plane__label mood-plane__label--right">high mood</span>
    </div>
  );
};

export default MoodPlane;