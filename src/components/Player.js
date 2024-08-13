export default function Player({
  playerIndex,
  activePlayer,
  scores,
  currentScore,
}) {
  return (
    <section
      className={`player player--${playerIndex} ${
        activePlayer === playerIndex ? 'player--active' : ''
      } ${scores[playerIndex] >= 100 ? 'player--winner' : ''}`}
    >
      <h2 className="name">Player {playerIndex + 1}</h2>
      <p className="score">{scores[playerIndex]}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">
          {activePlayer === playerIndex ? currentScore : 0}
        </p>
      </div>
    </section>
  );
}
