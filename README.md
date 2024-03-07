# Webstreamflix

Webstreamflix est une application web de streaming de films. Elle permet de visionner des films torrent en streaming directement dans le navigateur.
Elle utilise comme base de données les film de torrent9. Elle utilise également le lecteur vidéo Webtor-io pour le streaming des films.

## Technologies

- Node.js v18.19.1
- React.js v18.2.0
- Vercel (pour le déploiement et l'hébergement)

## Installation

Pour installer le projet, il suffit de cloner le dépôt et d'installer les dépendances avec npm.

```bash
git clone
cd webstreamflix
npm install
```

## Utilisation

Pour lancer le projet le frontend, il suffit de lancer la commande suivante:

```bash
npm start
```

Pour le backend, le code est placer dans le dossier api. Puisque le backend est déjà déployé sur Vercel, il n'est pas nécessaire de le lancer mais il peux être necessaire de le modifier l'URL de la requête API pour recuperer la liste des films avec votre propre URL.

## Auteur

- [Christopher Frick](https://linktr.ee/chrizzyfrick)

## License

Ce projet est sous licence [MIT](https://choosealicense.com/licenses/mit/).
