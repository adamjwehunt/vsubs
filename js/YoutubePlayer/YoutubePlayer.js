import React from 'react'
import YouTube from 'react-youtube'
const { string } = React.PropTypes
import './YoutubePlayer.css'

const YoutubePlayer = React.createClass({
  propTypes: {
    id: string,
    seekTo: string
  },
  getInitialState () {
    return {
      seek: '',
      currentTime: 0,
      timer: '',
      stopTimer: ''
    }
  },
  componentWillReceiveProps (nextProps) {
    this.state.seek(nextProps.seekTo)
  },
  _onReady (event) {
    this.setState({
      seek: (seekSpot) => {
        event.target.seekTo(parseInt(seekSpot))
      }
    })
  },
  onPlay (event) {
    var _this = this
    function startTimer () {
      var timer = setInterval(() => {
        _this.setState({
          currentTime: event.target.getCurrentTime()
        })
        console.log(Math.ceil(_this.state.currentTime))
      }, 1000)
      var stopTimer = function () {
        clearInterval(timer)
      }
      _this.setState({
        stopTimer: stopTimer
      })
    }
    startTimer()
  },
  onStop () {
    this.state.stopTimer()
  },
  render () {
    const opts = {
      height: '480',
      width: '853',
      playerVars: {
        modestbranding: 1
      }
    }
    return (
      <YouTube
        videoId={this.props.id}
        onReady={this._onReady}
        onPlay={this.onPlay}
        onPause={this.onStop}
        onEnd={this.onStop}
        opts={opts}
      />
    )
  }
})

export default YoutubePlayer
