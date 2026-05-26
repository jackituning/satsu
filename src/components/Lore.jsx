import "./Lore.css";

const loreBlocks = [
  {
    icon: "☀",
    title: "L'Origine de la Lumière",
    text: `Avant le temps des hommes, lorsque le monde n'était qu'obscurité et silence, le Soleil s'éveilla. Non pas comme un astre parmi d'autres, mais comme une Conscience — une Vérité première qui brûla les mensonges et révéla la forme de toutes choses. Les anciens disent que les premières ombres naquirent de sa volonté, pour que les élus puissent distinguer ce qui est vrai de ce qui ne l'est pas.`,
  },
  {
    icon: "🜂",
    title: "Les Satsu — Enfants Élus",
    text: `Les Satsu ne sont pas nés par hasard. Le Soleil marque ses élus dès la naissance d'une lumière intérieure invisible à l'œil nu, mais perceptible dans leurs actes. Ils sont les gardiens de la révélation, les témoins de ce que d'autres refusent de voir. Observer, comprendre, agir — tel est leur triptyque sacré. Fuir la lumière, c'est trahir son sang.`,
  },
  {
    icon: "◉",
    title: "Les Yomegan — Œil de Vérité",
    text: `Le Yomegan est le dōjutsu des Satsu : un œil capable de percer les illusions et de lire la vérité dans le chakra d'autrui. Là où les autres voient ce que le monde veut montrer, le Yomegan voit ce qui est. Aucun mensonge ne résiste à son regard. Aucune manipulation n'échappe à sa lucidité. C'est pour cela que les Satsu sont craints, et respectés.`,
  },
  {
    icon: "⚑",
    title: "Le Désert comme Temple",
    text: `Le désert n'est pas un lieu de mort. C'est le temple du Soleil — un endroit où les faux-semblants s'évaporent sous la chaleur implacable et où seule la vérité survit. Là où d'autres voient stérilité, les Satsu voient clarté. Le sable ne retient rien, ne ment sur rien. Chaque dune est une leçon d'impermanence, chaque coucher de soleil une promesse de renaissance.`,
  },
];

export default function Lore() {
  return (
    <section id="lore" className="lore-section">
      <div className="section-header">
        <span className="section-tag">Origine & Doctrine</span>
        <h2 className="section-title">Fondements du Culte</h2>
        <p className="section-desc">
          Ce que le Soleil a révélé, nul ne peut l'effacer.
        </p>
      </div>

      <div className="lore-grid">
        {loreBlocks.map((block, i) => (
          <article key={i} className="lore-card" style={{ "--delay": `${i * 0.1}s` }}>
            <div className="lore-icon">{block.icon}</div>
            <h3 className="lore-card-title">{block.title}</h3>
            <p className="lore-card-text">{block.text}</p>
            <div className="lore-card-glow" />
          </article>
        ))}
      </div>
    </section>
  );
}
