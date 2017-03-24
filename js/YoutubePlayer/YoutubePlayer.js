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
      seek: ''
    }
  },
  _onReady (event) {
    this.setState({
      seek: function (seekSpot) {
        event.target.seekTo(parseInt(seekSpot))
      }
    })
  },
  componentWillReceiveProps (nextProps) {
    this.state.seek(nextProps.seekTo)
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
