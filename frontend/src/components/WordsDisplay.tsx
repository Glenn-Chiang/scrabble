export function WordsDisplay() {
  // TODO: Get word scores from redis store
  const wordsScores = [
    {
      word: "hello",
      score: 10,
    },
    { word: "world", score: 12 },
  ];

  const totalScore = wordsScores.reduce((prev, curr) => prev + curr.score, 0);

  return (
    <section className="w-full p-4 rounded shadow  bg-white flex flex-col">
      <h2 className="text-slate-500">Words played:</h2>
      <ul className="flex flex-col py-2 uppercase border-b-2">
        {wordsScores.map((wordScore) => (
          <li className="justify-between flex">
            <span>{wordScore.word}</span>
            <span>+{wordScore.score}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold pt-2 text-sky-500">
        Total score:{" "}
        <span>{totalScore}</span>
      </div>
    </section>
  );
}
