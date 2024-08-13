import { useReducer } from 'react';
import { Button } from './components/Button';
import DiceImage from './components/DiceImage';
import Player from './components/Player';

const initialState = {
  scores: [0, 0],
  currentScore: 0,
  activePlayer: 0,
  playing: true,
  dice: null,
  disableBtn: false, // Add disableBtn to initialState
};

function reducer(state, action) {
  switch (action.type) {
    case 'rollDice':
      const dice = Math.trunc(Math.random() * 6) + 1;
      return {
        ...state,
        dice,
        currentScore: dice !== 1 ? state.currentScore + dice : 0,
        activePlayer:
          dice === 1 ? (state.activePlayer === 0 ? 1 : 0) : state.activePlayer,
        disableBtn: state.scores[state.activePlayer] >= 100, // Update disableBtn here
      };

    case 'holdScore':
      const newScores = [...state.scores];
      newScores[state.activePlayer] += state.currentScore;
      return {
        ...state,
        scores: newScores,
        currentScore: 0,
        activePlayer:
          newScores[state.activePlayer] >= 100
            ? state.activePlayer
            : state.activePlayer === 0
            ? 1
            : 0,
        playing: newScores[state.activePlayer] < 100,
        disableBtn: newScores[state.activePlayer] >= 100,
      };

    case 'newGame':
      return {
        ...initialState,
        playing: true,
        disableBtn: false,
      };

    default:
      throw new Error('Unknown action type');
  }
}

export default function App() {
  const [{ activePlayer, scores, currentScore, dice, disableBtn }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <main>
      <Player
        playerIndex={0}
        activePlayer={activePlayer}
        scores={scores}
        currentScore={currentScore}
      />
      <Player
        playerIndex={1}
        activePlayer={activePlayer}
        scores={scores}
        currentScore={currentScore}
      />
      <DiceImage dice={dice} />
      <Button
        className="btn btn--new"
        onClick={() => dispatch({ type: 'newGame' })}
      >
        🔄 New game
      </Button>
      <Button
        className="btn btn--roll"
        onClick={() => dispatch({ type: 'rollDice' })}
        disabled={disableBtn}
      >
        🎲 Roll dice
      </Button>
      <Button
        className="btn btn--hold"
        onClick={() => dispatch({ type: 'holdScore' })}
        disabled={disableBtn}
      >
        📥 Hold
      </Button>
    </main>
  );
}
