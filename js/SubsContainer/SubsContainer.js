import React from 'react'
import SubsTools from '../SubsTools/SubsTools'
import YoutubeSubs from '../YoutubeSubs/YoutubeSubs'
// import Resizable from 'react-resizable-box'
import './SubsContainer.css'
const { string, func } = React.PropTypes

var subtitles, subsType

const SubsContainer = React.createClass({
  propTypes: {
    params: string,
    seekTo: func,
    searchSubs: func
  },
  getInitialState () {
    return {
      searchSubsResults: []
    }
  },
  searchSubs (subsArray) {
    this.setState({
      searchSubsResults: subsArray
    })
  },
  toNextHltdPhrase () {
    this.input.toNextHltdPhrase()
  },
  toPrevHltdPhrase () {
    this.input.toPrevHltdPhrase()
  },
  videoTimer (seconds) {
    this.input.videoTimer(seconds)
  },
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
})

export default SubsContainer
