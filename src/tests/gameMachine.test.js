import { createActor } from 'xstate';
import gameMachine from '../state/gameMachine';

test('initial state', () => {
  const service = createActor(gameMachine).start();
  // Use getSnapshot() to access the current state
  const currentState = service.getSnapshot(); 
  expect(currentState.value).toBe('idle');
});

test('play a move', () => {
  const service = createActor(gameMachine).start();
  service.send({ type: 'START' });
  service.send({ type: 'PLAY', index: 0 });

  const currentState = service.getSnapshot(); // Get the current state after the moves
  expect(currentState.context.board[0]).toBe('X');
  expect(currentState.context.currentPlayer).toBe('O'); // Verify current player switched
});

test('invalid move on occupied square', () => {
	const service = createActor(gameMachine).start();
	service.send({ type: 'START' });
	service.send({ type: 'PLAY', index: 0 }); // X plays
	service.send({ type: 'PLAY', index: 0 }); // O tries to play on the same square
	
	const currentState = service.getSnapshot();
	expect(currentState.context.board[0]).toBe('X'); // X should still be there
	expect(currentState.context.currentPlayer).toBe('O'); // Player should not have switched
});

test('winning move', () => {
  const service = createActor(gameMachine).start();
  service.send({ type: 'START' });
  service.send({ type: 'PLAY', index: 0 }); // X
  service.send({ type: 'PLAY', index: 1 }); // O
  service.send({ type: 'PLAY', index: 3 }); // X
  service.send({ type: 'PLAY', index: 4 }); // O
  service.send({ type: 'PLAY', index: 6 }); // X wins

  const currentState = service.getSnapshot();
  expect(currentState.context.winner).toBe('X'); // X should be the winner
});

test('reset game', () => {
  const service = createActor(gameMachine).start();
  service.send({ type: 'START' });
  service.send({ type: 'PLAY', index: 0 }); // X wins
  service.send({ type: 'RESET' }); // Reset the game

  const currentState = service.getSnapshot();
  expect(currentState.value).toBe('idle'); // Should be back to idle
  expect(currentState.context.board).toEqual(Array(9).fill(null)); // Board should be empty
  expect(currentState.context.currentPlayer).toBe('X'); // Current player should reset to X
  expect(currentState.context.winner).toBe(null); // Winner should be null
});
