import React, { Component } from 'react'
import SubsTools from '../SubsTools/SubsTools'
import YoutubeSubs from '../YoutubeSubs/YoutubeSubs'
import './SubsContainer.css'

var subtitles, subsType

class SubsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchSubsResults: []
    }
    this.searchSubs = this.searchSubs.bind(this)
    this.toNextHltdPhrase = this.toNextHltdPhrase.bind(this)
    this.toPrevHltdPhrase = this.toPrevHltdPhrase.bind(this)
    this.videoTimer = this.videoTimer.bind(this)
  }
  searchSubs (subsArray) {
    this.setState({
      searchSubsResults: subsArray
    })
  }
  toNextHltdPhrase () {
    this.input.toNextHltdPhrase()
  }
  toPrevHltdPhrase () {
    this.input.toPrevHltdPhrase()
  }
  videoTimer (seconds) {
    this.input.videoTimer(seconds)
  }
  render () {
    const { params, seekTo } = this.props
    const { searchSubsResults } = this.state
    subsType = params.substr(0, 3)
    if (subsType === 'yt:') {
      subtitles = (
        <YoutubeSubs
          id={params.slice(3)}
          seekTo={seekTo}
          subs={searchSubsResults}
          hltdPhrases={[]}
          ref={(input) => { this.input = input }}
        />
      )
    }
    return (
      <div className='subs-container' id='subs-container'>
        <SubsTools
          searchSubs={this.searchSubs}
          toNextHltdPhrase={this.toNextHltdPhrase}
          toPrevHltdPhrase={this.toPrevHltdPhrase}
          />
        {subtitles}
      </div>
    )
  }
}

SubsContainer.propTypes = {
  params: React.PropTypes.string,
  seekTo: React.PropTypes.func,
  searchSubs: React.PropTypes.func
}

export default SubsContainer
