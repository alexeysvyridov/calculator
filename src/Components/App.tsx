import React, {useState} from 'react';
import './App.css';
import { Wrapper } from './Wrapper';
import { Screen } from './Screen';
import { ButtonBox } from './ButtonBox';
import { Button } from './Button';
import {removeSpaces, toLocaleString} from '../helpers';
import {btnValues} from '../consts';


function App():JSX.Element {
  const [calc, setCalc] = useState<{
    sign: string,
    num: number,
    res: number | string,
  }>({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (value) => {
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? 0
            : +removeSpaces(calc.num) % 1 === 0
            ? +toLocaleString(Number(removeSpaces(calc.num + value)))
            : +toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? +toLocaleString(+removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? +toLocaleString(+removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
  
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        if (sign === '+') return a + b;
        if (sign === '-') return a - b;
        if (sign === 'X') return a * b;
        return a / b;
      }

      setCalc({
        ...calc,
        res: 
          calc.num === 0 && calc.sign === "/"
          ? "Can't divide with 0"
          : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
          ),
        sign: "",
        num: 0,
      })
    }
  };

  const signClickHandler = (value) => {
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    })
  };
  const commaClickHandler = (value) => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  };
  const handleActionClick = (btn, e) => {
    e.preventDefault()
    const value = e.target.innerHTML;

    switch (btn) {
      case "C":
        resetClickHandler()
        break;
      case "+-": 
        invertClickHandler()
        break;
      case "%": 
        percentClickHandler()
        break;
      case "=": 
        equalsClickHandler()
        break;
      case "/": 
      case "X": 
      case "-": 
      case "+": 
        signClickHandler(value)
        break;
      case ".": 
        commaClickHandler(value)
        break;
      default:
        numClickHandler(value)
        break;
    }
  };
  
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
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
