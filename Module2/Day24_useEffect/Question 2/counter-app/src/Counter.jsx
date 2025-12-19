import React, { useEffect , useState} from 'react'

const Counter = () => {
    const[count,setCount]= useState(0)

    useEffect(()=>{
        if (count!==0 && count%3===0){
            alert(`The Current number ${count} is divisibale by 3`)
        }
    },[count])
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  )
}

export default Counter
