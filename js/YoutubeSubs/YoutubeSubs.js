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
var currentHltdPhraseIndex, hltdElements, hltdPhrases, transcript

const YoutubeSubs = React.createClass({
  propTypes: {
    id: string,
    seekTo: func,
    subs: array,
    hltdPhrases: array
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
    hltdElements = document.body.querySelectorAll('.highlighted')
    if (hltdElements.length) {
      currentHltdPhraseIndex = -1
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
    hltdPhrases = this.props.hltdPhrases
    if (hltdPhrases[0]) {
      var nextPhraseIndex = currentHltdPhraseIndex + 1
      if (nextPhraseIndex === hltdPhrases.length) {
        nextPhraseIndex = 0
      }
      if (nextPhraseIndex > -1) {
        scroller.scrollTo(hltdPhrases[nextPhraseIndex], {
          duration: 200,
          delay: 50,
          smooth: true,
          containerId: 'scroll-box'
        })
        currentHltdPhraseIndex = nextPhraseIndex
      }
    }
  },
  toPrevHltdPhrase () {
    hltdPhrases = this.props.hltdPhrases
    if (hltdPhrases[0]) {
      var prevPhraseIndex = currentHltdPhraseIndex - 1
      if (prevPhraseIndex <= -1) {
        prevPhraseIndex = hltdPhrases.length - 1
      }
      if (prevPhraseIndex >= 0) {
        scroller.scrollTo(hltdPhrases[prevPhraseIndex], {
          duration: 200,
          delay: 50,
          smooth: true,
          containerId: 'scroll-box'
        })
        currentHltdPhraseIndex = prevPhraseIndex
      }
    }
  },
  videoTimer (currentSeconds) {
    let transcript = this.state.transcript
    for (let i = 0; i < transcript.length; i++) {
      let phraseElement = document.querySelectorAll(`[name="phrase${i}"]`)[0]
      let prevPhraseElement = document.querySelectorAll(`[name="phrase${i - 1}"]`)[0]
      let phraseStart = Math.floor(transcript[i].start[0])
      let phraseDuration = Math.floor(transcript[i].dur[0])

      if ((currentSeconds >= phraseStart) && (currentSeconds <= phraseStart + phraseDuration)) {
        if (phraseElement.className === 'phrase') {
          phraseElement.className = 'phrase is-active'
          if (prevPhraseElement) {
            if (prevPhraseElement.className === 'phrase is-active') {
              prevPhraseElement.className = 'phrase'
            }
          }
          scroller.scrollTo(`phrase${i}`, {
            duration: 700,
            delay: 0,
            smooth: true,
            offset: -72,
            containerId: 'scroll-box'
          })
        }
      } else if (phraseElement.className === 'phrase is-active') {
        phraseElement.className = 'phrase'
      }
    }
  },
  render () {
    transcript = this.state.transcript.map((phrase, i) => {
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
            id='phrase-btn'
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
