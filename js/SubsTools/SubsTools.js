import React from 'react'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import './SubsTools.css'

const SubsTools = React.createClass({
  render () {
    return (
      <div>
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
      </div>
    )
  }
})

export default SubsTools
