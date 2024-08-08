import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import Board from './components/Board';
import ResetButton from './components/ResetButton';
import gameMachine from './state/gameMachine';

const App = () => {
  const [state, send] = useMachine(gameMachine);
  const { board, winner } = state.context;
  // Automatically start the game when the component mounts
  useEffect(() => {
    send({ type: 'START' });
  }, [send]);

  const handleSquareClick = (index) => {
    send({ type: 'PLAY', index });
  };

  const handleReset = () => {
    send({ type: 'RESET' });
    send({ type: 'START' }); // Automatically start a new game after reset
  };

  // Function to render the winner message
  const renderWinnerMessage = () => {
    if (winner) {
      return winner === 'draw' 
        ? <h2>It's a draw!</h2> 
        : <h2>Winner: {winner}</h2>;
    }
    return null;
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <Board squares={board} onClick={handleSquareClick} />
      {renderWinnerMessage()}
      <ResetButton onClick={handleReset} />
    </div>
  );
};

export default App;
