import './App.css'
import Home from './Components/Homepage/Home'

import LoginPage from './Components/LoginPage/LoginPage'

function App() {
  return (
    <div className="App">
      {localStorage.getItem('users') == undefined ||
      localStorage.getItem('users') == null ? (
        <LoginPage />
      ) : (
        <Home />
      )}
    </div>
  )
}

export default App
