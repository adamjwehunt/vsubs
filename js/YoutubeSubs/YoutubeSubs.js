import React from 'react'
import { getYoutubeSubs } from '../services/youtubeSubsService.js'

import './YoutubeSubs.css'
const { string } = React.PropTypes

const YoutubeSubs = React.createClass({
  propTypes: {
    id: string
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
  render () {
    var transcript = this.state.transcript.map((phrase) => {
      let date = new Date(null)
      date.setSeconds(phrase.start[0])
      let result = date.toISOString().substr(11, 8)
      if (date.toISOString().substr(11, 2) === '00') {
        result = date.toISOString().substr(14, 5)
      }
      return (
        <div key={phrase.start[0]} className='phrase'>
          <p>{result}</p>
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
