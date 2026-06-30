import "../css/ScrollingBackground.css";

function ScrollingBackground() {
  // Generate random starting positions and animation properties for cinematic dust particles
  const dustParticles = Array.from({ length: 25 }).map((_, i) => ({
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 120}vh`,
    animationDelay: `${Math.random() * 15}s`,
    animationDuration: `${12 + Math.random() * 15}s`,
  }));

  return (
    <div className="global-scrolling-bg">
      {/* Ambient drifting cinematic orbs */}
      <div className="ambient-light light-blue"></div>
      <div className="ambient-light light-purple"></div>
      <div className="ambient-light light-pink"></div>
      
      {/* Cinematic floating dust/particles */}
      <div className="particles-container">
        {dustParticles.map((style, idx) => (
          <div key={idx} className="particle" style={style}></div>
        ))}
      </div>

      {/* Subtle vignette mask to deepen the edges */}
      <div className="bg-overlay-mask" />
    </div>
  );
}

export default ScrollingBackground;
