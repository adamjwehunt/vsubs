import React from 'react'
import YouTube from 'react-youtube'
const { string } = React.PropTypes
import './YoutubePlayer.css'

var currentTime, stopTimer, startTimer, timer

const YoutubePlayer = React.createClass({
  propTypes: {
    id: string,
    seekTo: string
  },
  getInitialState () {
    return {
      seek: () => {}
    }
  },
  componentWillReceiveProps (nextProps) {
    this.state.seek(nextProps.seekTo)
  },
  onReady (event) {  // on video ready => initialize Seek method
    this.setState({
      seek: (seekSpot) => {
        event.target.seekTo(parseInt(seekSpot))
      }
    })
  },
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
  },
  test () {
    console.log('test')
  },
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
        onApiChange={this.test}
        opts={opts}
      />
    )
  }
})

export default YoutubePlayer
