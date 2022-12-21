import React from 'react'

import './MainContent.css'

import { Grid } from '@mui/material'
import StatusBar from '../StatusBar/StatusBar'
import MainPage from '../MainPage/MainPage'
import InfoSection from '../InfoSection/InfoSection'
import Suggestions from '../Suggestions/Suggestions'

function MainContent(props) {
  return (
    <div>
      <div>
        <Grid container justifyContent="center">
          {/* <Grid item xs={2}></Grid> */}
          <Grid item xs="auto">
            <div>
              <StatusBar />
              <MainPage
                postArray={props.postArray}
                setPostArray={props.setPostArray}
                getPost={props.getPost}
              />
            </div>
          </Grid>
          {/* <Grid item xs={2}>
              <InfoSection />
              <Suggestions />
            </Grid> */}
          {/* <Grid item xs={2}></Grid> */}
        </Grid>
      </div>
    </div>
  )
}

export default MainContent
