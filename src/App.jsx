import { useState } from 'react'

import './App.css'
import PlayerBox from './components/PlayerBox'
import Songlist from './components/Songlist'
import Songs from './components/Songs'

function App() {


  return (
    <>
      <div className="min-vh-100 p-4" style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'}}>

        <div className="container">
          <div className="text-center mb-5 pt-4">
            <h1 className="display-4 text-white fw-bold mb-2">
              <i className="bi bi-disc me-3"></i>
              Music Player
            </h1>
            <p className="text-white-50 lead">Your personal music experience</p>
          </div>

          <div className="mb-5">
            <PlayerBox />
          </div>

          {/* <Songlist /> */}
          <Songs />
        </div>

      </div>


    </>
  )
}

export default App
