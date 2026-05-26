import { useState } from "react";
import "./Voies.css";

const voies = [
  {
    key: "observation",
    icon: "◉",
    name: "Voie de l'Observation",
    tagline: "Voir sans être vu.",
    desc: "L'observateur ne juge pas — il constate. Il enregistre la vérité dans ses moindres détails, là où les autres passent et oublient. Le Yomegan s'épanouit sur cette voie : chaque regard est une leçon, chaque silence une révélation.",
    traits: ["Patience infinie", "Acuité perceptive", "Discrétion absolue"],
    color: "#FFB627",
  },
  {
    key: "devotion",
    icon: "🜂",
    name: "Voie de la Dévotion",
    tagline: "Brûler pour la lumière.",
    desc: "Le dévot nourrit la lumière de sa propre foi. Il ne doute pas — il agit. Sa flamme intérieure est le reflet du Soleil lui-même, et ses actes sont des offrandes. La dévotion n'est pas de la faiblesse : c'est la force de celui qui croit sans avoir besoin de preuves.",
    traits: ["Foi indéfectible", "Courage sans faille", "Abnégation totale"],
    color: "#FF6B2B",
  },
  {
    key: "silence",
    icon: "🌑",
    name: "Voie du Silence",
    tagline: "Ce que l'ombre révèle.",
    desc: "Paradoxalement, les Satsu du silence sont parmi les plus éclairés. Ils comprennent que la lumière ne peut exister sans l'ombre, et que le silence dit parfois davantage que les mots. Ils marchent entre deux mondes, témoins de ce que nul autre ne peut voir.",
    traits: ["Dualité maîtrisée", "Sagesse contemplative", "Connaissance des ombres"],
    color: "#8B2500",
  },
];

export default function Voies({ onChoose }) {
  const [selected, setSelected] = useState(null);

  const choose = (v) => {
    setSelected(v.key);
    onChoose?.();
  };

  return (
    <section id="voies" className="voies-section">
      <div className="voies-inner">
        <div className="section-header">
          <span className="section-tag">Chemin de vie</span>
          <h2 className="section-title">Les Trois Voies</h2>
          <p className="section-desc">Le Soleil illumine trois chemins. Un seul est le tien.</p>
        </div>

        <div className="voies-grid">
          {voies.map((v) => (
            <button
              key={v.key}
              className={`voie-card ${selected === v.key ? "selected" : ""}`}
              onClick={() => choose(v)}
              style={{ "--voie-color": v.color }}
            >
              <div className="voie-icon">{v.icon}</div>
              <h3 className="voie-name">{v.name}</h3>
              <p className="voie-tagline">{v.tagline}</p>
              <p className="voie-desc">{v.desc}</p>
              <ul className="voie-traits">
                {v.traits.map((t) => (
                  <li key={t}>
                    <span className="trait-dot">✦</span>
                    {t}
                  </li>
                ))}
              </ul>
              {selected === v.key && (
                <div className="voie-chosen-badge">Votre Voie</div>
              )}
              <div className="voie-glow" />
            </button>
          ))}
        </div>

        {selected && (
          <div className="voie-result" key={selected}>
            <p className="voie-result-text">
              ☀ Le Soleil a reconnu votre chemin :{" "}
              <strong>{voies.find(v => v.key === selected)?.name}</strong>.
              Marchez dans la lumière.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
