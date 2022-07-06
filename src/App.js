import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  // APIKey =process.env.REACT_APP_NEWS_API
  const APIKey ="7a631e85e52e4a7196363c8708448608"
  
  const pageSize = 20;
  const [progress, setProgress] = useState(0)

    return (
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/business" element={<News APIKey = {APIKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" cetegory="business" />} />
          <Route exact path="/entertainment" element={<News APIKey = {APIKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" cetegory="entertainment" />} />
          <Route exact path="/general" element={<News APIKey = {APIKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" cetegory="general" />} />
          <Route exact path="/health" element={<News APIKey = {APIKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" cetegory="health" />} />
          <Route exact path="/science" element={<News APIKey = {APIKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" cetegory="science" />} />
          <Route exact path="/sports" element={<News APIKey = {APIKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" cetegory="sports" />} />
          <Route exact path="/technology" element={<News APIKey = {APIKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" cetegory="technology" />} />
          <Route exact path="/" element={<News APIKey = {APIKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" cetegory="general" />} />
        </Routes>
      </Router>


    )
}

export default App;