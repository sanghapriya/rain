import React , { useRef, useState,useEffect } from "react";
import Sketch from "./components/Sketch";

function App() {

  const [number1, setNumber1] = useState(100);
  const [number2, setNumber2] = useState(200);
 

  const handleNumber1Change = (event) => {
    setNumber1(Number(event.target.value));
  };

  const handleNumber2Change = (event) => {
    setNumber2(Number(event.target.value));
  };



 

  return (
    <div className="App">
      <div>
      <label>
        Number 1:
        <input type="range" min="0" max="400" value={number1} onChange={handleNumber1Change} />
        <span>{number1}</span>
      </label>
      <br />
      <label>
        Number 2:
        <input type="range" min="0" max="400" value={number2} onChange={handleNumber2Change} />
        <span>{number2}</span>
      </label>

      <h1>         Rain              </h1>


    </div>

      <Sketch width= {number1} height= {number2 } />
    </div>
  );
}

export default App;
