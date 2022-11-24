import React, { Component } from 'react'
import './SignUp.css'

// import { auth, storage } from '../firebase'

import { app } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailId: null,
      name: null,
      username: null,
      password: null,
    }
  }
  provideEmail = (event) => {
    this.state.emailId = event.currentTarget.value
  }

  newSignUp = () => {
    const authentication = getAuth(app)

    createUserWithEmailAndPassword(
      authentication,
      this.state.emailId,
      this.state.password,
    )
      .then((response) => {
        // navigate('/home')
        const user = response.user
        sessionStorage.setItem(
          'Auth Token',
          response._tokenResponse.refreshToken,
        )

        let payload = {
          userId: user.uid,
          userName: this.state.username,
          name: this.state.name,
          profileImage: '',
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

        fetch('http://localhost:8080/users', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem('users', JSON.stringify(user))
            window.location.reload()
          })
          .catch((err) => {})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <input
          className="loginpage_text"
          type="text"
          placeholder="Email"
          onChange={this.provideEmail}
        />
        <input
          className="loginpage_text"
          type="text"
          placeholder="Full Name"
          onChange={(event) => {
            this.state.name = event.currentTarget.value
          }}
        />
        <input
          className="loginpage_text"
          type="text"
          placeholder="Username"
          onChange={(event) => {
            this.state.username = event.currentTarget.value
          }}
        />
        <input
          className="loginpage_text"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            this.state.password = event.currentTarget.value
          }}
        />
        <button className="loginpage_button" onClick={() => this.newSignUp()}>
          Sign Up
        </button>
      </div>
    )
  }
}
export default SignUp
