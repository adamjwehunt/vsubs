import React from 'react'
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer'
import './VideoContainer.css'
const { string } = React.PropTypes

const VideoContainer = React.createClass({
  propTypes: {
    params: string,
    seekTo: string
  },
  render () {
    const { params, seekTo } = this.props
    var video
    var videoType = params.substr(0, 3)
    if (videoType === 'yt:') {
      video = (
        <YoutubePlayer
          id={params.slice(3)}
          seekTo={seekTo}
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
