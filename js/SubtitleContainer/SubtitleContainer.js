import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import { getYoutubeSubs } from '../services/youtubeSubsService.js'
const { shape, string } = React.PropTypes
import './SubtitleContainer.css'

const CaptionContainer = React.createClass({
  propTypes: {
    match: shape({
      params: shape({
        id: string
      })
    })
  },
  getInitialState () {
    return {
      testString: []
    }
  },
  componentWillMount () {
    const { match } = this.props
    getYoutubeSubs(match.params.id).then(res => {
      this.setState({
        testString: res.transcript.text
      })
    })
  },
  render () {
    return (
      <div className='subs-wrap'>
        <Paper zDepth={3}>
          <Toolbar className='sub-controls'>
            <ToolbarGroup>
              <TextField
                hintText='Search Captions'
                />
              <IconButton tooltip='Down'>
                <i className='material-icons'>keyboard_arrow_down</i>
              </IconButton>
              <IconButton tooltip='Up'>
                <i className='material-icons'>keyboard_arrow_up</i>
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <div className='subs-container'>
            <div>
              {this.state.testString.map((phrase) => {
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
              }
            </div>
          </div>
        </Paper>
      </div>
    )
  }
})

export default CaptionContainer
