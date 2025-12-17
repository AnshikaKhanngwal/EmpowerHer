import React from 'react'
import { useState } from 'react'

const Counter = () => {
    const [count,setCount]=useState(0)
  return (
    <div>
        <h3>${count}</h3>
      
    </div>
  )
}

export default Counter
