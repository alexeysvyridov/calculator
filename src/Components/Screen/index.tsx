import React from 'react'
import './style.css'
export const Screen = ({
    value,
    // historyValue
}) => {
  return (
    <div className="screen">
      <div className="result">{value}</div>
      {/* <div className="history-box">{historyValue}</div> */}
    </div>
  )
}
