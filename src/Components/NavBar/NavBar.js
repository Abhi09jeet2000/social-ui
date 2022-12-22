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

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const settings = ['Profile', 'Logout']

function NavBar(props) {
  // const [search, setSearch] = useState('')
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleSearch = (e) => {
    props.searchFunction(e.target.value)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
    // console.log(event.currentTarget)
  }

  const handleCloseUserMenu = (event) => {
    console.log(event.target.innerHTML)
    setAnchorElUser(null)
    if (event.target.innerHTML === 'Logout') {
      localStorage.removeItem('users')
      window.location.reload()
    }
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
            {/* <Avatar
              src={pp}
              className="navbar__img"
              style={{
                maxWidth: '25px',
                maxHeight: '25px',
                // justifyContent: 'center',
                // marginLeft: '20%',
              }}
            /> */}
            <Box sx={{ flexGrow: 0 }} className="navbar__img">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={pp}
                    style={{
                      maxWidth: '30px',
                      maxHeight: '30px',
                      // justifyContent: 'center',
                      // marginLeft: '20%',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
          {/* <Grid item xs={2}></Grid> */}
        </Grid>
      </div>
    </div>
  )
}

export default NavBar
