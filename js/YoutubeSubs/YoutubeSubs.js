import React, { Component } from 'react'
import { getYoutubeSubs } from '../services/youtubeSubsService.js'
import FlatButton from 'material-ui/FlatButton'
import Highlighter from 'react-highlight-words'
import Scroll from 'react-scroll'
import latinize from 'latinize'
import Resizable from 'react-resizable-box'
import './YoutubeSubs.css'

var Element = Scroll.Element
var scroller = Scroll.scroller
var currentHltdPhraseIndex, hltdElements, hltdPhrases, transcript

class YoutubeSubs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transcript: []
    }
    this.seekTo = this.seekTo.bind(this)
    this.toNextHltdPhrase = this.toNextHltdPhrase.bind(this)
    this.toPrevHltdPhrase = this.toPrevHltdPhrase.bind(this)
    this.videoTimer = this.videoTimer.bind(this)
    this.onSubsResizeStart = this.onSubsResizeStart.bind(this)
    this.onSubsResize = this.onSubsResize.bind(this)
    this.onSubsResizeStop = this.onSubsResizeStop.bind(this)
    this.resizableHeight = this.resizableHeight.bind(this)
  }
  componentDidMount () {
    getYoutubeSubs(this.props.id).then(res => {
      this.setState({
        transcript: res.transcript.text
      })
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      getYoutubeSubs(nextProps.id).then(res => {
        this.setState({
          transcript: res.transcript.text
        })
      })
    }
  }
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
  }
  seekTo (startSeconds) {
    this.props.seekTo(startSeconds)
  }
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
  }
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
  }
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
  }
  onSubsResizeStart (e, dir) {
    let activeElmts = document.getElementsByClassName('phrase-text')
    for (let i = 0; i < activeElmts.length; i++) {
      activeElmts[i].className = 'phrase-text resize-active'
    }
  }
  onSubsResize () {
    // console.log(window.innerHeight - document.getElementsByTagName('IFRAME')[0].offsetHeight - 30)
    // console.log(document.getElementsByClassName('subs-container')[0].offsetHeight + 36)
    // var bottomOfIframe = window.innerHeight - document.getElementsByTagName('IFRAME')[0].offsetHeight - 30
    var topOfSubsContainer = document.getElementsByClassName('subs-container')[0].offsetHeight + 36
    // if (topOfSubsContainer >= bottomOfIframe - 30) {
    let diff = (window.innerHeight - topOfSubsContainer) - 30
    document.getElementsByTagName('IFRAME')[0].style.height = diff.toString() + 'px'
    // }
  }
  onSubsResizeStop () {
    let activeElmts = document.getElementsByClassName('phrase-text')
    for (let i = 0; i < activeElmts.length; i++) {
      activeElmts[i].className = 'phrase-text'
    }
  }
  resizableHeight () {
    let width = window.innerWidth
    let height = window.innerHeight
    if (width <= 320 && height <= 568) {
      return 262
    } else if (width <= 360 && height <= 667) {
      return 311
    } else if (width <= 375) {
      return 330
    } else if (width <= 412 && height <= 732) {
      return 290
    } else if (width <= 414 && height <= 736) {
      return 375
    } else if (width <= 768 && height <= 1024) {
      return 480
    } else if (width <= 1440 && height <= 900) {
      return 214
    } else {
      return 270
    }
  }
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
      <Resizable
        className='resizable-subs'
        enable={{top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false}}
        minWidth={'100%'}
        height={this.resizableHeight()}
        bounds={'parent'}
        onResizeStart={this.onSubsResizeStart}
        onResize={this.onSubsResize}
        onResizeStop={this.onSubsResizeStop}
        handlerClasses={{top: 'resize-btn material-icons'}}
        >
        <div id='scroll-box'>
          {transcript}
        </div>
      </Resizable>
    )
  }
}

YoutubeSubs.propTypes = {
  id: React.PropTypes.string,
  seekTo: React.PropTypes.func,
  subs: React.PropTypes.array,
  hltdPhrases: React.PropTypes.array
}

export default YoutubeSubs
