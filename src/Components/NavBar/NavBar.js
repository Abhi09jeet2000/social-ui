import React, { useState } from 'react'

import { Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import './NavBar.css'

import insta_logo from '../../images/logoinsta.png'
// import home from '../../images/home.svg'
// import message from '../../images/message.svg'
// import find from '../../images/find.svg'
// import react from '../../images/love.svg'
import pp from '../../images/pp1.png'

function NavBar(props) {
  // const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    props.searchFunction(e.target.value)
  }

  return (
    <div>
      <div className="navbar__barContent">
        <Grid container columnSpacing={2} columns={3}>
          {/* <Grid item xs={0} sm={1}></Grid> */}
          <Grid item xs>
            <img
              className="navbar_logo"
              src={insta_logo}
              alt="logo"
              // width="110px"
              // style={{ marginLeft: '10%' }}
            />
          </Grid>
          <Grid item xs>
            <input
              text="text"
              className="navbar__searchBar"
              placeholder="Search"
              onChange={(e) => {
                handleSearch(e)
              }}
              style={{
                marginLeft: '0',
                marginRight: '0',
              }}
            />
          </Grid>
          <Grid xs item style={{ display: 'flex' }}>
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
                // justifyContent: 'center',
                // marginLeft: '20%',
              }}
            />
          </Grid>
          {/* <Grid item xs={2}></Grid> */}
        </Grid>
      </div>
    </div>
  )
}

export default NavBar
