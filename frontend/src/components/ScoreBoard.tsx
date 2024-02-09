export function ScoreBoard() {
  const player1score = 0;
  const player2score = 0;

  return (
    <section className="w-full flex items-center bg-white p-4 shadow rounded">
      <div className="w-1/2 flex justify-center flex-col items-center border-r-2">
        P1
        <span className="text-2xl">{player1score}</span>
      </div>
      <div className="w-1/2 flex justify-center flex-col items-center">
        P2
        <span className="text-2xl">{player2score}</span>
      </div>
    </section>
  );
}
