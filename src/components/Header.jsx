import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [rays, setRays] = useState(false);

  useEffect(() => {
    setTimeout(() => setRays(true), 300);
  }, []);

  return (
    <header className="site-header">
      <div className="header-bg" />
      <div className={`sun-container ${rays ? "rays-active" : ""}`}>
        <div className="sun-rays">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="ray" style={{ "--i": i }} />
          ))}
        </div>
        <div className="sun-core">
          <span className="sun-symbol">☀</span>
        </div>
        <div className="sun-halo" />
      </div>
      <div className="header-content">
        <p className="header-eyebrow">Les Enfants de la Lumière</p>
        <h1 className="header-title">CULTE DU SOLEIL</h1>
        <p className="header-subtitle">
          <em>"Le Soleil ne ment jamais. Tout ce qu'il éclaire devient vérité."</em>
        </p>
        <div className="header-divider">
          <span className="divider-line" />
          <span className="divider-glyph">✦</span>
          <span className="divider-line" />
        </div>
        <nav className="header-nav">
          {["lore", "oracle", "quiz", "reaction", "voies", "lumiere"].map((id) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
