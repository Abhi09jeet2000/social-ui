import React, { Component } from 'react'
import Post from '../Post/Post'

import './MainPage.css'

import postimage from '../../images/post.jpg'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postArray: [],
    }
  }
  getPost = () => {
    let data = [
      {
        postId: '1234456',
        userName: 'user1',
        postImageUrl: '../../images/post.jpg',
        timeStamp: '123456',
        likes: 1234,
      },
    ]
    this.setState({ postArray: data })
  }

  componentDidMount() {
    this.getPost()
  }

  render() {
    return (
      <div>
        <div>
          {this.state.postArray.map((item, index) => (
            <Post
              id={item.postId}
              userName={item.userName}
              postImage={postimage} //{item.postImageUrl}
              likes={item.likes}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default MainPage
