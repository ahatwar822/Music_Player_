import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { songs } from '../data/data'
import { setcurrentSong } from '../feature/playerSclice'

const Songlist = () => {

    const dispatch = useDispatch();
    const {currentSong} = useSelector((state) => state.player);

    return (
        <div className="mt-4">
      <h3 className="text-white mb-4 text-center fw-bold">
        <i className="bi bi-music-note-list me-2"></i>
        Playlist
      </h3>
      <div className="row g-4">
        {songs.map((song, idx) => {
          const isActive = currentSong?.title === song.title;
          return (
            <div key={idx} className="col-md-6 col-lg-3">
              <div
                onClick={() => dispatch(setcurrentSong(song))}
                className={`card h-100 bg-dark text-white border-0 shadow-sm cursor-pointer ${isActive ? 'border-warning' : ''}`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  border: isActive ? '3px solid #ffc107' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div className="position-relative">
                  <img 
                    className="card-img-top" 
                    src={song.imageUrl}
                    alt={song.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  {isActive && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <div className="bg-warning rounded-circle p-3 shadow-lg">
                        <i className="bi bi-music-note-beamed text-dark fs-4"></i>
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title text-capitalize fw-bold">{song.title}</h5>
                  <p className="card-text text-white-50 text-capitalize mb-0">{song.artist}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    )
}

export default Songlist;