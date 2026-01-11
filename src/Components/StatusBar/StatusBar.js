import React from 'react';
import './StatusBar.css';

function StatusBar({ logo, value, max, color, ariaLabel }) {
  const percentage = (value / max) * 100;

  return (
    <div 
      className="status-bar-container" 
      tabIndex="0" 
      aria-valuenow={value} 
      aria-valuemin={0} 
      aria-valuemax={max} 
      aria-label={ariaLabel} 
      role="progressbar"
    >
      <img src={logo} alt="Icono de estado" className='logo' />
      <div className="status-bar-background">
        <div className="status-bar-fill" style={{ width: `${percentage}%`, backgroundColor: `${color}` }}></div>
      </div>
    </div>
  );
}

export default StatusBar;
