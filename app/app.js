'use strict'

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework')
const axios = require('axios')

const config = {
  logging: true
}

const app = new App(config)
const BACKEND_BASE_URL = 'http://188.166.61.141/' // To change

// =================================================================================
// App Logic
// =================================================================================

function makeUrl (intent) {
  let inputs = intent.getInputs()
  return BACKEND_BASE_URL
    + '?size=' + inputs.size.value
    + '&color=' + inputs.color.value
    + '&max_price=' + inputs.max_price.value
}

app.setHandler({
  'LAUNCH': function () {
    this.ask('Bonjour et bienvenue chez BestShoes ! Quelle taille pour vos chaussures ?')
  },

  'FindShoesIntent': function (size) {
    let url = makeUrl(this)
    axios.get(url)
      .then(function () {
        this.tell('Votre sélection vous a été envoyée par email. Au revoir.')
      }.bind(this))
      .catch(function (error) {
        console.log(error)
        this.tell('Erreur - Au revoir')
      }.bind(this))
  }
})

module.exports.app = app
