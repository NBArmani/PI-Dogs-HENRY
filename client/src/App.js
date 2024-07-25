import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
import Form from './components/Form/Form'
function App() {
  return (
    <div className="App">
      <h1>{/*Bienvenidos a Henry dogs!*/}</h1>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/conoces-otro-perro" component={Form} />
      </Router>
    </div>
  );
}

export default App;
