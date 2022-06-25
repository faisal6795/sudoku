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

	const decreaseLevel = () => {
		changeLevel(level > 0 ? level - 1 : 0);
	};

	const increaseLevel = () => {
		const len = LEVELS.length - 1;
		changeLevel(level < len ? level + 1 : len);
	};

	return (
		<div className="dashboard">
			<h1>{title}</h1>
			<img src={logo} alt="sudoku logo" />
			<div className="level-selection">
				<IconButton iconSrc={leftIcon} handleClick={decreaseLevel} />
				<p>{LEVELS[level]}</p>
				<IconButton iconSrc={leftIcon} isFlipped handleClick={increaseLevel} />
			</div>
			<Button text={btnText} handleClick={gotoGame} />
		</div>
	);
}

Dashboard.propTypes = {
	gotoGame: PropTypes.func,
	level: PropTypes.number,
	changeLevel: PropTypes.func,
};
