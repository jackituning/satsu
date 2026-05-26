import { useState } from "react";
import "./Oracle.css";

const revelations = [
  "La lumière révèle tout. Même ce que tu refuses de voir.",
  "Le désert ment moins que les hommes. Apprends de son silence.",
  "Celui qui fuit la lumière fuit la vérité qu'elle porte en elle.",
  "Le Soleil juge sans parler. Son verdict est l'ombre ou la gloire.",
  "Observer est une forme de domination que les aveugles ne comprennent pas.",
  "Toute vérité brûle avant d'éclairer. C'est son droit sacré.",
  "Le chakra ne ment jamais. Seule la bouche le fait.",
  "L'élu n'est pas celui qui voit le Soleil, mais celui que le Soleil voit.",
  "Dans le désert, même les mensonges finissent par sécher.",
  "La tempête de sable efface les traces, mais pas les intentions.",
  "Chaque ombre que tu vois est un mensonge que le Soleil a refusé de cautionner.",
  "La vérité n'a pas besoin d'être dite. Elle se révèle d'elle-même.",
];

export default function Oracle({ onReveal }) {
  const [current, setCurrent] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const reveal = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    setCurrent(null);
    setTimeout(() => {
      const r = revelations[Math.floor(Math.random() * revelations.length)];
      setCurrent(r);
      setAnimKey(k => k + 1);
      setIsRevealing(false);
      onReveal?.();
    }, 600);
  };

  return (
    <section id="oracle" className="oracle-section">
      <div className="oracle-inner">
        <div className="section-header">
          <span className="section-tag">Parole du Soleil</span>
          <h2 className="section-title">L'Oracle</h2>
          <p className="section-desc">Interroge la lumière. Elle ne ment jamais.</p>
        </div>

        <div className="oracle-altar">
          <div className="altar-ring altar-ring-1" />
          <div className="altar-ring altar-ring-2" />
          <div className="altar-ring altar-ring-3" />

          <div className="oracle-eye">
            <div className="eye-outer" />
            <div className="eye-inner">
              <span className="eye-glyph">◉</span>
            </div>
          </div>

          <button className="oracle-btn" onClick={reveal} disabled={isRevealing}>
            {isRevealing ? "Le Soleil observe..." : "Recevoir une Révélation"}
          </button>

          <div className={`oracle-text-box ${current ? "revealed" : ""}`} key={animKey}>
            {current ? (
              <p className="oracle-revelation">❝ {current} ❞</p>
            ) : (
              <p className="oracle-placeholder">
                {isRevealing ? "▲ ▲ ▲" : "Le Soleil attend votre question..."}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
