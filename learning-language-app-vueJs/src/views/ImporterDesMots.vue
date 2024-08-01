<template>
  <v-container>
    <v-card>
      <v-card-title>
        Prononciation des Phrases
      </v-card-title>
      <v-card-text>
        <input type="file" @change="onFileChange" accept=".csv" />
        <v-data-table :headers="headers" :items="phrases" class="elevation-1">
          <template v-slot:[`item.French`]="{ item }">
            <span>{{ item.French }}</span>
            <v-btn small @click="speak(item.French, 'fr-FR')">Écouter</v-btn>
          </template>
          <template v-slot:[`item.Portuguese`]="{ item }">
            <span>{{ item.Portuguese }}</span>
            <v-btn small @click="speak(item.Portuguese, 'pt-PT')">Ouvir</v-btn>
          </template>
          <template v-slot:[`item.English`]="{ item }">
            <span>{{ item.English }}</span>
            <v-btn small @click="speak(item.English, 'en-US')">Listen</v-btn>
          </template>
        </v-data-table>
        
        <!-- Bouton de confirmation d'importation -->
        <v-btn color="primary" @click="confirmImport">Confirmer l'importation</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Papa from 'papaparse';
import axios from 'axios';

export default {
  name: 'PronunciationTable',
  data() {
    return {
      headers: [
        { text: 'French', value: 'French' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'English', value: 'English' },
      ],
      phrases: [],
      csvFile: null,  // Variable pour stocker le fichier CSV sélectionné
      csvData: null   // Variable pour stocker les données du fichier CSV
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.csvFile = file;  // Sauvegarder le fichier sélectionné dans csvFile
      if (file) {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            this.phrases = results.data;
            this.csvData = results.data;  // Sauvegarder les données du fichier CSV dans csvData
          },
        });
      }
    },
    speak(text, lang) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    },
    confirmImport() {
      if (this.csvFile) {
        const formData = new FormData();
        formData.append('csvFile', this.csvFile);

        axios.post('http://localhost:3002/api/upload-csv', formData)
          .then(response => {
            console.log('Fichier CSV importé avec succès:', response.data);
            // Réinitialiser les données après l'importation réussie si nécessaire
            this.csvFile = null;  // Réinitialiser csvFile après l'importation
            this.csvData = null;  // Réinitialiser csvData après l'importation
          })
          .catch(error => {
            console.error('Erreur lors de l\'importation du fichier CSV:', error);
            // Gérer les erreurs d'importation si nécessaire
          });
      } else {
        console.warn('Aucun fichier CSV à importer.');
      }
    },
  },
};
</script>



  
  <style scoped>
  .v-data-table {
    width: 100%;
  }
  </style>
  