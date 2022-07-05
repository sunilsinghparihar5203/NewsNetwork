import './App.css';
import React, { Component, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  // APIKey =process.env.REACT_APP_NEWS_API
  APIKey ="7a631e85e52e4a7196363c8708448608"
  
  pageSize = 20;
  state ={
    progress : 0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <Routes>
          <Route exact path="/business" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" cetegory="business" />} />
          <Route exact path="/entertainment" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" cetegory="entertainment" />} />
          <Route exact path="/general" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" cetegory="general" />} />
          <Route exact path="/health" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" cetegory="health" />} />
          <Route exact path="/science" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" cetegory="science" />} />
          <Route exact path="/sports" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" cetegory="sports" />} />
          <Route exact path="/technology" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" cetegory="technology" />} />
          <Route exact path="/" element={<News APIKey = {this.APIKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" cetegory="general" />} />
        </Routes>
      </Router>


    )
  }
}
