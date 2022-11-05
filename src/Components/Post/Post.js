import { Avatar } from '@mui/material'
import React, { Component } from 'react'

import './Post.css'

import love from '../../images/love.svg'
import comment from '../../images/comment.svg'
import share from '../../images/share.svg'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentList: [],
    }
  }

  getComments = () => {
    let data = [
      {
        username: 'user1',
        commentId: '1234',
        timeStamp: '12345',
        description: 'Comment 1',
      },
      {
        username: 'user2',
        commentId: '123',
        timeStamp: '1234',
        description: 'Comment 2',
      },
      {
        username: 'user3',
        commentId: '12',
        timeStamp: '1234',
        description: 'Comment 3',
      },
      {
        username: 'user4',
        commentId: '1',
        timeStamp: '12345',
        description: 'Comment 4',
      },
    ]

    this.setState({ commentList: data })
  }

  componentDidMount() {
    this.getComments()
  }

  render() {
    return (
      <div className="post_container">
        {/* Header */}
        <div className="post_header">
          <Avatar className="post_image" src={this.props.profileImage} />
          <div className="post_username">{this.props.userName}</div>
        </div>
        {/* Image */}
        <div>
          <img
            src={this.props.postImage}
            style={{ width: '100%' }}
            alt="postimg"
          />
        </div>
        {/* Analytics */}
        <div>
          <div style={{ marginLeft: '2%' }}>
            <img src={love} className="post-reactimage" alt="love" />
            <img src={comment} className="post-reactimage" alt="comment" />
            <img src={share} className="post-reactimage" alt="share" />
          </div>
          <div style={{ fontWeight: 'bold', marginLeft: '4%' }}>
            {this.props.likes}
          </div>
        </div>
        {/* Comment */}
        <div>
          {this.state.commentList.map((item, index) => (
            <div className="post_comment" key={item.userName}>
              {item.username} : {item.description}
            </div>
          ))}

          <input
            text="text"
            className="post_commentbox"
            placeholder="Add a comment..."
          />
        </div>
      </div>
    )
  }
}

export default Post
