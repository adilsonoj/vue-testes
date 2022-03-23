<template>
  <v-row>
      <v-col>
          {{apiKey()}}
           <v-chip
            class="ma-2"
            :color="autenticado ? 'success' : 'red'"
            text-color="white"
            >
            Autenticado
            </v-chip>
          <v-btn
          @click="auth">
            Auth
          </v-btn>
      </v-col>
  </v-row>

</template>

<script>
import axios from "axios";
import createHmac from "crypto-js/hmac-sha384"
export default {
    data(){
        return {
            autenticado: false
        }
    },
    methods: {
        apiKey(){
            const strToBeSigned = `api-key-message`;
            const API_SECRET = 'DF47DCCD90140DA058B2183CFED57E18A4840685658047C036062BC6E54356C5'
            const hashBuffer = Buffer.from(strToBeSigned).toString("base64");

            return createHmac(hashBuffer, API_SECRET).toString();
        },
        auth(){
            axios({
                url:"http://localhost:8085/api/v1/index",
                method: 'GET',
                headers: {
                    
                    "X-apikey": this.apiKey()
                    }
            })
            .then(resp => {
                console.log(resp)
                    this.autenticado = resp.status==200
            })
            .catch(error => console.log(JSON.stringify(error, null, 2)))
        }
    },
    
}
</script>

<style>

</style>