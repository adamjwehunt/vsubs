import React from 'react'
import VideoContainer from '../VideoContainer/VideoContainer'
import SubsContainer from '../SubsContainer/SubsContainer'
import './MainContent.css'
const { shape, string } = React.PropTypes

const MainContent = React.createClass({
  propTypes: {
    match: shape({
      params: shape({
        id: string
      })
    })
  },
  getInitialState () {
    return {
      seekTo: ' ',
      videoTimer: ' '
    }
  },
  seekTo (startSeconds) {
    this.setState({
      seekTo: startSeconds
    })
  },
  videoTimer (seconds) {
    this.input.videoTimer(seconds)
  },
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
})

export default MainContent
