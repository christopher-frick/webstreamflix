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
      
      setMovies(data.map((movie, index) => ({
        id: index, // Utilisez un identifiant unique pour chaque film, l'index peut servir si l'API ne retourne pas d'ID
        title: movie.title,
        poster: movie.img_link,
        detailUrl: movie.detail_url,
        seeders: movie.seeders.trim(), // Supprimez les espaces inutiles
        leechers: movie.leechers,
        size: movie.size,
        magnetUrl: movie.magnet_link,
        description: movie.description
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
