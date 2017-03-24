import React from 'react'
import Paper from 'material-ui/Paper'
import SubsTools from '../SubsTools/SubsTools'
import YoutubeSubs from '../YoutubeSubs/YoutubeSubs'
import './SubsContainer.css'
const { string } = React.PropTypes

const SubsContainer = React.createClass({
  propTypes: {
    params: string
  },
  render () {
    var subtitles
    var subsType = this.props.params.substr(0, 3)
    if (subsType === 'yt:') {
      subtitles = (
        <YoutubeSubs id={this.props.params.slice(3)} />
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
