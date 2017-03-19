import React from 'react'
import Paper from 'material-ui/Paper'
const { shape, string } = React.PropTypes
import './YoutubePlayer.css'

const YoutubePlayer = React.createClass({
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
      <div className='videowrap'>
        <Paper className='video-container' zDepth={3}>
          <iframe
            src={`https://www.youtube.com/embed/${match.params.id}`}
            frameBorder='0'
            allowFullScreen
          />
        </Paper>
      </div>
    )
  }
})

export default YoutubePlayer
