import React, { Component } from 'react'
import Post from '../Post/Post'

import './MainPage.css'

// import postimage from '../../images/post.jpg'
import uploadImage from '../../images/upload.png'

import { app } from '../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
// import { v4 } from 'uuid'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postArray: [],
      progressBar: '',
    }
  }
  getPost = () => {
    const thisContext = this
    // let data = [
    //   {
    //     postId: '1234456',
    //     userName: 'user1',
    //     postImageUrl: '../../images/post.jpg',
    //     timeStamp: '123456',
    //     likes: 1234,
    //   },
    // ]
    const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }

    fetch('http://localhost:8080/post', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        thisContext.setState({ postArray: data })
      })
      .catch((err) => {})
  }

  upload = (event) => {
    let image = event.target.files[0]
    if (image === null || image === undefined) return
    const thisContext = this
    const storage = getStorage(app)
    const storageRef = ref(storage, 'images/' + image.name)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        thisContext.setState({ progressBar: progress })
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
            postId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem('users')).uid,
            postPath: downloadURL,
            timestamp: new Date().getTime(),
            likeCount: 0,
          }

          const requestOptions = {
            method: 'POST',
            // mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload),
          }

          fetch('http://localhost:8080/post', requestOptions)
            .then((response) => response.json())
            .then((data) => {
              thisContext.getPost()
            })
            .catch((err) => {})
        })
      },
    )
  }

  componentDidMount() {
    this.getPost()
  }

  render() {
    return (
      <div>
        <div
          style={{
            textAlign: 'center',
            margin: '10px 0',
            border: '1px solid #dbdbdb',
            width: 'auto',
            borderRadius: '5px',
          }}
        >
          <div className="file-upload">
            <label htmlFor="file-upload">
              <img
                className="mainpage_uploadicon"
                src={uploadImage}
                alt="uploadImage"
              />
            </label>
            <input id="file-upload" type="file" onChange={this.upload} />
          </div>
        </div>
        <div className="upload_text">{this.state.progressBar}</div>
        {this.state.postArray.map((item, index) => (
          <Post
            key={item.postId}
            id={item.postId}
            userName={item.userName}
            postImage={item.postPath}
            likes={item.likeCount}
          />
        ))}
      </div>
    )
  }
}

export default MainPage
