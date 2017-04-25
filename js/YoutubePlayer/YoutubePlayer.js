import React, { Component } from 'react'
import YouTube from 'react-youtube'
import './YoutubePlayer.css'

var currentTime, stopTimer, startTimer, timer

class YoutubePlayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      seek: () => {}
    }
    this.onReady = this.onReady.bind(this)
    this.onYoutubeStateChange = this.onYoutubeStateChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.state.seek(nextProps.seekTo)
  }
  onReady (event) {  // on video ready => initialize Seek method
    this.setState({
      seek: (seekSpot) => {
        event.target.seekTo(parseInt(seekSpot))
      }
    })
  }
  onYoutubeStateChange (event) {  // on video state change => set timer
    var _this = this
    if (startTimer) {
      stopTimer()
    }
    startTimer = function () {
      timer = setInterval(() => {
        currentTime = Math.round(event.target.getCurrentTime())
        _this.props.videoTimer(currentTime)
      }, 1000)
      stopTimer = function () {
        clearInterval(timer)
      }
    }
    if (event.data === -1) {  // Started
      startTimer()
    } else if (event.data === 0) {  // Ended
      stopTimer()
    } else if (event.data === 1) {  // Playing
      startTimer()
    } else if (event.data === 2) {  // Paused
      stopTimer()
    } else if (event.data === 3) {  // Buffering
      stopTimer()
    } else if (event.data === 5) {  // Video Cued
      stopTimer()
    }
  }
  render () {
    const opts = {
      height: '480',
      width: '853',
      playerVars: {
        modestbranding: 1,  // limited youtube branding
        rel: 0,  // no related video links
        iv_load_policy: 3  // no annotations
      }
    }
    return (
      <YouTube
        videoId={this.props.id}
        onReady={this.onReady}
        onStateChange={this.onYoutubeStateChange}
        opts={opts}
      />
    )
  }
}

YoutubePlayer.propTypes = {
  id: React.PropTypes.string,
  seekTo: React.PropTypes.string
}

export default YoutubePlayer
