import React, { Component } from 'react'
import Grid from '@mui/material/Grid'

import './LoginPage.css'

import insta_image from '../../images/9364675fb26a.svg'
import insta_logo from '../../images/logoinsta.png'
import fb from '../../images/fb.png'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
    }
  }

  changeLogin = () => {
    if (this.state.isLogin) {
      this.setState({ isLogin: false })
    } else {
      this.setState({ isLogin: true })
    }
  }
  render() {
    return (
      <div className="main">
        <Grid container justifyContent="center">
          {/* <Grid item xs={2.5}></Grid> */}
          <Grid item xs="auto">
            <div className="loginpage_main">
              <div>
                <img src={insta_image} width="453px" />
              </div>
              <div>
                <div className="loginpage_rightcomponent">
                  <img className="loginpage_logo" src={insta_logo} alt="logo" />
                  <div className="loginpage_signin">
                    {this.state.isLogin ? <SignIn /> : <SignUp />}
                    <div className="login_ordiv">
                      <div className="login_divider"></div>
                      <div className="login_or">OR</div>
                      <div className="login_divider"></div>
                    </div>

                    <div className="login_fb">
                      <img
                        src={fb}
                        alt="fb_logo"
                        width="5%"
                        style={{ marginRight: '2%' }}
                      />
                      {this.state.isLogin ? 'Login in ' : 'Sign up '}
                      with Facebook
                    </div>
                    <div className="login_forgot">Forgot Password</div>
                  </div>
                </div>
                <div className="loginpage_signupoption">
                  {this.state.isLogin ? (
                    <div className="loginpage_signup">
                      Don't have an account?{' '}
                      <span
                        onClick={this.changeLogin}
                        style={{ fontWeight: 'bold', color: '#0395F6' }}
                      >
                        Sign up
                      </span>
                    </div>
                  ) : (
                    <div className="loginpage_signin">
                      Have an account?{' '}
                      <span
                        onClick={this.changeLogin}
                        style={{ fontWeight: 'bold', color: '#0395F6' }}
                      >
                        Sign in
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Grid>
          {/* <Grid item xs={3}></Grid> */}
        </Grid>
      </div>
    )
  }
}

export default LoginPage
