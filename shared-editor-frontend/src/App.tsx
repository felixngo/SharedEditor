import React from 'react';
import Editor from "./Components/editor";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Homepage from "./Components/Homepage";
import DocumentView from "./Components/Document/DocumentView";

declare global {
    interface Window { view: any; }
}

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/docs/:id" element={< DocumentView/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
