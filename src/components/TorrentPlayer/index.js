import React, { useEffect, useRef } from 'react';

const TorrentPlayer = ({ magnetUrl, onClose }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Assurez-vous que WebTorrent est disponible comme variable globale
    if (window.WebTorrent) {
      const client = new window.WebTorrent();
      
      client.add(magnetUrl, torrent => {
        // Torrent est prêt à être streamé
        const file = torrent.files.find(file => file.name.endsWith('.mp4'));
        if (file) {
          file.appendTo(playerRef.current); // Affiche la vidéo dans l'élément référencé
        }
      });

      return () => {
        client.destroy();
      };
    } else {
      console.error("WebTorrent n'est pas disponible.");
    }
  }, [magnetUrl]);

  return (
    <div>
      <button onClick={onClose}>Fermer</button>
      <div ref={playerRef} />
    </div>
  );
};

export default TorrentPlayer;
