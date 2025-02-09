# PWA 

Cette application est une Progressive Web App (PWA) qui permet de gérer diverses fonctionnalités.

## Fonctionnalités principales ✨

- **Prise de photo avec la caméra** 📷 : Capturez des photos directement depuis l'application.
- **Notifications** 🔔 : Recevez des notifications, par exemple, lors de la prise de photo.
- **Position géographique** 🌍 : Accédez à votre position géographique en temps réel.
- **Fonctionnement en mode hors ligne** 🌐⛔ : L'application continue de fonctionner même sans connexion internet, en utilisant les services locaux.
- **Stockage des photos dans le localStorage** 💾 : Les photos prises sont stockées localement dans le navigateur via `localStorage`.
- **Appels téléphoniques** 📞 : L'application permet de passer un appel téléphonique directement depuis l'interface.
- **Mode vibreur** 📳 : Les notifications peuvent activer le mode vibreur sur votre appareil pour une meilleure réactivité.
- **Niveau de batterie** 🔋 : Le niveau de batterie de l'appareil est affiché en temps réel. Ainsi que le statut de la batterie (en charge).
- **API WebOTP** 📱 : Utilisation de l'API WebOTP pour lire automatiquement les SMS et valider l'envoi d'un mot de passe. Cela n'affiche que la popup de confirmation mais ne met pas le code dans le champ de texte.
- **Serveur de tchat** 💬 : Un serveur de tchat commun permet aux utilisateurs d'interagir en temps réel.

## Déploiement 🚀

L'application a été déployée sur un serveur VPS : [https://haitam.elqassimi.angers.mds-project.fr/](https://haitam.elqassimi.angers.mds-project.fr/)

### Instructions de déploiement

1. Clonez le projet depuis le dépôt Git : [https://github.com/Haitam6/PWA](https://github.com/Haitam6/PWA)
2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Construisez l'application pour la production :
    ```bash
    npm run build
    ```
4. Déployez les fichiers générés dans le dossier `dist/` sur votre VPS.


## Technologies utilisées ⚙️

- **Vue.js** : Framework JavaScript pour construire l'application PWA.
- **TypeScript** : Langage de programmation pour une meilleure maintenabilité du code.


## Auteurs

- **Haitam EL QASSIMI** : [Profil GitHub](https://github.com/Haitam6)
