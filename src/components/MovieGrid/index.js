import React from 'react';

function MovieGrid({ movies }) {
  return (
    <div className="row">
      {movies.map(movie => (
        <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <div className="card">
            <img src={movie.poster} className="card-img-top" alt={movie.title} />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;
