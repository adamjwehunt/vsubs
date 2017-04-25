import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import MainContent from './MainContent/MainContent'
import '../public/normalize.css'
import '../public/style.css'

class App extends Component {
  render () {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <Navbar
              className='navbar'
            />
            <Route
              exact path='/'
              component={Home}
              className='home-wrap'
            />
            <Route
              path='/:id'
              component={MainContent}
              className='content-wrap'
            />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

render(<App />, document.getElementById('app'))
