import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import MovieGrid from '../../components/MovieGrid';
import './styles.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour gérer la recherche
  const handleSearch = async (query) => {
    console.log("Recherche pour:", query);
    
    
    try {
      setIsLoading(true);
      // Remplacez 'URL_DE_VOTRE_FONCTION_SERVERLESS' par l'URL de votre fonction serverless
      const response = await fetch(`https://webstreamflix.vercel.app/api/search_movies?name=${query}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      
      //setMoviees order by movie.ratio from high to low 
      data.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));

      setMovies(data.map((movie, index) => ({
        id: index,
        title: movie.title,
        poster: movie.img_link,
        detailUrl: movie.detail_url,
        seeders: movie.seeders,
        leechers: movie.leechers,
        size: movie.size,
        magnetUrl: movie.magnet_link,
        description: movie.description,
        ratio: movie.ratio
      })));
    } catch (error) {
      console.error("Erreur lors de la recherche de films:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3">Bienvenue sur WebStreamFlix</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? <p>Chargement...</p> : <MovieGrid movies={movies} />}
    </div>
  );
}

export default Home;
