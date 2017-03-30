import React from 'react'
import { getYoutubeSubs } from '../services/youtubeSubsService.js'
import FlatButton from 'material-ui/FlatButton'
import Highlighter from 'react-highlight-words'
import Scroll from 'react-scroll'
import latinize from 'latinize'
import './YoutubeSubs.css'
const { string, func, array } = React.PropTypes

var Element = Scroll.Element
var scroller = Scroll.scroller
var currentPhraseIndex = -1

const YoutubeSubs = React.createClass({
  propTypes: {
    id: string,
    seekTo: func,
    subs: array
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
  componentDidUpdate () {
    if (document.body.querySelectorAll('.highlighted').length) {
      let hltdElements = document.body.querySelectorAll('.highlighted')
      let hltdPhrases = []
      for (let i = 0; i < hltdElements.length; i++) {
        let phrase = hltdElements[i].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('name')
        if (hltdPhrases.indexOf(phrase) === -1) {
          hltdPhrases.push(phrase)
        }
      }
      this.props.hltdPhrases.push(...hltdPhrases)
    }
  },
  seekTo (startSeconds) {
    this.props.seekTo(startSeconds)
  },
  toNextHltdPhrase () {
    var hltdPhrases = this.props.hltdPhrases
    var nextPhraseIndex = currentPhraseIndex + 1
    if (nextPhraseIndex === hltdPhrases.length) {
      nextPhraseIndex = 0
    }
    if (nextPhraseIndex > -1) {
      scroller.scrollTo(hltdPhrases[nextPhraseIndex], {
        duration: 100,
        delay: 50,
        smooth: true,
        containerId: 'scroll-box'
      })
      currentPhraseIndex = nextPhraseIndex
    }
  },
  toPrevHltdPhrase () {
    var hltdPhrases = this.props.hltdPhrases
    var prevPhraseIndex = currentPhraseIndex - 1
    if (prevPhraseIndex <= -1) {
      prevPhraseIndex = hltdPhrases.length - 1
    }
    if (prevPhraseIndex >= 0) {
      scroller.scrollTo(hltdPhrases[prevPhraseIndex], {
        duration: 100,
        delay: 50,
        smooth: true,
        containerId: 'scroll-box'
      })
      currentPhraseIndex = prevPhraseIndex
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
