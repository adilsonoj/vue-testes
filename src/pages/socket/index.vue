<template>
<div>
  <v-row justify="center">
    <v-text-field
    label="nome"
    v-model="nome"
    outlined
    ></v-text-field>
     <v-text-field
    label="texto"
    v-model="message"
    outlined
    ></v-text-field>
    <v-btn
        block
        outlined
        color="blue"
        @click="sendMessage"
        >
        send
    </v-btn>
    
     
  </v-row>
  <v-row justify="center">
      <v-col>
    <p v-for="(item, index) in messages" :key="index">
        {{item.nome}} - {{item.message}}
    </p>

      </v-col>
  </v-row>
</div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
export default {
    data(){
        return {
            stompClient: null,
            message: '',
            messageOutput: '',
            nome: '',
            messages: []
        }
    },
    methods:{
        connect() {
            var socket = new SockJS('http://localhost:8085/chat');
            this.stompClient = Stomp.over(socket);  
            this.stompClient.connect({}, function(frame) {
                console.log('Connected: ' + frame); 
                this.subscribe();
            });
        },
        subscribe(){
            this.stompClient.subscribe('/topic/messages', (messageOutput) => {
                console.log(JSON.parse(messageOutput.body));
                this.messageOutput = messageOutput.body;
                this.messages.push(JSON.parse(messageOutput.body))
            });
        },
        sendMessage(){
            this.stompClient.send("/topic/messages", {}, 
                  JSON.stringify({nome: this.nome, message: this.message}));
        },
        disconnect() {
            if(this.stompClient != null) {
                this.stompClient.disconnect();
            }
            console.log("Disconnected");
        }
    },
    mounted(){
        this.connect();
        
    }
}
</script>

<style>

</style>