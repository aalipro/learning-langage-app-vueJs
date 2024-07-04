<template>
    <div class="component-centered" id="cardChoixAppli">
        <h1 class="titleAccueil">Choix de la langue</h1>
        <hr id="ligneSeparation"/>
        <div>
            <div class="container-button">
                <!-- <div class="container-btn-choix-application1" v-on:click="lancerFisimedClients()"><button class="btn-choix-application">Fisimed clients</button></div> -->
                <!-- <div class="container-btn-choix-application2" v-on:click="lancerAltyseClients"><button class="btn-choix-application">Fisimed client altyse</button></div> -->
                <div class="container-btn-choix-application3" v-on:click="lancerAnglais"><button class="btn-choix-application">Anglais</button></div>
                <div class="container-btn-choix-application4" v-on:click=" lancerPortugais"><button class="btn-choix-application">Portugais</button></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #cardChoixAppli {
        position: absolute;
        top: 30%;
        color: white;
        text-align: center;
        white-space: nowrap;
        border: solid 0.5px;
        padding: 15px;
        background-image: linear-gradient(to bottom, #0072c6, #00bfff);
    }

    #ligneSeparation {
        background: white;
        height: 1px;
    }

    .container-button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container-btn-choix-application1 > button {
        background-color: darkblue;
        color: white;
        border-radius: 10px;
        border: hidden;
        width: 200px;
        height: auto;
        text-align: center;
        padding: 10px;
        margin: 10px;
        font-size: medium;
    }

    .container-btn-choix-application2 > button {
        background-color: red;
        color: white;
        border-radius: 10px;
        border: hidden;
        width: 200px;
        height: auto;
        text-align: center;
        padding: 10px;
        margin: 10px;
        font-size: medium;
    }

    .container-btn-choix-application3 > button {
        background-color: steelblue;
        color: white;
        border-radius: 10px;
        border: hidden;
        width: 200px;
        height: auto;
        text-align: center;
        padding: 10px;
        margin: 10px;
        font-size: medium;
    }

    .container-btn-choix-application4 > button {
        background-color: green;
        color:white;
        border-radius: 10px;
        border: hidden;
        width: 200px;
        height: auto;
        text-align: center;
        padding: 10px;
        margin: 10px;
        font-size: medium;
    }

    @media screen and (max-width: 900px) {
        h1 {
            font-size: 20px;
        }
    }

</style>

<script>
export default {
  name: 'ChoixLangue',
  data() {
    return {
      message: 'Bonjour, monde !',
      description: 'Ceci est un exemple de composant Vue.js avec Vuetify.'
    };
  },
  methods : {
    lancerAnglais(){
        this.$router.push('/anglais')
    },
    lancerPortugais(){
        this.$router.push('/portugais')
    }
  }
};
</script>

<style scoped>
/* Styles spécifiques à ce composant */
h1 {
  color: #42b983; /* Couleur Vuetify */
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
  margin-top: 10px;
}
</style>
