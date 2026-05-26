import { useState } from "react";
import "./Quiz.css";

const questions = [
  {
    question: "Que représente réellement le Soleil pour les Satsu ?",
    answers: [
      "Une divinité guerrière qui récompense les forts",
      "Une vérité absolue qui révèle et juge toutes choses",
      "Une source de chakra exploitable par les élus",
      "Un symbole de pouvoir hérité des ancêtres",
    ],
    good: 1,
    explanation: "Le Soleil n'est pas un dieu au sens traditionnel — c'est la Vérité incarnée. Il révèle, il juge, il éclaire. Rien de plus, rien de moins.",
  },
  {
    question: "Que doivent faire avant tout les élus du Soleil ?",
    answers: [
      "Observer — voir ce que les autres ignorent",
      "Dominer leurs pairs par la force du chakra",
      "Fuir les terres arides pour chercher l'eau",
      "Prêcher la doctrine aux non-initiés",
    ],
    good: 0,
    explanation: "Observer est la première vertu des Satsu. Avant d'agir, avant de parler, on regarde. C'est une forme de domination que les aveugles ne comprennent pas.",
  },
  {
    question: "Quel est le pouvoir fondamental des Yomegan ?",
    answers: [
      "Créer des tempêtes de sable dévastatrices",
      "Contrôler le chakra des autres à distance",
      "Percevoir la vérité à travers les illusions",
      "Communiquer par télépathie solaire",
    ],
    good: 2,
    explanation: "Le Yomegan est un œil de vérité. Il perce les illusions, lit le chakra d'autrui, et ne peut être trompé par aucun mensonge.",
  },
  {
    question: "Pourquoi le désert est-il considéré comme sacré par les Satsu ?",
    answers: [
      "Car il est le lieu de naissance des premiers Satsu",
      "Car il cache les ruines du temple originel",
      "Car sa chaleur renforce le chakra solaire",
      "Car il ne retient rien et ne ment sur rien",
    ],
    good: 3,
    explanation: "Le désert est un temple d'honnêteté brute. Aucun faux-semblant n'y survit. C'est en cela qu'il est l'expression parfaite du Soleil.",
  },
  {
    question: "Comment reconnaît-on un véritable Satsu ?",
    answers: [
      "Par la couleur dorée de son chakra visible",
      "Par la lumière intérieure qui se manifeste dans ses actes",
      "Par la marque solaire gravée à la naissance",
      "Par sa capacité à résister à la chaleur du désert",
    ],
    good: 1,
    explanation: "La lumière des Satsu est invisible à l'œil nu mais perceptible dans leurs actes. On ne se proclame pas Satsu — on l'est, et cela se voit.",
  },
];

export default function Quiz({ onCorrect }) {
  const [answered, setAnswered] = useState({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const answer = (qi, ai) => {
    if (answered[qi] !== undefined) return;
    const isCorrect = ai === questions[qi].good;
    setAnswered(prev => ({ ...prev, [qi]: ai }));
    if (isCorrect) {
      setScore(s => s + 1);
      onCorrect?.();
    }
    if (Object.keys(answered).length + 1 === questions.length) {
      setTimeout(() => setFinished(true), 800);
    }
  };

  const reset = () => { setAnswered({}); setScore(0); setFinished(false); };

  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  return (
    <section id="quiz" className="quiz-section">
      <div className="quiz-inner">
        <div className="section-header">
          <span className="section-tag">Épreuve de Connaissance</span>
          <h2 className="section-title">Le Grand Quiz</h2>
          <p className="section-desc">Prouve ta maîtrise de la doctrine. Le Soleil observe.</p>
        </div>

        <div className="quiz-score-bar">
          <span className="quiz-score-label">Lumière acquise</span>
          <div className="score-track">
            <div className="score-fill" style={{ width: `${(score / total) * 100}%` }} />
          </div>
          <span className="quiz-score-num">{score}/{total}</span>
        </div>

        <div className="questions-list">
          {questions.map((q, qi) => {
            const userAnswer = answered[qi];
            const done = userAnswer !== undefined;
            return (
              <div key={qi} className={`question-card ${done ? "done" : ""}`}>
                <div className="question-number">
                  <span>{String(qi + 1).padStart(2, "0")}</span>
                </div>
                <div className="question-body">
                  <p className="question-text">{q.question}</p>
                  <div className="answers-grid">
                    {q.answers.map((a, ai) => {
                      let cls = "answer-btn";
                      if (done) {
                        if (ai === q.good) cls += " correct";
                        else if (ai === userAnswer) cls += " wrong";
                        else cls += " dimmed";
                      }
                      return (
                        <button key={ai} className={cls} onClick={() => answer(qi, ai)} disabled={done}>
                          <span className="answer-letter">{String.fromCharCode(65 + ai)}</span>
                          <span className="answer-text">{a}</span>
                          {done && ai === q.good && <span className="answer-check">✓</span>}
                          {done && ai === userAnswer && ai !== q.good && <span className="answer-cross">✗</span>}
                        </button>
                      );
                    })}
                  </div>
                  {done && (
                    <div className={`explanation ${userAnswer === q.good ? "exp-good" : "exp-bad"}`}>
                      <span className="exp-icon">{userAnswer === q.good ? "☀" : "☾"}</span>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {finished && (
          <div className="quiz-result">
            <div className="result-sun">☀</div>
            <h3 className="result-title">
              {pct >= 80 ? "Le Soleil vous reconnaît." : pct >= 50 ? "La lumière vous attend encore." : "L'obscurité vous retient."}
            </h3>
            <p className="result-score">{score} / {total} — {pct}%</p>
            <p className="result-msg font-lore">
              {pct >= 80
                ? "Votre connaissance de la doctrine est digne d'un Satsu accompli."
                : pct >= 50
                ? "Continuez d'observer. La vérité se dévoile à ceux qui persistent."
                : "Retournez aux fondements. Le Soleil ne récompense pas l'ignorance."}
            </p>
            <button className="oracle-btn" onClick={reset} style={{ marginTop: "1.5rem" }}>
              Recommencer l'Épreuve
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
