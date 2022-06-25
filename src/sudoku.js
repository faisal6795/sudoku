const SIZE = 9;
const NUMBER_LIST = Array.from({ length: SIZE }, (_, i) => i + 1);

const getInitialSudoku = () => {
	const row = shuffleNumbersInArray([...NUMBER_LIST]);
	const sudokuGrid = [row];
	for (let i = 1; i < SIZE; i++)
		sudokuGrid.push(shiftArrayBy([...sudokuGrid[i - 1]], i % 3 === 0 ? 1 : 3));
	return sudokuGrid;
};

const shuffleNumbersInArray = (arr) => {
	return arr
		.map((item) => ({ val: item, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map((item) => item.val);
};

const shiftArrayBy = (arr, placesToBeShifted) => {
	const shifted = arr.splice(0, placesToBeShifted % arr.length);
	return [...arr, ...shifted];
};

const transposeGrid = (grid) => grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));

const rotateGrid = (grid) => {
	const rotateCount = Math.ceil(Math.random() * 3);
	let rotatedGrid = [...grid];
	for (let i = 0; i < rotateCount; i++) {
		rotatedGrid = transposeGrid(rotatedGrid).map((row) => row.reverse());
	}
	return rotatedGrid;
};

const shuffleRows = (grid) => {
	const randomRow = Math.random() > 0.5 ? 1 : 2;
	const factor = SIZE / 3;
	for (let i = 0; i < factor; i++) {
		[grid[i * factor], grid[i * factor + randomRow]] = [
			grid[i * factor + randomRow],
			grid[i * factor],
		];
	}
	return grid;
};

export function isValidGrid(grid) {
	// TODO change this function to calculate incomplete grid
	const tempGrid = [...grid].map((row) => row.map((item) => item.num));
	const isValidRow = (grid, num) => grid.every((row) => row.includes(num));
	const isValidColumn = (grid, num) => isValidRow(transposeGrid(grid), num);
	const isValidBlock = (grid) => {
		const arr = [0, 1, 2];
		const blockIndexes = arr.flatMap((item) => arr.map((num) => ({ row: item, col: num })));

		return blockIndexes.every((_, index) => {
			const block = blockIndexes.reduce((acc, item) => {
				acc.push(grid[item.row + Math.floor(index / 3) * 3][item.col + (index % 3) * 3]);
				return acc;
			}, []);
			return NUMBER_LIST.every((num) => block.includes(num));
		});
	};

	return NUMBER_LIST.every(
		(num) =>
			isValidRow(tempGrid, num) && isValidColumn(tempGrid, num) && isValidBlock(tempGrid),
	);
}

export const sudoku = () => {
	let sudoku = getInitialSudoku();
	sudoku = shuffleRows(sudoku);
	sudoku = rotateGrid(sudoku);
	sudoku = shuffleRows(sudoku);
	return sudoku;
};
