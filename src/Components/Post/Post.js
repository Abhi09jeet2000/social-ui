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
    const thisContext = this
    // let data = [
    //   {
    //     username: 'user1',
    //     commentId: '1234',
    //     timeStamp: '12345',
    //     description: 'Comment 1',
    //   },
    //   {
    //     username: 'user2',
    //     commentId: '123',
    //     timeStamp: '1234',
    //     description: 'Comment 2',
    //   },
    //   {
    //     username: 'user3',
    //     commentId: '12',
    //     timeStamp: '1234',
    //     description: 'Comment 3',
    //   },
    //   {
    //     username: 'user4',
    //     commentId: '1',
    //     timeStamp: '12345',
    //     description: 'Comment 4',
    //   },
    // ]
    const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }

    fetch(
      `http://localhost:8080/comment/` + thisContext.props.id,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        thisContext.setState({ commentList: data })
        // console.log(data)
      })
      .catch((err) => {})
  }

  submitComments = (event) => {
    if (event.key === 'Enter') {
      let comment = event.currentTarget.value
      if (comment !== null || comment !== undefined) {
        let payload = {
          commentId: Math.floor(Math.random() * 1000000).toString(),
          userId: JSON.parse(localStorage.getItem('users')).uid,
          postId: this.props.id,
          timestamp: new Date().getTime(),
          comment: comment,
        }
        event.currentTarget.value = ''
        const requestOptions = {
          method: 'POST',
          // mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(payload),
        }

        fetch('http://localhost:8080/comment', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.getComments()
          })
          .catch((err) => {})
      }
    }
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
            {/* <img src={comment} className="post-reactimage" alt="comment" /> */}
            {/* <img src={share} className="post-reactimage" alt="share" /> */}
          </div>
          <div style={{ fontWeight: 'bold', marginLeft: '4%' }}>
            {this.props.likes}
          </div>
        </div>
        {/* Comment */}
        <div>
          {this.state.commentList.map(
            (item, index) => (
              // index < 4 ? (
              <div className="post_comment" key={item.commentId}>
                {item.userName} : {item.comment}
              </div>
            ),
            // ) : (
            // <span></span>
            // ),
          )}

          <input
            text="text"
            className="post_commentbox"
            placeholder="Add a comment..."
            onKeyPress={this.submitComments}
          />
        </div>
      </div>
    )
  }
}

export default Post
