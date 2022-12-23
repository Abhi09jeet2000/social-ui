import { Avatar } from '@mui/material'
import React, { Component } from 'react'

import './Post.css'

import love from '../../images/love.svg'
import like from '../../images/like.png'
// import comment from '../../images/comment.svg'
// import share from '../../images/share.svg'

class Post extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      commentList: [],
      profile: null,
      likered: false,
      likes: props.likes,
    }
  }
  changeState = () => {
    // console.log(this.state.likered)
    const thisContext = this
    this.setState({ likered: !this.state.likered })
    // console.log(this.state.likered)
    const requestOptions = {
      method: 'PUT',
      // mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }

    // if (thisContext.state.likered) {
    // console.log(1)
    fetch(
      `http://localhost:8080/post/` +
        thisContext.props.id +
        '/' +
        !thisContext.state.likered,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ likes: data.likeCount })
        // console.log(data)
      })
      .catch((err) => {})
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

  getProfile = () => {
    // console.log(this.props.userName)
    const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
    fetch(
      'http://localhost:8080/users/username/' + this.props.userName,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.profileImage)
        // setProfile()
        this.setState({ profile: data.profileImage })
      })
      .catch((err) => {})
  }

  componentDidMount() {
    this.getProfile()
    // console.log('Here')
    this.getComments()
  }

  render() {
    return (
      <div className="post_container">
        {/* Header */}
        <div className="post_header">
          <Avatar className="post_image" src={this.state.profile} />
          &nbsp;&nbsp;
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
          <div
            style={{ marginLeft: '50%', display: 'flex' }}
            onClick={() => {
              this.changeState()
            }}
          >
            {this.state.likered ? (
              <img src={like} className="post-reactimage" alt="love" />
            ) : (
              <img src={love} className="post-reactimage" alt="love" />
            )}
            {/* <img src={comment} className="post-reactimage" alt="comment" /> */}
            {/* <img src={share} className="post-reactimage" alt="share" /> */}
            <div style={{ fontWeight: 'bold', marginLeft: '4%' }}>
              {this.state.likes}
            </div>
          </div>
        </div>
        {/* Comment */}
        <div>
          {this.state.commentList.map(
            (item, index) => (
              // index < 4 ? (
              <div
                className="post_comment"
                key={item.commentId}
                style={{
                  display: 'block',
                  textAlign:
                    item.userId ===
                    JSON.parse(localStorage.getItem('users')).uid
                      ? 'right'
                      : 'left',
                }}
              >
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
