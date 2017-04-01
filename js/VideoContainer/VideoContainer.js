import React from 'react'
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer'
import './VideoContainer.css'
const { string, func } = React.PropTypes

var video, videoType

const VideoContainer = React.createClass({
  propTypes: {
    params: string,
    seekTo: string,
    videoTimer: func
  },
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
})

export default VideoContainer
