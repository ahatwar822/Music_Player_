import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { play, pause, prev, next, setCurrentTime, setDuration } from '../feature/playerSclice';


function PlayerBox() {
    const { currentSong, isPlaying, currentTime, duration } = useSelector((state) => state.player)
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!audioRef.current || !currentSong) {
            return;
        }

        if (isPlaying) {
            audioRef.current.load();
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }

    }, [currentSong, isPlaying]);

    const handleToggele = () => {
        if (isPlaying) {
            dispatch(pause());
        } else {
            dispatch(play());
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            dispatch(setCurrentTime(audioRef.current.currentTime))
        }
    };

    const handleLoadeMetadata = () => {
        if (audioRef.current) {
            dispatch(setDuration(audioRef.current.duration));
        }
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            dispatch(setCurrentTime(newTime));

        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0.00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, 0)}`;
    };

    if (!currentSong) {
        return (
            <div className="card bg-dark text-white border-0 shadow-lg text-center p-5" style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                backdropFilter: 'blur(10px)'
            }}>
                <i className="bi bi-music-note-beamed display-1 text-warning mb-3"></i>
                <h3 className="mb-2">No Song Selected</h3>
                <p className="text-white-50">Choose a track from the playlist below to start your musical journey</p>
            </div>
        );
    }

    return (
        <>
        <div className="player-box-container position-relative">
            {/* Background Glow Effect */}
            <div className="position-absolute w-100 h-100 top-0 start-0" style={{
                background: `radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.3), transparent 70%)`,
                filter: 'blur(60px)',
                zIndex: 0,
                opacity: isPlaying ? 1 : 0.3,
                transition: 'opacity 0.5s ease'
            }}></div>

            <div className="card bg-dark text-white border-0 shadow-lg position-relative" style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden'
            }}>
                <audio 
                ref={audioRef} 
                src={currentSong?.songUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadeMetadata}
                ></audio>
                


                <div className="card-body p-4 position-relative">
                <div className="row align-items-center g-4">
                    {/* Album Art Section */}
                    <div className="col-lg-5">
                    <div className="text-center position-relative">
                        {/* Vinyl Record Effect */}
                        <div className="position-relative d-inline-block">

                        {/* Album Cover */}
                            <img
                                className={`img-fluid rounded-3 shadow-lg position-relative album-cover 
                                ${isPlaying ? "vibrating" : ""}`}
                                src={currentSong?.imageUrl} 
                                alt={currentSong?.title}
                                style={{
                                maxHeight: '260px',
                                maxWidth: '240px',
                                objectFit: 'cover',
                                border: '4px solid rgba(255, 255, 255, 0.2)',
                                zIndex: 1,
                            
                            }}/> 

                        </div>
                    </div>
                    </div>

                    {/* Controls Section */}
                    <div className="col-lg-7">
                    <div className="px-lg-4">
                        {/* Song Info */}
                        <div className="text-center text-lg-start mb-4">
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-2">
                            <span className="badge bg-warning text-dark px-3 py-2 me-2">
                            <i className="bi bi-disc-fill me-1"></i>
                            Now Playing
                            </span>
                            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                            <i className="bi bi-music-note me-1"></i>
                            Bollywood
                            </span>
                        </div>
                        
                        <h2 className="display-5 fw-bold mb-2 text-capitalize" style={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                        }}>
                            {currentSong?.title}
                        </h2>
                        <p className="lead mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            <i className="bi bi-person-circle me-2"></i>
                            {currentSong?.artist}
                        </p>
                        </div>

                        {/* Progress Bar with Enhanced Styling */}
                        <div className="mb-4">
                        <div className="position-relative mb-2">
                            <input
                            type="range"
                            className="form-range custom-range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            style={{
                                cursor: 'pointer',
                                height: '6px'
                            }}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center small text-white-50">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>

                        </div>
                        </div>


                        {/* Control Buttons */}
                        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                        {/* Shuffle Button */}
                        <button 
                            className="btn btn-outline-light rounded-circle shadow-sm"
                            style={{ width: '50px', height: '50px' }}
                            title="Shuffle">
                            <i className="bi bi-shuffle"></i>
                        </button>

                        {/* Previous Button */}
                        <button 
                            onClick={() => dispatch(prev())} 
                            className="btn btn-light rounded-circle shadow"
                            style={{ width: '60px', height: '60px' }}>
                            <i className="bi bi-skip-start-fill fs-5"></i>
                        </button>
                        
                        {/* Play/Pause Button */}
                        <button
                            onClick={handleToggele}
                            className="btn btn-warning rounded-circle shadow-lg position-relative"
                            style={{ 
                            width: '80px', 
                            height: '80px',
                            transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.3s ease'
                            }}>
                            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} fs-3`}></i>
                            {isPlaying && (
                            <span className="position-absolute top-0 start-100 translate-middle p-2">
                                <span className="badge rounded-pill bg-danger">
                                <span className="visually-hidden">playing</span>
                                </span>
                            </span>
                            )}
                        </button>
                        
                        {/* Next Button */}
                        <button 
                            onClick={() => dispatch(next())} 
                            className="btn btn-light rounded-circle shadow"
                            style={{ width: '60px', height: '60px' }}
                        >
                            <i className="bi bi-skip-end-fill fs-5"></i>
                        </button>

                        {/* Repeat Button */}
                        <button 
                            className="btn btn-outline-light rounded-circle shadow-sm"
                            style={{ width: '50px', height: '50px' }}
                            title="Repeat"
                        >
                            <i className="bi bi-repeat"></i>
                        </button>
                        </div> 

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        </>

        // <div>
        //                 <div className="card bg-dark text-white border-0 shadow-lg" style={{
        //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        //     backdropFilter: 'blur(10px)'
        // }}>
        //     <audio
        //         ref={audioRef}
        //         src={currentSong?.songUrl}
        //         onTimeUpdate={handleTimeUpdate}
        //         onLoadedMetadata={handleLoadeMetadata}
        //     ></audio>

        //     <div className="card-body p-4">
        //         <div className="row align-items-center">
        //             <div className="col-md-4 text-center mb-3 mb-md-0">
        //                 <img
        //                     className="img-fluid rounded shadow-lg"
        //                     src={currentSong?.imageUrl}
        //                     alt={currentSong?.title}
        //                     style={{
        //                         maxHeight: '250px',
        //                         objectFit: 'cover',
        //                         animation: isPlaying ? 'pulse 2s infinite' : 'none'
        //                     }}
        //                 />
        //             </div>
        //             <div className="position-relative d-inline-block">

        //           {/* Album Cover */}
                   

        //         </div>

        //             <div className="col-md-8">
        //                 <div className="text-center mb-4">
        //                     <h2 className="display-6 fw-bold mb-2 text-capitalize">
        //                         {currentSong?.title}
        //                     </h2>
        //                     <p className="lead text-white-50 mb-0">
        //                         {currentSong?.artist}
        //                     </p>
        //                 </div>

        //                 {/* Progress Bar */}
        //                 <div className="mb-3">
        //                     <input
        //                         type="range"
        //                         className="form-range"
        //                         min="0"
        //                         max={duration || 0}
        //                         value={currentTime}
        //                         onChange={handleSeek}
        //                         style={{
        //                             cursor: 'pointer'
        //                         }}
        //                     />
        //                     <div className="d-flex justify-content-between small text-white-50">
        //                         <span>{formatTime(currentTime)}</span>
        //                         <span>{formatTime(duration)}</span>
        //                     </div>
        //                 </div>

        //                 {/* Controls */}
        //                 <div className="d-flex justify-content-center gap-3 mt-4">
        //                     <button
        //                         onClick={() => dispatch(prev())}
        //                         className="btn btn-light btn-lg rounded-circle shadow"
        //                         style={{ width: '60px', height: '60px' }}
        //                     >
        //                         <i className="bi bi-skip-start-fill"></i>
        //                     </button>

        //                     <button
        //                         onClick={handleToggele}
        //                         className="btn btn-warning btn-lg rounded-circle shadow"
        //                         style={{ width: '70px', height: '70px' }}
        //                     >
        //                         <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} fs-4`}></i>
        //                     </button>

        //                     <button
        //                         onClick={() => dispatch(next())}
        //                         className="btn btn-light btn-lg rounded-circle shadow"
        //                         style={{ width: '60px', height: '60px' }}
        //                     >
        //                         <i className="bi bi-skip-end-fill"></i>
        //                     </button>
        //                 </div>
        //                 <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        //           {/* Shuffle Button */}
        //           <button 
        //             className="btn btn-outline-light rounded-circle shadow-sm"
        //             style={{ width: '50px', height: '50px' }}
        //             title="Shuffle">
        //             <i className="bi bi-shuffle"></i>
        //           </button>

        //           {/* Previous Button */}
        //           <button 
        //             onClick={() => dispatch(prev())} 
        //             className="btn btn-light rounded-circle shadow"
        //             style={{ width: '60px', height: '60px' }}>
        //             <i className="bi bi-skip-start-fill fs-5"></i>
        //           </button>
                  
        //           {/* Play/Pause Button */}
        //           <button
        //             onClick={handleToggele}
        //             className="btn btn-warning rounded-circle shadow-lg position-relative"
        //             style={{ 
        //               width: '80px', 
        //               height: '80px',
        //               transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
        //               transition: 'transform 0.3s ease'
        //             }}>
        //             <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} fs-3`}></i>
        //             {isPlaying && (
        //               <span className="position-absolute top-0 start-100 translate-middle p-2">
        //                 <span className="badge rounded-pill bg-danger">
        //                   <span className="visually-hidden">playing</span>
        //                 </span>
        //               </span>
        //             )}
        //           </button>
                  
        //           {/* Next Button */}
        //           <button 
        //             onClick={() => dispatch(next())} 
        //             className="btn btn-light rounded-circle shadow"
        //             style={{ width: '60px', height: '60px' }}
        //           >
        //             <i className="bi bi-skip-end-fill fs-5"></i>
        //           </button>

        //           {/* Repeat Button */}
        //           <button 
        //             className="btn btn-outline-light rounded-circle shadow-sm"
        //             style={{ width: '50px', height: '50px' }}
        //             title="Repeat"
        //           >
        //             <i className="bi bi-repeat"></i>
        //           </button>
        //                 </div> 
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // </div>

    )
}

export default PlayerBox;