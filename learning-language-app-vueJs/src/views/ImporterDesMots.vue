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
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import Papa from 'papaparse';
  
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
      };
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          Papa.parse(file, {
            header: true,
            complete: (results) => {
              this.phrases = results.data;
            },
          });
        }
      },
      speak(text, lang) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
      },
    },
  };
  </script>
  
  <style scoped>
  .v-data-table {
    width: 100%;
  }
  </style>
  