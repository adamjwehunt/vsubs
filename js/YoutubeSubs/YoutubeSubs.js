import React from 'react'
import { getYoutubeSubs } from '../services/youtubeSubsService.js'
import './YoutubeSubs.css'
const { string, func } = React.PropTypes

const YoutubeSubs = React.createClass({
  propTypes: {
    id: string,
    seekTo: func
  },
  getInitialState () {
    return {
      transcript: []
    }
  },
  componentDidMount () {
    getYoutubeSubs(this.props.id).then(res => {
      this.setState({
        transcript: res.transcript.text
      })
    })
  },
  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      getYoutubeSubs(nextProps.id).then(res => {
        this.setState({
          transcript: res.transcript.text
        })
      })
    }
  },
  seekTo (startSeconds) {
    this.props.seekTo(startSeconds)
  },
  render () {
    var transcript = this.state.transcript.map((phrase) => {
      let startSeconds = phrase.start[0]
      let date = new Date(null)
      date.setSeconds(startSeconds)
      let startTime = date.toISOString().substr(11, 8)
      if (date.toISOString().substr(11, 2) === '00') {
        startTime = date.toISOString().substr(14, 5)
      }
      return (
        <div key={startTime} className='phrase' onClick={() => this.seekTo(startSeconds)} >
          <p>{startTime}</p>
          <p>{phrase.subtitle}</p>
        </div>
      )
    })
    return (
      <div className='subs-container'>
        {transcript}
      </div>
    )
  }
})

export default YoutubeSubs
