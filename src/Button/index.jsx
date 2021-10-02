import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 100%;
    height: 2.5rem;
    border-radius: 2.5rem;
    border: 1px solid #ddd;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:focus,
    &:hover {
        background-color: #efefef;
    }
`;

export default function Button({ text, handleClick }) {
    return <StyledButton onClick={handleClick}>{text}</StyledButton>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};
