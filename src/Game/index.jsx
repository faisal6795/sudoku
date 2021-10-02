import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './styles.scss';
import { sudoku } from '../sudoku';
import backIcon from '../assets/left.svg';

const SIZE = 9;
const DIFFICULTY = [30, 40, 50, 60];

const BackButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    background: transparent url(${backIcon}) no-repeat center;

    &:focus,
    &:hover {
        background-color: #efefef;
    }
`;

export default function Game({ gotoDashboard, level }) {
    const [solution, setSolution] = useState(formatGrid(sudoku));
    const [userGrid, setUserGrid] = useState(getGridToShow());
    const [selectedBlock, setSelectedBlock] = useState([]);

    function formatGrid(grid) {
        return grid.map((row, rowIndex) =>
            row.map((num, colIndex) => ({ id: `${rowIndex}${colIndex}`, num }))
        );
    }

    function getGridToShow() {
        const grid = [...solution];
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
        return grid;
    }

    function getBlocks() {
        const blocks = [];
        userGrid.forEach((rowValue, rowIndex) => {
            const rowBlocks = [];
            rowValue.forEach((item) => {
                const customClassName =
                    selectedBlock[0] === item.id
                        ? 'selected'
                        : selectedBlock.includes(item.id)
                        ? 'active'
                        : '';
                rowBlocks.push(
                    <button
                        key={item.id}
                        id={`button-${item.id}`}
                        className={customClassName}
                        onClick={() => handleBlockClick(item.id)}
                    >
                        {item.num}
                    </button>
                );
            });
            blocks.push(
                <div key={rowIndex} className="row">
                    {rowBlocks}
                </div>
            );
        });
        return blocks;
    }

    function getNumbers() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, '\u2715'].map((item, index) => (
            <button key={index} onClick={() => handleNumberClick(item)}>
                {item}
            </button>
        ));
    }

    function handleBlockClick([row, col]) {
        const selected = [`${row}${col}`];
        for (let i = 0; i < SIZE; i++) {
            selected.push(`${row}${i}`, `${i}${col}`);
            // TODO add 3x3 grid ids
        }
        setSelectedBlock(selected);
    }

    function handleNumberClick(key) {
        if (!selectedBlock.length) return;
        const [row, col] = selectedBlock[0];
        setSolution((prev) => {
            prev[row][col].num = isNaN(key) ? '' : key;
            return [...prev];
        });
    }

    return (
        <div className="game">
            <BackButton onClick={() => gotoDashboard()} />
            <div className="board-wrapper">{getBlocks()}</div>
            <div className="number-wrapper">{getNumbers()}</div>
        </div>
    );
}

Game.propTypes = {
    gotoDashboard: PropTypes.func,
    level: PropTypes.number,
};
