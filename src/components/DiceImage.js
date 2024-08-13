export default function DiceImage({ dice }) {
  if (!dice) return null;
  return (
    <img
      src={`../images/dice-${dice}.png`}
      alt="Playing dice"
      className="dice"
    />
  );
}
