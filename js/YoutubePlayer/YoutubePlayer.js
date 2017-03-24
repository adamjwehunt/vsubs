import React from 'react'
import YouTube from 'react-youtube'
const { string } = React.PropTypes
import './YoutubePlayer.css'

const YoutubePlayer = React.createClass({
  propTypes: {
    id: string
  },
  getInitialState () {
    return {
      seek: ''
    }
  },
  _onReady (event) {
    this.setState({
      seek: function () {
        event.target.seekTo(12)
      }
    })
  },
  render () {
    return (
      <YouTube
        videoId={this.props.id}
        onReady={this._onReady}
      />
    )
  }
})

export default YoutubePlayer
