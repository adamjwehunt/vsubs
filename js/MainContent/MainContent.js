import React from 'react'
import VideoContainer from '../VideoContainer/VideoContainer'
import SubsContainer from '../SubsContainer/SubsContainer'
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
      seekTo: '0'
    }
  },
  seekTo (startSeconds) {
    this.setState({
      seekTo: startSeconds
    })
  },
  render () {
    const { match } = this.props
    return (
      <div>
        <VideoContainer params={match.params.id} seekTo={this.state.seekTo} />
        <SubsContainer params={match.params.id} seekTo={this.seekTo} />
      </div>
    )
  }
})

export default MainContent
