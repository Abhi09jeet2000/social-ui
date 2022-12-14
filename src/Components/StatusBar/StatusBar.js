import React, { Component } from 'react'
import { Avatar } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import './StatusBar.css'

// import statusimg from '../../images/pp1.png'
import uploadImage from '../../images/statusadd.png'

import { app } from '../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: 'white',
  outline: 'none',
  p: 4,
  textAlign: 'center',
}
class StatusBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusList: [],
      open: false,
      imgSrc: '',
    }
  }
  componentDidMount() {
    this.getData()
  }

  handleModal = (path) => {
    console.log(path)
    this.setState({ open: !this.state.open, imgSrc: path })
  }

  getData = () => {
    const thisContext = this
    // let data = [
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    //   {
    //     username: 'insta_id',
    //     imageurl: '../../images/pp1.png',
    //   },
    // ]
    const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }

    fetch('http://localhost:8080/status', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        thisContext.setState({ statusList: data })
      })
      .catch((err) => {})
    // this.setState({ statusList: data })
  }

  uploadStatus = (event) => {
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
            statusId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem('users')).uid,
            path: downloadURL,
            timeStamp: new Date().getTime(),
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

          fetch('http://localhost:8080/status', requestOptions)
            .then((response) => response.json())
            .then((data) => {
              thisContext.getData()
            })
            .catch((err) => {})
        })
      },
    )
  }

  render() {
    return (
      <div>
        <div className="statusbar_container">
          <div className="fileupload status">
            <label htmlFor="file-upload-status">
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
              {/* <div className="statusbar_text">New</div> */}
            </label>
            <input
              id="file-upload-status"
              onChange={this.uploadStatus}
              type="file"
            />
          </div>

          {this.state.statusList.map((item, index) => (
            <div
              className="status"
              key={item.userId}
              onClick={() => this.handleModal(item)}
            >
              <Avatar className="statusbar_status" src={item.path} />
              <div className="statusbar_text">{item.userName}</div>
              <Modal
                open={this.state.open}
                onClose={() => this.handleModal(item)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img
                    src={this.state.imgSrc.path}
                    style={{ width: '100%', height: '100%' }}
                  />
                  <h4>{this.state.imgSrc.userName}</h4>
                </Box>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default StatusBar
