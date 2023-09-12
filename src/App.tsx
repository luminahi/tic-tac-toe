import { useState } from "react";
import "./App.css";

interface SquareProps {
    value: "X" | "O" | "";
    index: number;
    handleClick: Function;
    winning: boolean;
}

type TurnPlayer = "X" | "O";

function Square({ value, index, winning, handleClick }: SquareProps) {
    let style = "square";

    if (winning) {
        style += " winning";
    }

    return (
        <div onClick={() => handleClick(index)} className={style}>
            {value}
        </div>
    );
}

function Table() {
    const [list, setList] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState<TurnPlayer>("O");
    const [winner, setWinner] = useState<TurnPlayer | null>(null);
    const [winningLine, setWinningLine] = useState(Array(3).fill(null));

    function handleClick(index: number) {
        if (list[index] || winner) return;

        const newList = list.slice();
        newList[index] = player;

        if (player === "O") {
            setPlayer("X");
        } else {
            setPlayer("O");
        }

        setList(newList);
        const line = calculateWinner(newList);

        if (line) {
            setWinningLine(line!);
            setWinner(player);
        }
    }

    function handleRestart() {
        setList(Array(9).fill(null));
        setPlayer("O");
        setWinner(null);
        setWinningLine([Array(3).fill(null)]);
    }

    const listMark = list.map((item, index) => {
        return (
            <Square
                winning={winningLine.includes(index)}
                key={index}
                index={index}
                value={item}
                handleClick={handleClick}
            />
        );
    });

    return (
        <div>
            <div className="table">{listMark}</div>
            {winner ? <h2>Winner {winner}</h2> : <h2>Player: {player}</h2>}
            <button onClick={handleRestart}>Restart</button>
        </div>
    );
}

function App() {
    return (
        <div>
            <Table />
        </div>
    );
}

export default App;

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

function calculateWinner(squares: TurnPlayer[]) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[b] === squares[c]
        ) {
            return lines[i];
        }
    }
}
