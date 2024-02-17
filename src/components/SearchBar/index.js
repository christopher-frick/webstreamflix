import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <div className="input-group mb-3" style={{ width: "50%", margin: "auto" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Rechercher des films ou séries..."
        onKeyPress={event => {
          if (event.key === 'Enter') {
            onSearch(event.target.value);
          }
        }}
      />
    </div>
  );
}

export default SearchBar;
