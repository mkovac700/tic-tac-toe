import { useState, useEffect } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (squares.filter(Boolean).length % 2 === 0 ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isLatestMove, setIsLatestMove] = useState(true);  // New flag
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsLatestMove(true);  // Reset to latest move
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsLatestMove(nextMove === history.length - 1);  // Check if this is the latest move
  }

  function makeComputerMove() {
    const emptySquares = currentSquares
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);

    if (emptySquares.length === 0 || calculateWinner(currentSquares)) {
      return; // Game over or no moves left
    }

    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];

    const nextSquares = currentSquares.slice();
    nextSquares[randomIndex] = "O";
    handlePlay(nextSquares);
  }

  // Use useEffect to handle the computer move after the player's move
  useEffect(() => {
    if (isLatestMove && !xIsNext) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);

      return () => clearTimeout(timer); // Cleanup timeout on unmount or re-render
    }
  }, [xIsNext, currentSquares, isLatestMove]); // Dependencies: run when xIsNext, currentSquares, or isLatestMove change

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onSquareClick={(i) => {
          if (currentSquares[i] || calculateWinner(currentSquares) || !xIsNext || !isLatestMove) {
            return; // Ignore click if square is filled, there's a winner, it's not X's turn, or we're not on the latest move
          }
          const nextSquares = currentSquares.slice();
          nextSquares[i] = "X";
          handlePlay(nextSquares);
        }} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
