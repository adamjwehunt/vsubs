import React from 'react'
import Paper from 'material-ui/Paper'
import { getYoutubeSubs } from '../services/youtubeSubsService.js'
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
  getInitialState () {
    return {
      testString: []
    }
  },
  componentWillMount () {
    getYoutubeSubs(this.props.match.params.id).then(res => {
      this.setState({
        testString: res.transcript.text
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
        <Paper className='subs-container' zDepth={3}>
          <div>
            {this.state.testString.map((x) => {
              return (
                <div key={x.start[0]}>{x.subtitle}</div>
              )
            })
            }
          </div>
        </Paper>
      </div>
    )
  }
})

export default YoutubePlayer
