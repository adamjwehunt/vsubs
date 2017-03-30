import React from 'react'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import './SubsTools.css'
const { func } = React.PropTypes

const SubsTools = React.createClass({
  propTypes: {
    searchSubs: func,
    toNextHltdPhrase: func,
    toPrevHltdPhrase: func
  },
  getInitialState () {
    return {
      searchSubs: ''
    }
  },
  _onChange (event) {
    this.setState({
      searchSubs: event.target.value
    })
  },
  componentDidUpdate (previousProps, previousState) {
    const { searchSubs } = this.state
    const searchWords = searchSubs.split(/\s/).filter(word => word)
    if (previousState.searchSubs !== searchSubs) {
      this.props.searchSubs(searchWords)
    }
  },
  render () {
    const { searchSubs } = this.state
    return (
      <div>
        <Toolbar className='sub-controls'>
          <ToolbarGroup>
            <TextField
              hintText='Search Subtitles'
              value={searchSubs}
              onChange={this._onChange}
            />
            <IconButton
              onClick={this.props.toNextHltdPhrase}
              className='arrow'
            >
              <i className='material-icons arrow'>keyboard_arrow_down</i>
            </IconButton>
            <IconButton
              onClick={this.props.toPrevHltdPhrase}
              className='arrow'
            >
              <i className='material-icons'>keyboard_arrow_up</i>
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <i className='material-icons'>menu</i>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
})

export default SubsTools
