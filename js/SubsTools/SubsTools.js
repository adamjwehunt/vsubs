import React from 'react'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
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
      searchSubs: '',
      open: false
    }
  },
  componentDidUpdate (previousProps, previousState) {
    const { searchSubs } = this.state
    const searchWords = searchSubs.split(/\s/).filter(word => word)
    if (previousState.searchSubs !== searchSubs) {
      this.props.searchSubs(searchWords)
    }
  },
  _onChange (event) {
    this.setState({
      searchSubs: event.target.value
    })
  },
  handleRequestClose () {
    this.setState({
      open: false
    })
  },
  handleTouchTap (event) {
    console.log('clicked')
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  },
  render () {
    const { searchSubs } = this.state
    return (
      <div>
        <Toolbar className='sub-controls'>
          <ToolbarGroup>
            <TextField
              className='search-subs-input'
              hintText='Search Subtitles'
              value={searchSubs}
              onChange={this._onChange}
            />
            <IconButton
              className='arrow'
              onClick={() => {
                if (this.state.searchSubs) {
                  this.props.toNextHltdPhrase()
                }
              }}
            >
              <i className='material-icons'>keyboard_arrow_down</i>
            </IconButton>
            <IconButton
              className='arrow'
              onClick={() => {
                if (this.state.searchSubs) {
                  this.props.toPrevHltdPhrase()
                }
              }}
            >
              <i className='material-icons'>keyboard_arrow_up</i>
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton
              className='ham-menu'
              onTouchTap={this.handleTouchTap}
            >
              <i className='material-icons'>menu</i>
            </IconButton>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{'horizontal': 'left', 'vertical': 'bottom'}}
              targetOrigin={{'horizontal': 'right', 'vertical': 'center'}}
              onRequestClose={this.handleRequestClose}
            >
              <div className='about'>
                <ul>
                  vSubs beta
                  <li>Created by Adam Wehunt</li>
                  <li />
                  <li />
                  <li />
                </ul>
              </div>
            </Popover>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
})

export default SubsTools
