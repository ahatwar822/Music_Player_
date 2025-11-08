import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { songs } from '../data/data'
import { setcurrentSong } from '../feature/playerSclice'

function Songs() {
    const dispatch = useDispatch();
    const { currentSong, isPlaying } = useSelector((state) => state.player);
    return (
        <>
            <div className="mt-5">
                <div className="d-flex align-items-center justify-content-between mb-4 px-3">
                    <div>
                        <h3 className="text-white fw-bold mb-1">
                            <i className="bi bi-disc-fill me-2" style={{ color: '#ffc107' }}></i>
                            Your Playlist
                        </h3>
                        <p className="text-white-50 mb-0">{songs.length} songs available</p>
                    </div>
                    <div className="badge bg-warning text-dark px-3 py-2 fs-6">
                        <i className="bi bi-music-note-beamed me-1"></i>
                        Bollywood Hits
                    </div>
                </div>

                <div className="row g-4">
                    {songs.map((song, idx) => {
                        const isActive = currentSong?.title === song.title;
                        return (
                            <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                                <div
                                    onClick={() => dispatch(setcurrentSong(song))}
                                    className="song-card position-relative"
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        transform: isActive ? 'translateY(-10px)' : 'translateY(0)'
                                    }}
                                >
                                    {/* Card Container with Glassmorphism */}
                                    <div
                                        className="card bg-dark text-white border-0 shadow-lg overflow-hidden h-100"
                                        style={{
                                            backdropFilter: 'blur(10px)',
                                            background: isActive
                                                ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 193, 7, 0.05) 100%)'
                                                : 'rgba(255, 255, 255, 0.05)',
                                            border: isActive ? '2px solid #ffc107' : '2px solid transparent'
                                        }}
                                    >
                                        {/* Image Container with Overlay */}
                                        <div className="position-relative overflow-hidden">
                                            <img
                                                className="card-img-top song-image"
                                                src={song.imageUrl}
                                                alt={song.title}
                                                style={{
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease'
                                                }}
                                            />

                                            {/* Gradient Overlay */}
                                            <div
                                                className="position-absolute bottom-0 start-0 w-100"
                                                style={{
                                                    height: '100%',
                                                    background: isActive
                                                        ? 'linear-gradient(to top, rgba(255, 193, 7, 0.8) 0%, transparent 60%)'
                                                        : 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 60%)'
                                                }}
                                            ></div>

                                            {/* Track Number Badge */}
                                            <div
                                                className="position-absolute top-0 start-0 m-2 badge"
                                                style={{
                                                    background: isActive ? '#ffc107' : 'rgba(0, 0, 0, 0.6)',
                                                    color: isActive ? '#000' : '#fff',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                #{idx + 1}
                                            </div>

                                            {/* Now Playing Indicator */}
                                            {isActive && (
                                                <div className="position-absolute top-0 end-0 m-2">
                                                    <div className="d-flex align-items-center gap-1 bg-warning text-dark px-2 py-1 rounded-pill">
                                                        {isPlaying && (
                                                            <>
                                                                <div className="music-bar" style={{ width: '2px', height: '10px', background: '#000' }}></div>
                                                                <div className="music-bar" style={{ width: '2px', height: '14px', background: '#000', animationDelay: '0.2s' }}></div>
                                                                <div className="music-bar" style={{ width: '2px', height: '10px', background: '#000', animationDelay: '0.4s' }}></div>
                                                            </>
                                                        )}
                                                        <span className="small fw-bold ms-1">
                                                            {isPlaying ? 'PLAYING' : 'PAUSED'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Play Button Overlay (appears on hover) */}
                                            <div className="position-absolute top-50 start-50 translate-middle play-button-overlay">
                                                <div className="bg-warning rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                                                    style={{ width: '60px', height: '60px' }}
                                                >
                                                    <i className="bi bi-play-fill text-dark fs-3"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="card-body pb-3">
                                            <div className="d-flex align-items-start justify-content-between mb-2">
                                                <div className="flex-grow-1 me-2" style={{ minWidth: 0 }}>
                                                    <h6 className="card-title text-capitalize fw-bold mb-1 text-truncate"
                                                        style={{ color: isActive ? '#ffc107' : '#fff' }}>
                                                        {song.title}
                                                    </h6>
                                                    <p className="card-text text-capitalize mb-0 small text-truncate"
                                                        style={{ color: isActive ? 'rgba(255, 193, 7, 0.8)' : 'rgba(255, 255, 255, 0.6)' }}>
                                                        <i className="bi bi-person-fill me-1" style={{ fontSize: '0.8rem' }}></i>
                                                        {song.artist}
                                                    </p>
                                                </div>

                                                {/* Duration Badge */}
                                                <span className="badge bg-secondary text-white small flex-shrink-0" style={{ height: 'fit-content' }}>
                                                    <i className="bi bi-clock me-1"></i>
                                                    3:45
                                                </span>
                                            </div>

                                            {isActive && (
                                                <div className="text-center mt-2">
                                                    <i className="bi bi-vinyl-fill text-warning" style={{ fontSize: '1.2rem', animation: 'spin 3s linear infinite' }}></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Songs