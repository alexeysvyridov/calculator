import React from 'react'
import './style.css';
type HistoryList = {
    historyList: HistoryValues[],
}

export const HistoryList = ({
    historyList,
}) => {

  const renderList = () => {
    if (historyList.length === 0) {
      return (
        <div>No history</div>
      )
    }

    return (
      <ul>
        {historyList.map((history: HistoryValues) => {
          return (
            <HistoryItem 
              date={history.date}
              historyItem={history.historyItem}
            />
          )
        })}
    </ul>
    )


  }
  return (
    <div className="list-box">
        {renderList()}
    </div>
  )
}

function HistoryItem(props) {
  const {date, historyItem} = props as HistoryValues;
  return (
    <li  className="row" key={date + historyItem}>
      <div>Date: {date.substring(0, 10)}</div>
      <div>result: {historyItem}</div>
    </li>
  );
}