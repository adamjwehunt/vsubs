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
  render () {
    const { match } = this.props
    return (
      <div>
        <VideoContainer params={match.params.id} />
        <SubsContainer params={match.params.id} />
      </div>
    )
  }
})

export default MainContent
