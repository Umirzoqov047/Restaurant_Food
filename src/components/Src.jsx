
import { useState } from 'react';
export default function Src({cb = Function.prototype}){
  const [value, setValue] = useState("")
  const handleKey = (e) => {
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }
  const handleSubmit = ()=>{
    cb(value)
  }
  
  return(
    <div className="row"  >
      <div className="input-fields col s12" style={{
      display: 'flex',marginTop: '15px'
      }}>
        <input type="search" id='search-field' placeholder='Search' onKeyDown={handleKey} onChange={(e) => setValue(e.target.value)}
        value={value} />
        <button className='btn'  onClick={handleSubmit}>Search</button>
      </div>
    </div>
  )
}