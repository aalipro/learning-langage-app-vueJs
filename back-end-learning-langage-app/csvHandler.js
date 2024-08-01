// csvHandler.js

const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

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

function getTousLesMots(req, res) {
    const directoryPath = path.join(__dirname, 'lesMots');
    const allWords = [];

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du répertoire.');
        }

        const csvFiles = files.filter(file => path.extname(file) === '.csv');
        let filesProcessed = 0;

        if (csvFiles.length === 0) {
            return res.json(allWords);
        }

        csvFiles.forEach(file => {
            const filePath = path.join(directoryPath, file);

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    allWords.push(row);
                })
                .on('end', () => {
                    filesProcessed += 1;
                    if (filesProcessed === csvFiles.length) {
                        res.json(allWords);
                    }
                });
        });
    });
}

function getWordsByLanguage(req, res) {
    const { natifLanguage, translation } = req.query;
    if (!natifLanguage || !translation) {
        return res.status(400).send('Les paramètres natifLanguage et translation sont requis.');
    }

    const directoryPath = path.join(__dirname, 'lesMots');
    const filteredWords = [];

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du répertoire.');
        }

        const csvFiles = files.filter(file => path.extname(file) === '.csv');
        let filesProcessed = 0;

        if (csvFiles.length === 0) {
            return res.json(filteredWords);
        }

        csvFiles.forEach(file => {
            const filePath = path.join(directoryPath, file);

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    if (row[natifLanguage] && row[translation]) {
                        filteredWords.push({
                            [natifLanguage]: row[natifLanguage],
                            [translation]: row[translation]
                        });
                    }
                })
                .on('end', () => {
                    filesProcessed += 1;
                    if (filesProcessed === csvFiles.length) {
                        res.json(filteredWords);
                    }
                });
        });
    });
}

module.exports = {
    handleCSVUpload,
    getTousLesMots,
    getWordsByLanguage
};
