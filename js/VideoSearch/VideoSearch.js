import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
// import JSONP from 'jsonp'
import injectTapEventPlugin from 'react-tap-event-plugin'
// import YoutubeFinder from 'youtube-finder'
import './VideoSearch.css'
const { string, shape, func } = React.PropTypes

injectTapEventPlugin()
// const googleAutoSuggestURL = `//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`
var dataSource = []

const VideoSearch = React.createClass({
  propTypes: {
    apiKey: string,
    history: shape({
      push: func
    })
  },
  getInitialState () {
    return {
      inputValue: ''
    }
  },
  // onUpdateInput (inputValue) {
  //   if (this.isMounted()) {
  //     this.setState({
  //       inputValue: inputValue
  //     }, function () {
  //       this.performSearch()
  //     })
  //   }
  // },
  // performSearch () {
  //   const url = googleAutoSuggestURL + this.state.inputValue
  //   if (this.state.inputValue !== '') {
  //     JSONP(url, function (error, data) {
  //       let searchResults, retrievedSearchTerms
  //       if (error) return error
  //       searchResults = data[1]
  //       retrievedSearchTerms = searchResults.map(function (result) {
  //         return result[0]
  //       })
  //       dataSource = retrievedSearchTerms
  //     })
  //   }
  // },
  onNewRequest (searchTerm) {
    // const self = this
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|v(?:i)?=))([^#]*).*/
    var parsedUrl = searchTerm.match(rx)
    if (parsedUrl) {
      if (parsedUrl[1].indexOf('&') !== -1) {
        parsedUrl[1] = parsedUrl[1].slice(0, parsedUrl[1].indexOf('&'))
      }
      return this.props.history.push(`yt:${parsedUrl[1]}`)
    }
    // else {
    //   const YoutubeClient = YoutubeFinder.createClient({ key: this.props.apiKey })
    //   const params = {
    //     part: 'id,snippet',
    //     type: 'video',
    //     q: this.state.inputValue,
    //     maxResults: '50',
    //     videoCaption: 'closedCaption'
    //   }
    //   YoutubeClient.search(params, function (error, results) {
    //     if (error) return console.log(error)
    //     self.props.callback(results.items, searchTerm)
    //     self.setState({
    //       inputValue: ''
    //     })
    //     dataSource = []
    //   })
    // }
  },
  render () {
    return (
      <div>
        <AutoComplete
          className='search-input'
          hintText='Enter Youtube URL or Link'
          dataSource={dataSource}
          onUpdateInput={this.onUpdateInput}
          onNewRequest={this.onNewRequest}
        />
      </div>
    )
  }
})

export default VideoSearch
