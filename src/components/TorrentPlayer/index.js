import React, { useEffect } from 'react';

function TorrentPlayer({ magnetUrl, onClose }) {
  useEffect(() => {
    // Cette partie du code initialise le SDK de Webtor.io
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Configuration du SDK pour intégrer le lecteur vidéo
      window.webtor = window.webtor || [];
      window.webtor.push({
        id: 'player', // Assurez-vous que cet ID correspond à l'ID de votre div pour le lecteur
        magnet: magnetUrl,
        on: function(e) {
          if (e.name === window.webtor.TORRENT_FETCHED) {
            console.log('Torrent fetched!', e.data);
          }
          if (e.name === window.webtor.TORRENT_ERROR) {
            console.error('Torrent error!');
          }
        },
        // Vous pouvez ajouter d'autres configurations ici
      });
    };

    return () => {
      // Nettoyez le script lors du démontage du composant
      document.body.removeChild(script);
    };
  }, [magnetUrl]); // S'exécute à chaque fois que magnetUrl change

  return (
    <div>
      {/* Div où le lecteur sera intégré */}
      <div id="player"></div>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
}

export default TorrentPlayer;
