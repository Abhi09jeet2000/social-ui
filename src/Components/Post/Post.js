import { Avatar } from '@mui/material'
import React, { Component } from 'react'

import './Post.css'

import postimage from '../../images/post.jpg'
import love from '../../images/love.svg'
import comment from '../../images/comment.svg'
import share from '../../images/share.svg'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="post_container">
        {/* Header */}
        <div className="post_header">
          <Avatar className="post_image" src="" />
          <div className="post_username">Username</div>
        </div>
        {/* Image */}
        <div>
          <img src={postimage} style={{ width: '100%' }} />
        </div>
        {/* Analytics */}
        <div>
          <div style={{ marginLeft: '2%' }}>
            <img src={love} className="post-reactimage" />
            <img src={comment} className="post-reactimage" />
            <img src={share} className="post-reactimage" />
          </div>
          <div style={{ fontWeight: 'bold', marginLeft: '4%' }}>7709 likes</div>
        </div>
        {/* Comment */}
        <div></div>
      </div>
    )
  }
}

export default Post
