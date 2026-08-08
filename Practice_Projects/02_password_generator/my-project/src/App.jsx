
import { useCallback, useState , useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if(character) str += "!@#$^*{}"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, number, character])

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 4)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 py-5'>
        <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white rounded-lg'
            placeholder='Password'
            readOnly
            ref={passwordRef}
         />
         <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={25} 
            value={length}
            className='cursor-pointer mb-4'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className='mb-4'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input className='mb-4'
          type="checkbox"  
          defaultChecked = {number}
          id="numberinput"
          onChange={()=>{
            setNumber((prev) => !prev) 
          }}
           />
           <label htmlFor="numberinput" className='mb-4'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          id="characterinput" 
          className='mb-4'
            defaultChecked={character}
            onChange={()=>{
              setCharacter((prev) => !prev)
            }}

          />
          <label htmlFor="characterinput" className='mb-4'>Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
