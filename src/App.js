import { useState, useEffect } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick, winner }) {
  /* const winner = calculateWinner(squares);
  console.log("winner: ", winner); */
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status =
      "Next player: " + (squares.filter(Boolean).length % 2 === 0 ? "X" : "O");
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
  const [isLatestMove, setIsLatestMove] = useState(true); // New flag
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    async function checkWinner(){
      let winner = await calculateWinner(currentSquares);
      setWinner(winner);
    }

    checkWinner();
  }, [currentSquares]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsLatestMove(true); // Reset to latest move
    //console.log(nextSquares);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsLatestMove(nextMove === history.length - 1); // Check if this is the latest move
  }

  function makeComputerMove() {
    const emptySquares = currentSquares
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);

    if (emptySquares.length === 0 || winner) {
      return; // Game over or no moves left
    }

    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];

    const nextSquares = currentSquares.slice();
    nextSquares[randomIndex] = "O";
    handlePlay(nextSquares);
  }

  function generateRandomTime(minMs, maxMs) {
    const minCeiled = Math.ceil(minMs);
    const maxFloored = Math.floor(maxMs);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  // Use useEffect to handle the computer move after the player's move
  useEffect(() => {
    let ms = generateRandomTime(500, 2000);

    if (isLatestMove && !xIsNext) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, ms);

      return () => clearTimeout(timer); // Cleanup timeout on unmount or re-render
    }
  }, [xIsNext, currentSquares, isLatestMove, winner]); // Dependencies: run when xIsNext, currentSquares, or isLatestMove change

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
        <Board
          squares={currentSquares}
          winner={winner}
          onSquareClick={(i) => {
            if (
              currentSquares[i] ||
              winner ||
              !xIsNext ||
              !isLatestMove
            ) {
              return; // Ignore click if square is filled, there's a winner, it's not X's turn, or we're not on the latest move
            }
            const nextSquares = currentSquares.slice();
            nextSquares[i] = "X";
            handlePlay(nextSquares);
            
          }}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

async function calculateWinner(squares) {

  try {
    const response = await fetch("http://localhost:8080/api/demo/calculateWinner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(squares),
    })
      
    if(!response.ok) throw new Error(response.status);

    const data = await response.json();
    return data[0];

  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}
