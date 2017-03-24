import React from 'react'
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer'
import Paper from 'material-ui/Paper'
import './VideoContainer.css'
const { string } = React.PropTypes

const VideoContainer = React.createClass({
  propTypes: {
    params: string
  },
  render () {
    var video
    var videoType = this.props.params.substr(0, 3)
    if (videoType === 'yt:') {
      video = (
        <YoutubePlayer id={this.props.params.slice(3)} />
      )
    }
    return (
      <div className='video-wrap'>
        <Paper className='video-container' zDepth={3}>
          {video}
        </Paper>
      </div>
    )
  }
})

export default VideoContainer
