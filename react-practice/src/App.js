import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ board, letter, onPlay }) {
  function handleClick(i) {
    if (board[i] || calcWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = letter;
    onPlay(newBoard);
  }

  let winner = calcWinner(board);
  let status;
  if (winner) {
    status = "Dang. How in the world did u just lose to " + winner;
  } else {
    status = "Next player is: " + letter;
  }
  console.log("YO: " + board);
  return (
    <>
      <div>{status}</div>
      <div className="board-row">
        <Square value={board[0]} onClick={() => handleClick(0)} />
        <Square value={board[1]} onClick={() => handleClick(1)} />
        <Square value={board[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={board[3]} onClick={() => handleClick(3)} />
        <Square value={board[4]} onClick={() => handleClick(4)} />
        <Square value={board[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} onClick={() => handleClick(6)} />
        <Square value={board[7]} onClick={() => handleClick(7)} />
        <Square value={board[8]} onClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [letter, setLetter] = useState("X");
  const [currentMove, setMove] = useState(0);
  let currentGame = history[history.length - 1];
  // setCurrentGame(history[history.length - 1]);
  // let currentGame = history[history.length - 1];
  console.log("RENDER: " + currentGame);
  function jumpTo(i) {
    // currentGame = history[i + 1];
    setMove(i);
    console.log(currentGame);
    if (i % 2 === 0) {
      setLetter("X");
    } else {
      setLetter("O");
    }
  }

  const moves = history.map((board, move) => {
    let desc;
    if (move === 0) {
      desc = "Do u have amnesia?";
    } else {
      desc = "Go to move #" + move + "";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  function handleClick(board) {
    setHistory([...history.slice(0, currentMove + 1), board]);
    if (letter === "X") {
      setLetter("O");
    } else {
      setLetter("X");
    }
    setMove(currentMove + 1);
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board letter={letter} onPlay={handleClick} board={history[currentMove]} />
          {/* {console.log("sus" + currentGame)} */}
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
function calcWinner(board) {
  let wins = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  for (let i = 0; i < wins.length; i++) {
    const [x, y, z] = wins[i];
    const [a, b, c] = [board[x], board[y], board[z]];
    if (a === b && b === c && a) return a;
  }
  return null;
}
