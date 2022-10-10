import React from 'react';
import './style.css';

export const Wrapper = ({
  children
}):JSX.Element => {
  return (
    <div className="wrapper">{children}</div>
  )
}
