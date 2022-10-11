import React from 'react'
import './style.css'
export const Screen = ({
    value,
    history,
    // historyValue
}) => {
  return (
    <div className="screen">
      {history ? `history: ${history}`: 0}
      <div className="result">{value}</div>
      {/* <div className="history-box">{historyValue}</div> */}
    </div>
  )
}
