import React, { Component } from 'react'

import './MainContent.css'

import { Grid } from '@mui/material'
import StatusBar from '../StatusBar/StatusBar'
import MainPage from '../MainPage/MainPage'

class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <div>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              <div>
                <StatusBar />
                <MainPage />
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default MainContent
