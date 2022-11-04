import React, { Component } from 'react'

import { Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import './NavBar.css'

import insta_logo from '../../images/logoinsta.png'
import home from '../../images/home.svg'
import message from '../../images/message.svg'
import find from '../../images/find.svg'
import react from '../../images/love.svg'
import pp from '../../images/pp1.png'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <div className="navbar_barcontent">
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <img className="navbar_logo" src={insta_logo} width="140vw" />
            </Grid>
            <Grid item xs={4}>
              <input
                text="text"
                className="navbar_searchbar"
                placeholder="Search"
              />
            </Grid>
            <Grid item xs={3} style={{ display: 'flex' }}>
              <img className="navbar_img" src={home} width="30vw" />
              <img className="navbar_img" src={message} width="30vw" />
              <img className="navbar_img" src={find} width="30vw" />
              <img className="navbar_img" src={react} width="30vw" />
              <Avatar
                className="navbar_img"
                src={pp}
                style={{ width: '27px', height: '27px' }}
              />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default NavBar
