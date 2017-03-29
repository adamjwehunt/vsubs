import React from 'react'
import Paper from 'material-ui/Paper'
import SubsTools from '../SubsTools/SubsTools'
import YoutubeSubs from '../YoutubeSubs/YoutubeSubs'
import './SubsContainer.css'
const { string, func } = React.PropTypes

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
    this.foo.toNextHltdPhrase()
  },
  toPrevHltdPhrase () {
    this.foo.toPrevHltdPhrase()
  },
  componentDidMount () {
  },
  render () {
    const { params, seekTo } = this.props
    const { searchSubsResults } = this.state
    var subtitles
    var subsType = params.substr(0, 3)
    if (subsType === 'yt:') {
      subtitles = (
        <YoutubeSubs
          id={params.slice(3)}
          seekTo={seekTo}
          subs={searchSubsResults}
          ref={(foo) => { this.foo = foo }}
        />
      )
    }
    return (
      <div className='subs-container' id='subs-container'>
        <Paper zDepth={3}>
          <SubsTools
            searchSubs={this.searchSubs}
            toNextHltdPhrase={this.toNextHltdPhrase}
            toPrevHltdPhrase={this.toPrevHltdPhrase}
          />
          {subtitles}
        </Paper>
      </div>
    )
  }
})

export default SubsContainer
