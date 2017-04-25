import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import './SubsTools.css'

class SubsTools extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchSubs: '',
      open: false
    }
    this._onChange = this._onChange.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }
  componentDidUpdate (previousProps, previousState) {
    const { searchSubs } = this.state
    const searchWords = searchSubs.split(/\s/).filter(word => word)
    if (previousState.searchSubs !== searchSubs) {
      this.props.searchSubs(searchWords)
    }
  }
  _onChange (event) {
    this.setState({
      searchSubs: event.target.value
    })
  }
  handleRequestClose () {
    this.setState({
      open: false
    })
  }
  handleTouchTap (event) {
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }
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
                  <h3>vSubs Beta</h3>
                  <li>Auto-generated subtitles support and other features coming soon!</li>
                  <li>By Adam Wehunt</li>
                  <li><a href='https://github.com/ajwehunt/vsubs' target='_blank' >Github</a></li>
                  <li><a href='http://www.adamjwehunt.com' target='_blank' >Portfolio</a></li>
                </ul>
              </div>
            </Popover>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}

SubsTools.propTypes = {
  searchSubs: React.PropTypes.func,
  toNextHltdPhrase: React.PropTypes.func,
  toPrevHltdPhrase: React.PropTypes.func
}

export default SubsTools
