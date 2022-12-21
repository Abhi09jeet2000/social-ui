import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'

import './Home.css'
import MainContent from '../MainContent/MainContent'

function Home() {
  const [search, setSearch] = useState('')
  const [postArray, setPostArray] = useState([])
  const searchFunction = (value) => {
    setSearch(value.toLowerCase())
  }

  const getPost = () => {
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
        setPostArray(data)
      })
      .catch((err) => {})
  }

  useEffect(() => {
    getPost()
  }, [])
  return (
    <div>
      <NavBar searchFunction={searchFunction} />
      <MainContent
        postArray={
          !search
            ? postArray
            : postArray.filter((post) => {
                return post.userName.toLowerCase().includes(search)
              })
        }
        setPostArray={setPostArray}
        getPost={getPost}
      />
    </div>
  )
}

export default Home
