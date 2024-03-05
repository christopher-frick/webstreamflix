import React, { useEffect } from 'react';

function TorrentPlayer({ magnetUrl, onClose }) {
  // Déplacer la déclaration ici pour rendre `playerElementId` accessible dans tout le composant
  const playerElementId = 'display';

  useEffect(() => {
    const scriptId = 'webtor-sdk-script';

    // Supprimez cette ligne car `playerElementId` est maintenant déclaré à l'extérieur
    // const playerElementId = 'display';

    // Vérifie si le script a déjà été chargé
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      // Accès au script via un chemin absolu par rapport à la racine du site
      script.src = '/libs/webtor-io-embed-sdk-js/index.min.js';
      script.id = scriptId;
      script.async = true;
      // Attache l'événement onload au script avant de l'ajouter au document
      script.onload = () => initWebtor();
      document.body.appendChild(script);
    } else {
      // Si le script est déjà chargé, initialise Webtor immédiatement
      initWebtor();
    }

    function initWebtor() {
      window.webtor = window.webtor || [];
      window.webtor.push({
        id: playerElementId,
        magnet: magnetUrl,
        on: function(e) {
          if (e.name === window.webtor.TORRENT_FETCHED) {
            console.log('Torrent fetched!', e.data);
          }
          if (e.name === window.webtor.TORRENT_ERROR) {
            console.error('Torrent error!');
          }
        },
      });
    }

    const cleanUpPreviousContent = () => {
      const playerElement = document.getElementById(playerElementId);
      if (playerElement) {
        while (playerElement.firstChild) {
          playerElement.removeChild(playerElement.firstChild);
        }
      }
    };

    cleanUpPreviousContent();

    return () => {
      cleanUpPreviousContent();
      // Optionnellement, nettoyer le script chargé s'il n'est plus nécessaire
    };
  }, [magnetUrl]);

  return (
    <div>
      <div id={playerElementId}></div>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
}

export default TorrentPlayer;
