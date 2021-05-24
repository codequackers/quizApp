import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App 
      chapter={'chapter4'}
      shuffleSeed={Math.random()}
      startTime={Date.now()}  
    />
  </React.StrictMode>,
  document.getElementById('root')
);
