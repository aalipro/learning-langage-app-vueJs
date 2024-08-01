// csvHandler.js

const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// Middleware pour gérer les téléchargements de fichiers CSV
const upload = multer({ dest: 'uploads/' });

function handleCSVUpload(req, res, next) {
    upload.single('csvFile')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        console.log(req.hasOwnProperty("file"));
        if (!req.file) {
            return res.status(400).send('Aucun fichier téléchargé.');
        }

        // Lire le fichier CSV et le sauvegarder dans "lesMots"
        const csvFilePath = req.file.path;
        const targetFilePath = `lesMots/${req.file.originalname}`;

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                // Traitement des lignes du fichier CSV (optionnel)
                console.log(row);
            })
            .on('end', () => {
                // Déplacer le fichier vers "lesMots"
                fs.rename(csvFilePath, targetFilePath, (err) => {
                    if (err) {
                        return res.status(500).send('Erreur lors du déplacement du fichier.');
                    }
                    res.send('Fichier CSV téléchargé et sauvegardé avec succès.');
                });
            });
    });
}

module.exports = {
    handleCSVUpload
};
