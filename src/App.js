import React, { useState } from 'react';
import './App.css';

function SpinLockDigit({ digit, onChange}){
  let incrementDigit = (digit + 1) % 10;
  let decrementDigit = digit > 0 ? digit - 1 : 9;
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <button onClick = {() => onChange(incrementDigit)}>+</button>
    { digit }
    <button onClick = {() => onChange(decrementDigit)}>-</button>
  </div>
  )
}

function App() {
  const password = [2, 2, 3];
  let [digits, setDigits] = useState([1, 1, 1]);
  let [isUnlocked, setIsUnlocked] = useState(false);

  let setDigitAtIndex = (digit, idx) => {
    setDigits((currentDigits) => [
      ...currentDigits.slice(0, idx),
      digit,
      ...currentDigits.slice(idx + 1)
    ]);
  };

  let checkPassword = () => {
    for (let i = 0; i < password.length; i++) {
      if (password[i] !== digits[i]){
        return;
      }
    }
    setIsUnlocked(true);
  }

  return (
  <section>
    <div style={{display: 'flex'}}>
      <SpinLockDigit className="nums" digit={digits[0]} onChange={(newDigit) => setDigitAtIndex(newDigit, 0)}/>
      <SpinLockDigit className="nums" digit={digits[1]} onChange={(newDigit) => setDigitAtIndex(newDigit, 1)}/>
      <SpinLockDigit className="nums" digit={digits[2]} onChange={(newDigit) => setDigitAtIndex(newDigit, 2)}/>
    </div>
    <button onClick={() => checkPassword()}>Press me!</button>
    { isUnlocked && <p>Unlocked!</p>}
    
  </section>
  );
}

export default App;
