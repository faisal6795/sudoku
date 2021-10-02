const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const size = numberList.length;

function getInitialSudoku() {
    const row = shuffleNumbersInArray([...numberList]);
    const sudokuGrid = [row];
    for (let i = 1; i < size; i++) {
        sudokuGrid.push(
            shiftArrayBy([...sudokuGrid[i - 1]], i % 3 === 0 ? 1 : 3)
        );
    }
    return sudokuGrid;
}

function shuffleNumbersInArray(arr) {
    return arr
        .map((item) => ({ val: item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((item) => item.val);
}

function shiftArrayBy(arr, placesToBeShifted) {
    const shifted = arr.splice(0, placesToBeShifted % arr.length);
    return [...arr, ...shifted];
}

function transposeGrid(grid) {
    return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

function rotateGrid(grid) {
    const rotateCount = Math.ceil(Math.random() * 3);
    let rotatedGrid = [...grid];
    for (let i = 0; i < rotateCount; i++) {
        rotatedGrid = transposeGrid(rotatedGrid).map((row) => row.reverse());
    }
    return rotatedGrid;
}

function shuffleRows(grid) {
    const randomRow = Math.random() > 0.5 ? 1 : 2;
    const factor = size / 3;
    for (let i = 0; i < factor; i++) {
        [grid[i * factor], grid[i * factor + randomRow]] = [
            grid[i * factor + randomRow],
            grid[i * factor],
        ];
    }
    return grid;
}

export function isValidGrid(grid) {
    const isValidRow = (grid, num) => grid.every((row) => row.includes(num));
    const isValidColumn = (grid, num) => isValidRow(transposeGrid(grid), num);
    return numberList.every(
        (num) => isValidRow(grid, num) && isValidColumn(grid, num)
    );
}

function generateSudoku() {
    let sudoku = getInitialSudoku();
    sudoku = shuffleRows(sudoku);
    sudoku = rotateGrid(sudoku);
    sudoku = shuffleRows(sudoku);
    return sudoku;
}

export const sudoku = generateSudoku();
