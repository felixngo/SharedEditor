import React from 'react';
import './App.css';
import Editor from "./Components/editor";

declare global {
    interface Window { view: any; }
}

function App() {

  return (
    <div className="App">
        <Editor />
    </div>
  );
}

export default App;
