import React, { useState, useRef } from "react";

import CalculatorButton from "./components/Calculator/CalculatorButton/CalculatorButton";
import Container from "./components/Calculator/Container/Container";

import "./App.css";

function App() {
  const inputRef = useRef();
  const outputRef = useRef();

  const [calculated, setCalculated] = useState(false);

  const deleteLast = () => {
    const input = inputRef.current;
    input.innerHTML = input.innerHTML.slice(0, -1);
  };

  const clear = () => {
    clearEntry();
    outputRef.current.innerHTML = "";
  };

  const clearEntry = () => {
    inputRef.current.innerHTML = "0";
  };

  const calculate = () => {
    const input = inputRef.current;
    const output = outputRef.current;

    const operator = output.innerHTML.slice(-1);
    const inputOperand = +input.innerHTML;
    const outputOperand = +output.innerHTML.slice(0, -1);

    if (inputOperand === 0 || !isNaN(operator)) {
      output.innerHTML = input.innerHTML;
      if (input.innerHTML.slice(-1) === ".") {
        output.innerHTML = input.innerHTML.slice(0, -1);
      }
      return;
    }

    let result;

    switch (operator) {
      case "+":
        result = outputOperand + inputOperand;
        break;
      case "-":
        result = outputOperand - inputOperand;
        break;
      case "*":
        result = outputOperand * inputOperand;
        break;
      case "/":
        result = outputOperand / inputOperand;
        break;
      default:
        result = inputOperand;
        break;
    }

    output.innerHTML += input.innerHTML;
    input.innerHTML = result;
    setCalculated(true);
  };

  const insert = (event) => {
    const input = inputRef.current;
    const output = outputRef.current;
    const inputValue = input.innerHTML;
    const outputValue = output.innerHTML;
    const outputLast = outputValue.slice(-1);
    const toInsert = event.target.innerHTML;
    const operators = ["+", "-", "*", "/"];

    if (
      calculated === true &&
      !operators.includes(outputLast) &&
      !operators.includes(toInsert)
    ) {
      output.innerHTML = "";
      input.innerHTML = "";
      setCalculated(false);
    }

    if (toInsert === ".") {
      if (inputValue.includes(".")) {
        return;
      }
      input.innerHTML += toInsert;
    } else if (!isNaN(toInsert)) {
      if (inputValue === "0") input.innerHTML = toInsert;
      else input.innerHTML += toInsert;
    } else if (
      (inputValue === "" || inputValue === "0") &&
      outputValue !== "" &&
      isNaN(outputLast)
    ) {
      output.innerHTML = outputValue.slice(0, -1) + toInsert;
    } else {
      if (inputValue === "" || inputValue === "0") {
        output.innerHTML += toInsert;
      } else if (outputValue !== "") {
        calculate();
        output.innerHTML = input.innerHTML + toInsert;
      } else {
        output.innerHTML = inputValue + toInsert;
      }
      input.innerHTML = "0";
    }

    input.scrollLeft = input.scrollWidth - input.clientWidth;
    output.scrollLeft = output.scrollWidth - output.clientWidth;
  };

  const convert = () => {
    const input = inputRef.current;
    if (input.innerHTML.slice(0, 1) === "-") {
      input.innerHTML = input.innerHTML.slice(1);
      return;
    }
    input.innerHTML = "-" + input.innerHTML;
  };

  return (
    <Container className='main-container'>
      <p id='output' ref={outputRef}></p>
      <p id='input' ref={inputRef}>
        0
      </p>
      <Container className='row'>
        <CalculatorButton onClick={deleteLast}>DEL</CalculatorButton>
        <CalculatorButton onClick={clearEntry}>CE</CalculatorButton>
        <CalculatorButton onClick={clear}>C</CalculatorButton>
        <CalculatorButton onClick={insert}>/</CalculatorButton>
      </Container>
      <Container className='row'>
        <CalculatorButton onClick={insert}>7</CalculatorButton>
        <CalculatorButton onClick={insert}>8</CalculatorButton>
        <CalculatorButton onClick={insert}>9</CalculatorButton>
        <CalculatorButton onClick={insert}>*</CalculatorButton>
      </Container>
      <Container className='row'>
        <CalculatorButton onClick={insert}>4</CalculatorButton>
        <CalculatorButton onClick={insert}>5</CalculatorButton>
        <CalculatorButton onClick={insert}>6</CalculatorButton>
        <CalculatorButton onClick={insert}>-</CalculatorButton>
      </Container>
      <Container className='row'>
        <CalculatorButton onClick={insert}>1</CalculatorButton>
        <CalculatorButton onClick={insert}>2</CalculatorButton>
        <CalculatorButton onClick={insert}>3</CalculatorButton>
        <CalculatorButton onClick={insert}>+</CalculatorButton>
      </Container>
      <Container className='row'>
        <CalculatorButton onClick={convert}>+/-</CalculatorButton>
        <CalculatorButton onClick={insert}>0</CalculatorButton>
        <CalculatorButton onClick={insert}>.</CalculatorButton>
        <CalculatorButton onClick={calculate}>=</CalculatorButton>
      </Container>
    </Container>
  );
}

export default App;
