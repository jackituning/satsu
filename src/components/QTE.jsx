import { useEffect, useRef, useState, useCallback } from "react";
import "./QTE.css";

export default function QTE({ onSuccess }) {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [flash, setFlash] = useState(null); // "hit" | "miss"
  const [pos, setPos] = useState({ top: "50%", left: "50%" });
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem("qte_best") || "0"));

  const spawnTimer = useRef(null);
  const countdownTimer = useRef(null);
  const missTimer = useRef(null);

  const randomPos = () => ({
    top: `${15 + Math.random() * 60}%`,
    left: `${10 + Math.random() * 70}%`,
  });

  const spawnSun = useCallback(() => {
    setPos(randomPos());
    setActive(true);
    clearTimeout(missTimer.current);
    missTimer.current = setTimeout(() => {
      setActive(false);
      setMisses(m => m + 1);
      setFlash("miss");
      setTimeout(() => setFlash(null), 400);
      scheduleNext();
    }, 1000 + Math.random() * 600);
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimeout(spawnTimer.current);
    spawnTimer.current = setTimeout(spawnSun, 600 + Math.random() * 800);
  }, [spawnSun]);

  const start = () => {
    setScore(0); setMisses(0); setTimeLeft(30);
    setFinished(false); setActive(false);
    setRunning(true);
    scheduleNext();
    countdownTimer.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(countdownTimer.current);
          clearTimeout(spawnTimer.current);
          clearTimeout(missTimer.current);
          setActive(false);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const hit = () => {
    if (!active) return;
    clearTimeout(missTimer.current);
    setActive(false);
    setScore(s => {
      const ns = s + 1;
      if (ns > bestScore) {
        setBestScore(ns);
        localStorage.setItem("qte_best", ns);
      }
      return ns;
    });
    onSuccess?.();
    setFlash("hit");
    setTimeout(() => setFlash(null), 300);
    scheduleNext();
  };

  useEffect(() => () => {
    clearTimeout(spawnTimer.current);
    clearTimeout(missTimer.current);
    clearInterval(countdownTimer.current);
  }, []);

  const accuracy = score + misses > 0 ? Math.round((score / (score + misses)) * 100) : 0;

  return (
    <section id="reaction" className="qte-section">
      <div className="qte-inner">
        <div className="section-header">
          <span className="section-tag">Épreuve des Réflexes</span>
          <h2 className="section-title">Le Rite de Réaction</h2>
          <p className="section-desc">Les Satsu agissent avant que l'ombre n'apparaisse.</p>
        </div>

        <div className={`qte-arena ${flash === "hit" ? "flash-hit" : flash === "miss" ? "flash-miss" : ""}`}>
          <div className="arena-bg-rings">
            {[1,2,3].map(i => <div key={i} className={`arena-ring ar-${i}`} />)}
          </div>

          <div className="qte-hud">
            <div className="hud-item">
              <span className="hud-label">Réussites</span>
              <span className="hud-value hud-score">{score}</span>
            </div>
            <div className="hud-item hud-center">
              <span className="hud-label">Temps</span>
              <span className={`hud-value hud-time ${timeLeft <= 5 && running ? "urgent" : ""}`}>
                {running || finished ? timeLeft : "30"}s
              </span>
            </div>
            <div className="hud-item">
              <span className="hud-label">Manqués</span>
              <span className="hud-value hud-miss">{misses}</span>
            </div>
          </div>

          <div className="arena-field" onClick={() => { if (active) hit(); }}>
            {!running && !finished && (
              <button className="start-btn" onClick={start}>
                <span className="start-icon">☀</span>
                <span>Commencer l'Épreuve</span>
              </button>
            )}
            {running && !active && (
              <div className="waiting-msg">Prépare-toi...</div>
            )}
            {running && active && (
              <button
                className="qte-sun-btn"
                style={{ top: pos.top, left: pos.left }}
                onClick={hit}
              >
                ☀
              </button>
            )}
            {finished && (
              <div className="qte-finished">
                <div className="finished-icon">☀</div>
                <p className="finished-title">Épreuve terminée</p>
                <div className="finished-stats">
                  <div className="fstat">
                    <span className="fstat-val">{score}</span>
                    <span className="fstat-lbl">Soleils capturés</span>
                  </div>
                  <div className="fstat">
                    <span className="fstat-val">{accuracy}%</span>
                    <span className="fstat-lbl">Précision</span>
                  </div>
                  <div className="fstat">
                    <span className="fstat-val">{bestScore}</span>
                    <span className="fstat-lbl">Meilleur score</span>
                  </div>
                </div>
                <button className="oracle-btn" onClick={start} style={{ marginTop: "1.2rem" }}>
                  Rejouer
                </button>
              </div>
            )}
          </div>

          <div className="accuracy-bar">
            <span className="acc-label">Précision</span>
            <div className="acc-track">
              <div className="acc-fill" style={{ width: `${accuracy}%` }} />
            </div>
            <span className="acc-val">{accuracy}%</span>
          </div>
        </div>

        <p className="qte-best">
          <span>Record personnel :</span>
          <strong> {bestScore} soleils</strong>
        </p>
      </div>
    </section>
  );
}
