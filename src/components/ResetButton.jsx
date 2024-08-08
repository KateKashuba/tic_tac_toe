import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
padding: 10px 20px;
font-size: 16px;
background-color: #d2691e;
color: #ffffff;
border: none;
cursor: pointer;
border-radius: 10px;
  
  &:hover {
    background-color: #5f9ea0;
  }
`;

const ResetButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Reset</StyledButton>;
};

export default ResetButton;
