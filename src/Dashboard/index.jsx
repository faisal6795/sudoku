import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Button from '../Button';
import leftIcon from '../assets/left.svg';
import logo from '../assets/logo.svg';
import IconButton from '../IconButton';

const LEVELS = ['Easy', 'Medium', 'Hard', 'Extreme'];

export default function Dashboard({ gotoGame, level, changeLevel }) {
	const title = 'Sudoku';
	const btnText = 'New Game';

	function decreaseLevel() {
		changeLevel(level > 0 ? level - 1 : 0);
	}

	function increaseLevel() {
		const len = LEVELS.length - 1;
		changeLevel(level < len ? level + 1 : len);
	}

	function handleClick() {
		gotoGame();
	}

	return (
		<div className="dashboard">
			<h1>{title}</h1>
			<img src={logo} alt="sudoku logo" />
			<div className="level-selection">
				<IconButton iconSrc={leftIcon} handleClick={decreaseLevel}></IconButton>
				<p>{LEVELS[level]}</p>
				<IconButton iconSrc={leftIcon} isFlipped handleClick={increaseLevel}></IconButton>
			</div>
			<Button text={btnText} handleClick={handleClick} />
		</div>
	);
}

Dashboard.propTypes = {
	gotoGame: PropTypes.func,
	level: PropTypes.number,
	changeLevel: PropTypes.func,
};
