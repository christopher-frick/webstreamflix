import React, { useEffect } from 'react';

function TorrentPlayer ({ magnetUrl, onClose }) {

  useEffect(() => {
    // Assurez-vous que WebTorrent est disponible comme variable globale
    if (window.WebTorrent) {
      console.log('WebTorrent est disponible');
      const client = new window.WebTorrent();
      const torrentId = magnetUrl;
      const demoTorrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
      console.log('Téléchargement du torrent:', demoTorrentId);
      console.log('magnetUrl:', torrentId);

      client.add(torrentId, function (torrent) {
        console.log('Torrent File:', torrent.files);
        const file = torrent.files.find(function (file) {
          
          return (file.name.endsWith('.mp4') ||
                  file.name.endsWith('.mkv') ||
                  file.name.endsWith('.avi') ||
                  file.name.endsWith('.webm') 
          );
        })

        // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
        file.appendTo('#display')
      })


      const torrent = client.get(torrentId);
      console.log("torrent: ", torrent);
      client.on('error', err => console.error('Erreur WebTorrent client:', err));
      torrent.on('error', err => console.error('Erreur Torrent:', err));

      return () => {
        if (client.torrents.length) {
          console.log("Suppression de tous les torrents");
          client.torrents.forEach(torrent => client.remove(torrent));
        } else {
          console.log("Destruction du client WebTorrent");
          client.destroy();
        }
      };
    } else {
      console.error("WebTorrent n'est pas disponible.");
    }
  }, [magnetUrl]);

  return (
    <div id="torrentPlayer">
      <div id="display"></div>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};

export default TorrentPlayer;
