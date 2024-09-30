import './App.css';
import Nav from './components/Nav';
import React, { useState } from 'react';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0);
  const apikey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <Router>
        <LoadingBar color='#f11946' height={3} progress={progress} />
        <Nav/>
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} country="in" category="general" key="general" />}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} country="in" category="business" key="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} country="in" category="entertainment" key="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} country="in" category="general" key="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} country="in" category="health" key="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} country="in" category="science" key="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} country="in" category="sports" key="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} country="in" category="technology" key="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
