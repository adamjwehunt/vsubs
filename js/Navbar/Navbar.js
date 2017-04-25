import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import VideoSearch from '../VideoSearch/VideoSearch'
import config from '../../config'
import './Navbar.css'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.yourCallback = this.yourCallback.bind(this)
  }
  yourCallback (searchResults) {
    console.log('searchResults are: ', searchResults)
  }
  render () {
    return (
      <div className='navbar'>
        <AppBar
          className='appbar'
          showMenuIconButton={false}
          >
          <div className='logo-wrap'>
            <h1>
              <span className='appbar-vee'>v</span>
              <span className='appbar-subs'>subs</span>
            </h1>
          </div>
          <Route component={(props) =>
            <VideoSearch {...props}
              apiKey={config.youtubeApiKey}
              callback={this.yourCallback}
            />}
          />
        </AppBar>
      </div>
    )
  }
}

export default Navbar
