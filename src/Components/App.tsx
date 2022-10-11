import React, {useState} from 'react';
import './App.css';
import { Wrapper } from './Wrapper';
import { Screen } from './Screen';
import { ButtonBox } from './ButtonBox';
import { Button } from './Button';
import {btnValues} from '../consts';
import {useAppDispatch, useAppSelector} from '../hooks';
import {commaClick, equalsClick, invertClick, numClick, percentClick, resetClick, signClick} from '../redux/reducers/calcReducer';
import { RootState } from '../redux';

function App():JSX.Element {
  const dispatch = useAppDispatch()
  const calc = useAppSelector((state: RootState) => state.calc);

  console.log(calc);
  const handleActionClick = (btn, e) => {
    e.preventDefault()
    const value = e.target.innerHTML;

    switch (btn) {
      case "C":
        dispatch(resetClick()) 
        break;
      case "+-": 
        dispatch(invertClick()) 
        break;
      case "%": 
        dispatch(percentClick()) 
        break;
      case "=": 
        dispatch(equalsClick())
        break;
      case "/": 
      case "X": 
      case "-": 
      case "+": 
        dispatch(signClick(value))
        break;
      case ".": 
        dispatch(commaClick(value))
        break;
      default:
        dispatch(numClick(value))
        break;
    }
  };

  return (
    <Wrapper>
      {/* <Screen value={calc.res} historyValue={calc.res} /> */}
      <Screen value={calc.num ? calc.num : calc.res} history={calc.history} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
            key={i}
            className={btn === "=" ? "equals" : ""}
            value={btn}
            onClick={(e) => handleActionClick(btn, e)}
          />
          )
        })}
    
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
