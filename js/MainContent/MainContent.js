import React, { Component } from 'react'
import VideoContainer from '../VideoContainer/VideoContainer'
import SubsContainer from '../SubsContainer/SubsContainer'
import './MainContent.css'

class MainContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      seekTo: ' ',
      videoTimer: ' '
    }
    this.seekTo = this.seekTo.bind(this)
    this.videoTimer = this.videoTimer.bind(this)
  }
  seekTo (startSeconds) {
    this.setState({
      seekTo: startSeconds
    })
  }
  videoTimer (seconds) {
    this.input.videoTimer(seconds)
  }
  render () {
    const { match } = this.props
    return (
      <div>
        <VideoContainer
          params={match.params.id}
          seekTo={this.state.seekTo}
          videoTimer={this.videoTimer}
        />
        <SubsContainer
          params={match.params.id}
          seekTo={this.seekTo}
          ref={(input) => { this.input = input }}
        />
      </div>
    )
  }
}

MainContent.propTypes = {
  match: React.PropTypes.object,
  params: React.PropTypes.object,
  id: React.PropTypes.string
}

export default MainContent
