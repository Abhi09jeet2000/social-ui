import React, { Component } from 'react'
import { Avatar } from '@mui/material'

import './StatusBar.css'

import statusimg from '../../images/pp1.png'

class StatusBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusList: [],
    }
  }
  componentDidMount() {
    this.getData()
  }

  getData = () => {
    let data = [
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
      {
        username: 'insta_id',
        imageurl: '../../images/pp1.png',
      },
    ]
    this.setState({ statusList: data })
  }
  render() {
    return (
      <div>
        <div className="statusbar_container">
          {this.state.statusList.map((item, index) => (
            <div className="status" key={item.username + index}>
              <Avatar className="statusbar_status" src={statusimg} />
              <div className="statusbar_text">{item.username}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default StatusBar
