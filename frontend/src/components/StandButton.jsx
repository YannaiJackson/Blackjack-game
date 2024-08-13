import React from 'react'

function StandButton() {
  const handleClick = () => {
    console.log(`Player stand successful`);
  };
    

  return (
    <button onClick={handleClick}>
    Stand
    </button>
  )
}

export default StandButton