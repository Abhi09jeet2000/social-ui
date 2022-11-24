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
        <div className="navbar__barContent">
          <Grid container>
            <Grid item xs={2}>
              {' '}
            </Grid>
            <Grid item xs={3}>
              <img className="navbar_logo" src={insta_logo} width="105px" />
            </Grid>
            <Grid item xs={4}>
              <input
                text="text"
                className="navbar__searchBar"
                placeholder="Search"
              />
            </Grid>
            <Grid item xs={3} style={{ display: 'flex' }}>
              {/* <img className="navbar__img" src={home} width="25px" /> */}
              {/* <img className="navbar__img" src={message} width="25px" /> */}
              {/* <img className="navbar__img" src={find} width="25px" /> */}
              {/* <img className="navbar__img" src={react} width="25px" /> */}
              <Avatar
                src={pp}
                className="navbar__img"
                style={{
                  maxWidth: '25px',
                  maxHeight: '25px',
                  justifyContent: 'center',
                }}
              />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default NavBar

{
  /* <div>
        <div className="navbar_barcontent">
          <div className="navbar_barcontent">
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <img className="navbar_logo" src={insta_logo} alt="logo" />
            </div>
            <div>
              <input
                text="text"
                className="navbar_searchbar"
                placeholder="Search"
              />
            </div>
            <div style={{ display: 'flex' }}>
              <Avatar
                className="navbar_img"
                src={pp}
                style={{ width: '27px', height: '27px' }}
              />
            </div>
          </div>
        </div>
      </div> */
}
