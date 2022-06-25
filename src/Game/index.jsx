/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { sudoku } from '../sudoku';
import './styles.scss';
import classNames from 'classnames';

const SIZE = 9;
const DIFFICULTY = [30, 40, 50, 60];

export default function Game({ gotoDashboard, level }) {
	const [userGrid, setUserGrid] = useState([]);
	const [selectedBlock, setSelectedBlock] = useState([]);
	const [errorBlock, setErrorBlock] = useState([]);
	const parentRef = useRef();

	useEffect(() => initializeGrid(), []);

	const formatGrid = (grid) =>
		grid.map((row, rowIndex) =>
			row.map((num, colIndex) => ({ id: `${rowIndex}${colIndex}`, num })),
		);

	const initializeGrid = () => {
		const grid = [...formatGrid(sudoku())];
		let emptyBlockCount = DIFFICULTY[level] / 2;

		while (emptyBlockCount > 0) {
			const rowIndex = Math.floor(Math.random() * SIZE);
			const colIndex = Math.floor(Math.random() * SIZE);
			if (grid[rowIndex][colIndex].num) {
				grid[rowIndex][colIndex].num = '';
				grid[SIZE - rowIndex - 1][SIZE - colIndex - 1].num = '';
				emptyBlockCount--;
			}
		}
		setUserGrid(grid);
		setSelectedBlock([]);
		setErrorBlock([]);
	};

	const getBlocks = () =>
		userGrid.map((rowValue, rowIndex) => (
			<div key={rowIndex} className="row">
				{rowValue.map((item) => (
					<button
						key={item.id}
						id={`button-${item.id}`}
						onClick={() => handleBlockClick(item.id)}
						className={classNames({
							readonly: item.num,
							active: selectedBlock.includes(item.id),
							selected: selectedBlock[0] === item.id,
							error: errorBlock.includes(item.id),
						})}>
						{item.num}
					</button>
				))}
			</div>
		));

	const getNumbers = () =>
		[1, 2, 3, 4, 5, 6, 7, 8, 9, '\u2715'].map((item, index) => (
			<button key={index} onClick={() => handleNumberClick(item)}>
				{item}
			</button>
		));

	const get3x3Coordinates = (row, col) => {
		const coordinates = [];
		for (let i = 0; i < 3; i++)
			for (let j = 0; j < 3; j++)
				coordinates.push(`${Math.floor(row / 3) * 3 + i}${Math.floor(col / 3) * 3 + j}`);
		return coordinates;
	};

	const getValue = (row, col) => parentRef.current.children[+row].children[+col].innerText;

	const setValue = (row, col, value) =>
		(parentRef.current.children[+row].children[+col].innerText = value);

	const checkForValidGrid = (row, col, key) => {
		if (selectedBlock.some((item) => key === +getValue(...item)))
			setErrorBlock((prev) => [...prev, `${row}${col}`]);
		else setErrorBlock((prev) => prev.filter((item) => item !== `${row}${col}`));
	};

	const reCheckForValidGrid = () => {
		// TODO for different block same number
	};

	const checkForGameOver = () => {
		if (
			[...parentRef.current.children].every((row) =>
				[...row.children].every((col) => col.innerText),
			)
		)
			alert('you won');
	};

	const handleBlockClick = ([row, col]) => {
		if (`${row}${col}` === selectedBlock[0]) {
			setSelectedBlock([]);
			return;
		}
		const selected = [`${row}${col}`];
		for (let i = 0; i < SIZE; i++) {
			selected.push(`${row}${i}`, `${i}${col}`);
		}
		selected.push(...get3x3Coordinates(row, col));
		setSelectedBlock([...new Set(selected)]);
	};

	const handleNumberClick = (key) => {
		if (!selectedBlock.length) return;
		const [[row, col]] = selectedBlock;
		if (userGrid[+row][+col].num) return;
		checkForValidGrid(row, col, key);
		setValue(row, col, isNaN(key) ? '' : key);
		reCheckForValidGrid();
		checkForGameOver();
	};

	return (
		<div className="game">
			<button title="Back" className="back-btn" onClick={() => gotoDashboard()} />
			<div ref={parentRef} className="board-wrapper">
				{getBlocks()}
			</div>
			<div className="number-wrapper">{getNumbers()}</div>
		</div>
	);
}

Game.propTypes = {
	gotoDashboard: PropTypes.func,
	level: PropTypes.number,
};
