import React from 'react'
import { Route } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import VideoSearch from '../VideoSearch/VideoSearch'
import config from '../../config'
import './Navbar.css'

const Navbar = React.createClass({
  yourCallback (searchResults) {
    console.log('searchResults are: ', searchResults)
  },
  render () {
    return (
      <div>
        <AppBar
          title='vSubs'
          showMenuIconButton={false}
          >
          <Route component={(props) => <VideoSearch {...props}
            apiKey={config.youtubeApiKey}
            callback={this.yourCallback}
          />}
          />
        </AppBar>
      </div>
    )
  }
})

export default Navbar
