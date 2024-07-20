import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
function App() {
  return (
    <div className="App">
      <h1>{/*Bienvenidos a Henry dogs!*/}</h1>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
      </Router>
    </div>
  );
}

export default App;
