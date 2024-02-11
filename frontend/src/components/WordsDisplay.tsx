import { calculateScore } from "../lib/game-mechanics/calculateScore";
import { useAppSelector } from "../redux-config/store";

export function WordsDisplay() {
  const wordScores = useAppSelector(state => state.wordScores)
  const totalScore = calculateScore(wordScores);

  return (
    <section className="w-full p-4 rounded shadow  bg-white flex flex-col">
      <h2 className="text-slate-500">Words played:</h2>
      <ul className="flex flex-col py-2 uppercase border-b-2 h-[10vh] overflow-y-scroll font-semibold">
        {wordScores.map((wordScore, i) => (
          <li key={i} className="justify-between flex">
            <span>{wordScore.word}</span>
            <span>+{wordScore.score}</span> 
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold pt-2 text-sky-500">
        Score:{" "}
        <span>{totalScore}</span>
      </div>
    </section>
  );
}
