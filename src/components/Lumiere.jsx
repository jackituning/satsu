import "./Lumiere.css";

const levels = [
  { min: 0, max: 4, title: "Initié", desc: "Tu aperçois la lumière, mais tes yeux ne sont pas encore habitués.", icon: "○" },
  { min: 5, max: 9, title: "Observateur", desc: "Le Soleil commence à te reconnaître. Continue d'apprendre.", icon: "◎" },
  { min: 10, max: 14, title: "Adepte du Soleil", desc: "Ta lumière intérieure grandit. Les Yomegan s'éveillent.", icon: "◉" },
  { min: 15, max: 19, title: "Gardien de la Vérité", desc: "Tu vois ce que d'autres refusent de voir. La doctrine est en toi.", icon: "☀" },
  { min: 20, max: Infinity, title: "Élu du Soleil — Satsu Accompli", desc: "Le Soleil te reconnaît. Tu es lumière, vérité, et vigilance.", icon: "✦" },
];

export default function Lumiere({ score }) {
  const current = levels.find(l => score >= l.min && score <= l.max) || levels[0];
  const next = levels[levels.indexOf(current) + 1];
  const pct = next
    ? Math.min(((score - current.min) / (next.min - current.min)) * 100, 100)
    : 100;

  return (
    <>
      <section id="lumiere" className="lumiere-section">
        <div className="lumiere-inner">
          <div className="section-header">
            <span className="section-tag">Progression spirituelle</span>
            <h2 className="section-title">Niveau de Lumière</h2>
            <p className="section-desc">Chaque acte de foi illumine davantage votre âme.</p>
          </div>

          <div className="lumiere-display">
            <div className="lumiere-orb">
              <div className="orb-ring orb-ring-1" />
              <div className="orb-ring orb-ring-2" />
              <div className="orb-core">
                <span className="orb-icon">{current.icon}</span>
                <span className="orb-score">{score}</span>
              </div>
            </div>

            <div className="lumiere-info">
              <p className="lumiere-rank-label">Rang actuel</p>
              <h3 className="lumiere-rank">{current.title}</h3>
              <p className="lumiere-rank-desc">{current.desc}</p>

              {next && (
                <div className="lumiere-progress">
                  <div className="progress-labels">
                    <span>{current.title}</span>
                    <span>{next.title}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                    <div className="progress-glow" style={{ left: `${pct}%` }} />
                  </div>
                  <p className="progress-hint">
                    {next.min - score} point{next.min - score > 1 ? "s" : ""} avant <em>{next.title}</em>
                  </p>
                </div>
              )}

              {!next && (
                <div className="lumiere-max">
                  <span>✦ Rang maximum atteint ✦</span>
                </div>
              )}
            </div>
          </div>

          <div className="levels-list">
            {levels.map((l, i) => (
              <div key={i} className={`level-row ${score >= l.min ? "unlocked" : "locked"} ${current === l ? "current" : ""}`}>
                <span className="level-icon">{l.icon}</span>
                <div className="level-info">
                  <span className="level-name">{l.title}</span>
                  <span className="level-range">{l.min}+ pts</span>
                </div>
                {score >= l.min && <span className="level-check">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-sun">☀</div>
        <p className="footer-text">Culte du Soleil — Les Satsu</p>
        <p className="footer-quote">"Le Soleil voit tout. Absolument tout."</p>
        <div className="footer-divider">
          <span className="divider-line" />
          <span className="divider-glyph">✦</span>
          <span className="divider-line" />
        </div>
        <p className="footer-small">☀ Que la lumière guide chacun de vos pas ☀</p>
      </footer>
    </>
  );
}
