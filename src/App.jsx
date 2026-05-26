import { useState } from "react";
import SandParticles from "./components/SandParticles";
import Header from "./components/Header";
import Lore from "./components/Lore";
import Oracle from "./components/Oracle";
import Quiz from "./components/Quiz";
import QTE from "./components/QTE";
import Voies from "./components/Voies";
import Lumiere from "./components/Lumiere";

export default function App() {
  const [sunScore, setSunScore] = useState(0);
  const addPoint = (n = 1) => setSunScore(s => s + n);

  return (
    <>
      <SandParticles />
      <Header />
      <Lore />
      <Oracle onReveal={() => addPoint(1)} />
      <Quiz onCorrect={() => addPoint(2)} />
      <QTE onSuccess={() => addPoint(1)} />
      <Voies onChoose={() => addPoint(3)} />
      <Lumiere score={sunScore} />
    </>
  );
}
