import React from 'react';
import Square from './Square';
import styled from 'styled-components';

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: fit-content;
  background-color: #5f9ea0;
  margin-bottom: 20px;
`;

const Board = ({ squares, onClick }) => {
  return (
    <StyledBoard>
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </StyledBoard>
  );
};

export default Board;
