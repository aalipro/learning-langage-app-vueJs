// Importer le module Express
const express = require('express');
const browserSync = require('browser-sync');
const cors = require('cors');  // Importer le module CORS
const { handleCSVUpload,  getTousLesMots, getWordsByLanguage} = require('./csvHandler');  // Importer la fonction handleCSVUpload

// Créer une application Express
const app = express();

// Activer CORS pour toutes les routes
app.use(cors());

// Définir le répertoire statique pour "lesMots"
app.use('/lesMots', express.static('lesMots'));

// Définir une route GET
app.get('/', (req, res) => {
    res.send('Bonjour, monde !');
});

app.get('/mots', getTousLesMots);


// Définir une route POST pour l'upload de CSV
app.post('/api/upload-csv', handleCSVUpload);

app.get('/word-by-language', getWordsByLanguage);

// Écouter le port
const port = 3001;
app.listen(port, () => {
    console.log(`Serveur Express écoutant sur le port ${port}`);

    // Configuration de browser-sync
    browserSync({
        proxy: `localhost:${port}`,  // Proxy vers votre application Express.js
        files: ['public/**/*.{js,css,html}'],  // Fichiers à surveiller pour le rechargement
        port: 3002,  // Port pour browser-sync
        notify: false,  // Désactiver les notifications du navigateur
        ui: false,  // Désactiver l'interface utilisateur de browser-sync
        open: false  // Ne pas ouvrir de nouveaux onglets à chaque actualisation
    });
});
