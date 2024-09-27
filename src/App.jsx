import { useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed]= useState(false);
  const [characterAllowed, setCharacterAllowed]=useState(false);
  const [password, setPassword]= useState("")
  const generatePassword = useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let num='0123456789'
    let char='!@#$%^&*'
    if(numberAllowed) str+=num;
    if(characterAllowed) str+=char;
    for(let i=0; i<length; i++){
      let pchar = str.charAt(Math.floor(Math.random()*str.length+1))
      pass+=pchar
    }
    setPassword(pass)
  },[length, numberAllowed, characterAllowed, setPassword])

  const passwordRef = useRef(null)
  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    generatePassword()
  },[length, numberAllowed, characterAllowed, generatePassword]
  )

  return (
    <>
      <div className='w-full max-w-md bg-gray-600 my-8 py-3 px-4 mx-auto rounded-lg text-white'>
      <h1 className='text-center p-4 text-3xl'>Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden mb-4'>
          <input
           type="text"
           className='outline-none w-full py-1 px-3 text-black'
           value={password}
           placeholder='Password'
           readOnly
           ref={passwordRef}
          />
          <button 
          className='bg-blue-600 text-white py-1 px-3'
          onClick={
            copyToClipboard
          } >Copy</button>
        </div>
        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            className='cursor-pointer'
            id='Length'
            onChange={(e)=>{
              setLength(e.target.value)
            }} />
            <label htmlFor="Length">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed(true)
            }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={characterAllowed}
            id='characterInput'
            onChange={()=>{
              setCharacterAllowed(true)
            }}
            />
            <label htmlFor="charaterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
