import React from 'react'
import { getYoutubeSubs } from '../services/youtubeSubsService.js'
import FlatButton from 'material-ui/FlatButton'
import Highlighter from 'react-highlight-words'
import latinize from 'latinize'
// import $ from 'jquery'
import './YoutubeSubs.css'
const { string, func, array } = React.PropTypes
var Scroll = require('react-scroll')

var Element = Scroll.Element
var scroller = Scroll.scroller

const YoutubeSubs = React.createClass({
  propTypes: {
    id: string,
    seekTo: func,
    subs: array
  },
  getInitialState () {
    return {
      transcript: [],
      hltdPhrases: [],
      currentPhraseIndex: -1
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
    if (document.body.querySelectorAll('.highlighted').length) {
      var hltdElements = document.body.querySelectorAll('.highlighted')
      var hltdPhrases = []
      for (let i = 0; i < hltdElements.length; i++) {
        let phrase = hltdElements[i].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('name')
        if (hltdPhrases.indexOf(phrase) === -1) {
          hltdPhrases.push(phrase)
        }
      }
      this.setState({
        hltdPhrases: hltdPhrases
      })
      console.log(this.state.hltdPhrases)
    }
  },
  componentWillUpdate () {
  },
  componentDidUpdate () {
  },
  seekTo (startSeconds) {
    this.props.seekTo(startSeconds)
  },
  toNextHltdPhrase () {
    console.log('toNextHltdPhrase')
    var hltdPhrases = this.state.hltdPhrases
    var nextPhraseIndex = this.state.currentPhraseIndex + 1
    this.setState({
      currentPhraseIndex: nextPhraseIndex
    })
    if (nextPhraseIndex > -1) {
      console.log(this.state.hltdPhrases)
      console.log(hltdPhrases[nextPhraseIndex])
      scroller.scrollTo(hltdPhrases[nextPhraseIndex], {
        duration: 100,
        delay: 50,
        smooth: true,
        containerId: 'scroll-box'
      })
    }
  },
  toPrevHltdPhrase () {
    console.log('toPrevHltdPhrase')
    var hltdPhrases = this.state.hltdPhrases
    var prevPhraseIndex = this.state.currentPhraseIndex - 1
    this.setState({
      currentPhraseIndex: prevPhraseIndex
    })

    if (prevPhraseIndex > 0) {
      console.log(hltdPhrases[prevPhraseIndex])
      scroller.scrollTo(hltdPhrases[prevPhraseIndex], {
        duration: 100,
        delay: 50,
        smooth: true,
        containerId: 'scroll-box'
      })
    }
  },
  render () {
    var transcript = this.state.transcript.map((phrase, i) => {
      let startSeconds = phrase.start[0]
      let date = new Date(null)
      date.setSeconds(startSeconds)
      let startTime = date.toISOString().substr(11, 8)
      if (date.toISOString().substr(11, 2) === '00') {
        startTime = date.toISOString().substr(14, 5)
      }
      return (
        <Element
          key={startTime}
          name={`phrase${i}`}
          className='phrase'
        >
          <FlatButton
            fullWidth
            className='phrase-btn'
            onClick={() => this.seekTo(startSeconds)}
          >
            <span className='start-time'>
              {startTime}
            </span>
            <span className='phrase-text'>
              <Highlighter
                sanitize={latinize}
                searchWords={this.props.subs}
                textToHighlight={phrase.subtitle}
                highlightStyle={{ fontWeight: 'normal' }}
                highlightClassName='highlighted'
              />
            </span>
          </FlatButton>
        </Element>
      )
    })
    return (
      <div>
        <div id='scroll-box'>
          {transcript}
        </div>
      </div>
    )
  }
})

export default YoutubeSubs
