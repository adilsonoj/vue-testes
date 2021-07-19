<template>
   <v-row justify="center" align="center">
     <v-col justify="center" align="center" >
      <v-btn @click="getToken">Token</v-btn>
      <p>{{token}}</p>
      <p>decoded: {{decoded}}</p>
     </v-col>
   </v-row >
</template>

<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'
const SECRET_KEY = "482d648a75fc3d81f9e30a01aa3e9a6a9572b05e9347eafef034a0728b676b5a";
export default {
  data() {
    return {
      token: '',
      decoded: ''
    }
  },
  methods: {
    getToken(){
      console.log('token')
      axios.get('http://localhost:8082/pessoas/token')
      .then(response => {
        this.token = response.data
        console.log(response);
        
      }).then(() => {
        this.decoded = jwt.verify(this.token, Buffer.from(SECRET_KEY, 'base64'));
         console.log('decode',this.decoded)
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
}
</script>

<style>

</style>