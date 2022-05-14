import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIconButton = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	border: 1px solid #ddd;
	border-radius: 50%;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
	background: transparent url(${(props) => props.iconSrc}) no-repeat center;
	${(props) => props.isFlipped && 'transform: rotate(180deg);'}

	&:focus, 
    &:hover {
		background-color: #efefef;
	}
`;

function IconButton({ iconSrc, handleClick, isFlipped = false }) {
	return <StyledIconButton iconSrc={iconSrc} onClick={handleClick} isFlipped={isFlipped} />;
}

IconButton.propTypes = {
	iconSrc: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
	isFlipped: PropTypes.bool,
};

export default IconButton;
