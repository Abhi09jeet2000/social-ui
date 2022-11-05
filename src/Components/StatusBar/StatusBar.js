import React, { Component } from 'react'
import { Avatar } from '@mui/material'

import './StatusBar.css'

import statusimg from '../../images/pp1.png'
import uploadImage from '../../images/statusadd.png'

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
          <div>
            <img
              className="statusbar_status"
              src={uploadImage}
              alt="uploadImage"
              style={{
                width: '55px',
                height: '55px',
                border: 'none',
                margin: '0 20px',
              }}
            />
            <div className="statusbar_text">New</div>
          </div>

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
