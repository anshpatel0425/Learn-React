import { useState } from "react";

function App(){
  let [counter, setCounter] = useState(4)

  let addValue = () => {
    if(counter < 20){
      setCounter(counter + 1)
    } 
    
  }

  let removeValue = () => {
    if(counter > 0){
      setCounter(counter - 1)
    }
    
  }
  return(
    <>
    <h1>Ansh Patel</h1>
    <h3>Counter: {counter}</h3>
    
    <button
    onClick={addValue}
    >Add Value: {counter}</button>
    <br />
    <button
    onClick={removeValue} 
    >Remove Value: {counter}</button>
    </>
  )
}

export default App;