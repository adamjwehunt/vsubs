import React, { Component } from 'react'
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer'
import './VideoContainer.css'

var video, videoType

class VideoContainer extends Component {
  render () {
    const { params, seekTo, videoTimer } = this.props
    videoType = params.substr(0, 3)
    if (videoType === 'yt:') {
      video = (
        <YoutubePlayer
          id={params.slice(3)}
          seekTo={seekTo}
          videoTimer={videoTimer}
        />
      )
    }
    return (
      <div className='theatre'>
        <div className='video-wrap'>
          <div className='video-container'>
            {video}
          </div>
        </div>
      </div>
    )
  }
}

VideoContainer.propTypes = {
  params: React.PropTypes.string,
  seekTo: React.PropTypes.string,
  videoTimer: React.PropTypes.func
}

export default VideoContainer
