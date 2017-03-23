import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import YoutubePlayer from './YoutubePlayer/YoutubePlayer'
import SubtitleContainer from './SubtitleContainer/SubtitleContainer'
import '../public/normalize.css'
import '../public/style.css'

const App = React.createClass({
  render () {
    return (
      <Router>
        <MuiThemeProvider>
          <div className='app-wrap'>
            <Navbar />
            <Route
              exact path='/'
              component={Home}
              />
            <Route
              path='/:id'
              component={YoutubePlayer}
              />
            <Route
              path='/:id'
              component={SubtitleContainer}
              />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
})

render(<App />, document.getElementById('app'))
