import React, { useState } from "react";

const Game = () => {
	const WIN_CONDITION = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 6],
		[0, 4, 8],
		[2, 4, 6],
	];

	const [box, setBox] = useState(Array(9).fill(null));
	const [xPlaying, setXPlaying] = useState(true);
	const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
	const [gameOver, setGameOver] = useState(false);

	const handleBoxClick = (boxIdx) => {
		const updated = box.map((val, idx) => {
			if (idx === boxIdx) {
				return xPlaying === true ? "X" : "O";
			} else {
				return val;
			}
		});
		const winner = checkWinner(updated);
		if (winner) {
			if (winner === "O") {
				let { oScore } = scores;
				oScore += 1;
				setScores({ ...scores, oScore });
			} else {
				let { xScore } = scores;
				xScore += 1;
				setScores({ ...scores, xScore });
			}
		}
		setBox(updated);
		setXPlaying(!xPlaying);
	};
	const resetBoard = () => {
		setGameOver(false);
		setBox(Array(9).fill(null));
	};
	const checkWinner = (board) => {
		for (let i = 0; i < WIN_CONDITION.length; i++) {
			const [x, y, z] = WIN_CONDITION[i];
			if (board[x] && board[x] === board[y] && board[y] === board[z]) {
				setGameOver(true);
				return board[x];
			}
		}
	};
	return (
		<>
			<div className='scoreBoard'>
				<span className='x'>X Score: {scores.xScore}</span>
				<span className='o'>O Score: {scores.oScore}</span>
			</div>
			<div className={`turn ${xPlaying ? "x" : "o"}`}>
				Turn : {xPlaying ? "X" : "O"}
			</div>
			<div className='board'>
				{box.map((value, idx) => {
					return (
						<Box
							key={idx}
							value={value}
							onClick={() =>
								gameOver
									? resetBoard()
									: value === null && handleBoxClick(idx)
							}
						/>
					);
				})}
			</div>
			<button className='reset' onClick={resetBoard}>
				Reset
			</button>
		</>
	);
};

export default Game;

export const Box = ({ value, onClick }) => {
	const style = value === "X" ? "box x" : "box o";
	return (
		<div>
			<button className={style} onClick={onClick}>
				{value}
			</button>
		</div>
	);
};
