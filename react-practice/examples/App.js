import { useState } from "react";


function Square({ value, onClick, highlight = false }) {
  return (
    <button
      className={"square" + (highlight ? " square-winning" : "")}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ board, letter, onPlay }) {
  function handleClick(i) {
    if (board[i] || calcWinner(board).winner) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = letter;
    onPlay(newBoard);
  }

  let { winner, triple } = calcWinner(board);
  console.log(triple);
  let status;
  if (winner) {
    status = "Dang. How in the world did u just lose to " + winner;
  } else if (!board.includes(null)) {
    status = "Wow. Neither won."
  } else {
    status = "Next player is: " + letter;
  }

  let boardRows = [...Array(3).keys()].map((row) => {
    let boardCols = [...Array(3).keys()].map((col) => {
      let i = row * 3 + col;
      let highlight = false;
      if (triple && triple.includes(i)) highlight = true;
      return (
        <Square
          key={i}
          value={board[i]}
          onClick={() => handleClick(i)}
          highlight={highlight}
        />
      );
    });
    return (
      <div key={row} className="board-row">
        {boardCols}
      </div>
    );
  });
  return (
    <>
      <div>{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [letter, setLetter] = useState("X");
  const [currentMove, setMove] = useState(0);
  const [ascending, setAscending] = useState(1); //1 = chronological

  function jumpTo(i) {
    setMove(i);
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
        {move !== history.length - 1 ? (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
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
          <Board
            letter={letter}
            onPlay={handleClick}
            board={history[currentMove]}
          />
        </div>
        <div className="game-info">
          <ol>
            <button
              className="sort-order"
              onClick={() => setAscending(ascending * -1)}
            >
              Ascending?
            </button>
          </ol>
          <ol>{ascending === 1 ? moves : moves.slice().reverse()}</ol>
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
    if (a === b && b === c && a) return { winner: a, triple: wins[i] };
  }
  return {};
}
