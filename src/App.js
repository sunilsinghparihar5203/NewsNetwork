import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  c = "Sanju";
  pageSize = 20;
  render() {
    return (
      <Router>
       <Navbar />
       <Routes>
          <Route exact path="/business"       element={ <News key="business" pageSize={this.pageSize} country="in" cetegory ="business"/>} />
          <Route exact path="/entertainment"  element={ <News key="entertainment" pageSize={this.pageSize} country="in" cetegory ="entertainment"/>} />
          <Route exact path="/general"        element={ <News key="general" pageSize={this.pageSize} country="in" cetegory ="general"/>} />
          <Route exact path="/health"         element={ <News key="health" pageSize={this.pageSize} country="in" cetegory ="health"/>} />
          <Route exact path="/science"        element={ <News key="science" pageSize={this.pageSize} country="in" cetegory ="science"/>} />
          <Route exact path="/sports"         element={ <News key="sports" pageSize={this.pageSize} country="in" cetegory ="sports"/>} />
          <Route exact path="/technology"     element={ <News key="technology" pageSize={this.pageSize} country="in" cetegory ="technology"/>} />
          <Route exact path="/"               element={ <News key="general" pageSize={this.pageSize} country="in" cetegory ="general"/>} />
        </Routes>
      </Router>


    )
  }
}
