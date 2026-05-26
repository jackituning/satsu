import { useEffect, useMemo, useState } from "react";

const quizQuestions = [
  {
    question: "Que représente réellement le Soleil pour les Satsu ?",
    answers: ["Une divinité guerrière", "Une vérité absolue", "Une source de chakra"],
    good: 1,
  },
  {
    question: "Que doivent faire les élus du Soleil ?",
    answers: ["Observer", "Dominer", "Fuir le désert"],
    good: 0,
  },
  {
    question: "Quel est le rôle des Yomegan ?",
    answers: ["Voir la vérité", "Créer des tempêtes", "Contrôler le sable"],
    good: 0,
  },
];

const teachings = [
  "La lumière révèle tout.",
  "Le désert ment moins que les hommes.",
  "Celui qui fuit la lumière fuit la vérité.",
  "Le Soleil juge sans parler.",
  "Observer est une forme de domination.",
];

export default function CulteDuSoleil() {
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [qteVisible, setQteVisible] = useState(false);
  const [qteScore, setQteScore] = useState(0);
  const [oracleText, setOracleText] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [sunLevel, setSunLevel] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setQteVisible(true);
      setTimeout(() => setQteVisible(false), 1200);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const oracleSentence = useMemo(() => {
    return teachings[Math.floor(Math.random() * teachings.length)];
  }, [oracleText]);

  const answerQuestion = (questionIndex, answerIndex, goodIndex) => {
    if (answered.includes(questionIndex)) return;
    setAnswered([...answered, questionIndex]);
    if (answerIndex === goodIndex) {
      setScore(score + 1);
      setSunLevel((prev) => prev + 1);
    }
  };

  const paths = {
    observation: "☀️ Le Soleil t’apprend à voir ce que les autres ignorent.",
    devotion: "🔥 Ta foi nourrit la lumière du désert.",
    silence: "🌑 Le silence révèle parfois davantage que les mots.",
  };

  return (
    <div className="min-h-screen bg-black text-orange-200">
      {/* HEADER */}
      <header className="text-center py-16 border-b border-orange-500 bg-gradient-to-b from-black to-zinc-900">
        <h1 className="text-6xl font-black tracking-widest text-orange-400 drop-shadow-lg">
          ☀️ CULTE DU SOLEIL ☀️
        </h1>
        <p className="mt-4 text-xl text-orange-200/80">
          "Le Soleil ne ment jamais."
        </p>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-10">

        {/* FOUNDATIONS */}
        <section className="bg-zinc-950 border border-orange-500 rounded-2xl p-6 shadow-[0_0_20px_#ff7a00]">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">📖 Fondements</h2>
          <p className="leading-relaxed">
            Le Soleil est une vérité absolue. Les Satsu sont ses élus.
            Toute chose cachée finira révélée par sa lumière.
          </p>
        </section>

        {/* ORACLE */}
        <section className="bg-zinc-950 border border-orange-500 rounded-2xl p-6 shadow-[0_0_20px_#ff7a00]">
          <h2 className="text-3xl font-bold text-orange-400">🔮 Oracle</h2>

          <button
            onClick={() => setOracleText(oracleSentence)}
            className="mt-4 bg-orange-500 text-black font-bold px-6 py-2 rounded-xl hover:bg-orange-400 transition"
          >
            Recevoir une révélation
          </button>

          <div className="mt-4 p-4 bg-black border border-orange-700 rounded-xl min-h-[80px] flex items-center justify-center">
            {oracleText || "Le Soleil observe..."}
          </div>
        </section>

        {/* QUIZ */}
        <section className="bg-zinc-950 border border-orange-500 rounded-2xl p-6 shadow-[0_0_20px_#ff7a00]">
          <h2 className="text-3xl font-bold text-orange-400">🧠 Quiz</h2>

          <div className="space-y-6 mt-4">
            {quizQuestions.map((q, index) => (
              <div key={index} className="border border-orange-800 p-4 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">{q.question}</h3>
                <div className="grid gap-2">
                  {q.answers.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => answerQuestion(index, i, q.good)}
                      className="bg-orange-600/20 hover:bg-orange-500/40 border border-orange-500 rounded-lg p-2"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-orange-300">Score : {score}</p>
        </section>

        {/* QTE */}
        <section className="bg-zinc-950 border border-orange-500 rounded-2xl p-6 text-center shadow-[0_0_20px_#ff7a00]">
          <h2 className="text-3xl font-bold text-orange-400">⚡ Réaction</h2>

          <div className="h-40 flex items-center justify-center relative">
            {qteVisible && (
              <button
                onClick={() => {
                  setQteScore(qteScore + 1);
                  setSunLevel((p) => p + 1);
                  setQteVisible(false);
                }}
                className="absolute bg-orange-400 text-black font-black px-6 py-3 rounded-full animate-pulse"
              >
                ☀️
              </button>
            )}
          </div>

          <p>Réussites : {qteScore}</p>
        </section>

        {/* PATH */}
        <section className="bg-zinc-950 border border-orange-500 rounded-2xl p-6 shadow-[0_0_20px_#ff7a00]">
          <h2 className="text-3xl font-bold text-orange-400">🛕 Voies</h2>

          <div className="grid gap-3 mt-4">
            {Object.entries(paths).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setSelectedPath(val)}
                className="bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500 rounded-xl p-3"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 border border-orange-700 rounded-xl min-h-[80px]">
            {selectedPath || "Choisis une voie."}
          </div>
        </section>

        {/* LEVEL */}
        <section className="text-center bg-zinc-950 border border-orange-500 rounded-2xl p-6 shadow-[0_0_20px_#ff7a00]">
          <h2 className="text-3xl font-bold text-orange-400">🌞 Lumière</h2>
          <div className="text-5xl font-black text-orange-300 mt-3">{sunLevel}</div>
        </section>

      </main>

      <footer className="text-center p-6 text-orange-500 border-t border-orange-500">
        ☀️ Le Soleil voit tout ☀️
      </footer>
    </div>
  );
}
