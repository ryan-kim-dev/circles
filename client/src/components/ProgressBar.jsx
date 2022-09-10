import React from 'react';
import styled from 'styled-components';

function ProgressBar({ persent }) {
  return (
    <BarBoundary>
      <BarInside persent={persent}>{persent}</BarInside>
    </BarBoundary>
  );
}

export default ProgressBar;

const BarBoundary = styled.div`
  border: 1px solid black;
  margin-bottom: 20px;
  height: 40px;
  border-radius: 10px;
`;

const BarInside = styled.div`
  background-color: navy;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  color: #ffffff;
  width: ${(props) => props.persent};
  transition: 0.3s;
`;
