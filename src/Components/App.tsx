import React from 'react';
import './App.css';
import { Wrapper } from './Wrapper';
import { Screen } from './Screen';
import { ButtonBox } from './ButtonBox';
import { Button } from './Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7,8,9, "X"],
  [4, 5, 6, "-"],
  [1 , 2 , 3, "+"],
  [0, ".", "="],
]

function App():JSX.Element {
  return (
    <Wrapper>
      <Screen value="0" />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
            key={i}
            className={btn === "=" ? "equals" : ""}
            value={btn}
            onClick={() => {
              console.log(`click ${btn}`)
            }}
          />
          )
        })}
    
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
