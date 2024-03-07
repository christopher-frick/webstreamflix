import React, { useState } from 'react';
import TorrentPlayer from '../TorrentPlayer'; 

function MovieGrid({ movies }) {
  const [currentMagnet, setCurrentMagnet] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlay = (magnetUrl) => {
    console.log('handlePlay appelé avec :', magnetUrl);
    setCurrentMagnet(magnetUrl);
    setShowPlayer(true);
    document.getElementById('display').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="row">
      {showPlayer && <TorrentPlayer magnetUrl={currentMagnet} onClose={() => setShowPlayer(false)} />}
      {movies.map(movie => (
        <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card h-100"> {/* Utilisez h-100 pour que toutes les cartes aient la même hauteur */}
          <img src={movie.poster} className="card-img-top" alt={movie.title} style={{ objectFit: 'contain', width: '100%', height: '200px' }} />
            <div className="card-body d-flex flex-column"> {/* Utilisez flex-column pour aligner les éléments en colonne */}
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text"><small>Seeders: {movie.seeders}</small></p>
              <p className="card-text"><small>Leechers: {movie.leechers}</small></p>
              <p className="card-text"><small>Size: {movie.size}</small></p>
              <p className="card-text"><small>Ratio: {movie.ratio}</small></p>
              <button onClick={() => handlePlay(movie.magnetUrl)} className="btn btn-primary">Play</button>
              <button onClick={() => window.open(movie.magnetUrl, '_blank')} className="btn btn-danger">Magnet</button>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
}


export default MovieGrid;
