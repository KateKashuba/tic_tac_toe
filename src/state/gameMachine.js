import { createMachine, assign } from 'xstate';

const gameMachine = createMachine({
  id: 'ticTacToe',
  initial: 'idle',
  context: {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  },
  states: {
    idle: {
      on: {
        START: 'playing',
      },
    },
    playing: {
      on: {
        PLAY: {
          target: 'playing',
          actions: 'makeMove',
          guard: 'isValidMove',
        },
        RESET: {
          actions: 'resetGame', // Call the reset action on RESET
          target: 'idle',
        },
      },
    },
    won: {
      on: {
        RESET: {
          actions: 'resetGame', // Call the reset action on RESET
          target: 'idle',
        },
      },
    },
    draw: {
      on: {
        RESET: {
          actions: 'resetGame', // Call the reset action on RESET
          target: 'idle',
        },
      },
    },
  },
}, {
  actions: {
    makeMove: assign((context) => {
      const board = [...context.context.board];
      board[context.event.index] = context.context.currentPlayer;
      return {
        board,
        currentPlayer: context.context.currentPlayer === 'X' ? 'O' : 'X',
        winner: calculateWinner(board),
      };
    }),
		resetGame: assign(() => ({ // Reset the context to its initial state
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    })),
  },
  guards: {
    isValidMove: (context) => {
      return !context.context.board[context.event.index] && !context.context.winner;
    },
  },
});

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  
  return board.every(Boolean) ? 'draw' : null;
}

export default gameMachine;
