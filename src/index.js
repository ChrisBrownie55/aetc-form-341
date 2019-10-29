import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import Form341 from './components/Form341';

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <h2>Your form:</h2>
      <Form341 />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
