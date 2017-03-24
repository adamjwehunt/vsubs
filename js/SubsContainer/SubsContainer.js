import React from 'react'
import Paper from 'material-ui/Paper'
import SubsTools from '../SubsTools/SubsTools'
import YoutubeSubs from '../YoutubeSubs/YoutubeSubs'
import './SubsContainer.css'
const { string, func } = React.PropTypes

const SubsContainer = React.createClass({
  propTypes: {
    params: string,
    seekTo: func
  },
  render () {
    var subtitles
    var subsType = this.props.params.substr(0, 3)
    if (subsType === 'yt:') {
      subtitles = (
        <YoutubeSubs id={this.props.params.slice(3)} seekTo={this.props.seekTo} />
      )
    }
    return (
      <div className='subs-wrap'>
        <Paper zDepth={3}>
          <SubsTools />
          {subtitles}
        </Paper>
      </div>
    )
  }
})

export default SubsContainer
