import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.button`
  width: 60px;
  height: 60px;
  font-size: 24px;
  background-color: #ffffff;
  cursor: pointer;
	border: none;
	color: #d2691e;

  &:hover {
    background-color: #f0f0f0;
  }
`;


const Square = ({ value, onClick }) => {
  return <StyledSquare onClick={onClick}>{value}</StyledSquare>;
};

export default Square;
