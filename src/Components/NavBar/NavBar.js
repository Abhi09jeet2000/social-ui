import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { app } from '../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

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

function NavBar(props) {
  // const [search, setSearch] = useState('')
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [progressBar, setProgressBar] = useState(null)

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
    } else if (event.target.innerHTML === 'Profile') {
    }
  }

  const uploadStatus = (event) => {
    let image = event.target.files[0]
    if (image === null || image === undefined) return

    const storage = getStorage(app)
    const storageRef = ref(storage, 'profiles/' + image.name)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgressBar(progress)
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            console.log('default')
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          console.log(JSON.parse(localStorage.getItem('users')))

          let payload = {
            // statusId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem('users')).uid,
            profileImage: downloadURL,
            // timeStamp: new Date().getTime(),
          }

          const requestOptions = {
            method: 'PUT',
            // mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload),
          }

          fetch('http://localhost:8080/users/profile', requestOptions)
            .then((response) => response.json())
            .then((data) => {
              // thisContext.getData()
              // console.log(data)
            })
            .catch((err) => {})
        })
      },
    )
  }

  const getProfile = () => {
    const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
    fetch(
      'http://localhost:8080/users/' +
        JSON.parse(localStorage.getItem('users')).uid,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        // setProfile()
        setProfile(data.profileImage)
      })
      .catch((err) => {})
  }

  useEffect(() => {
    getProfile()
  }, [])

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
                    src={profile ? profile : pp}
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
                <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                  <label htmlFor="profile-change">
                    <Typography textAlign="center">Profile</Typography>
                  </label>
                  <input
                    id="profile-change"
                    onChange={uploadStatus}
                    type="file"
                  />
                </MenuItem>
                <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
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
