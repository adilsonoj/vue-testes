<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
      <v-text-field
        label="CPF"
        v-model="cpf"
        
      ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
      <v-banner
        elevation="2"
      >
        <span v-if="pessoa.nmFunc">{{ pessoa.nrNip }} - {{ pessoa.nmFunc }}</span>
      </v-banner>
      </v-col>
    </v-row>
    <v-row>
    <v-col
        cols="12"
        sm="6"
        md="6"
      >
      <v-autocomplete
        v-model="moduloSelecionado"
        :items="modulos.map(e=>e.cdProj+e.idModu)"
        dense
        label="Modulo"
        :disabled="!pessoa.nmFunc"
        @change="handleChangeModulo"
      ></v-autocomplete>
    </v-col>
    <v-col
        cols="12"
        sm="6"
        md="6"
      >
      <v-autocomplete
        v-model="oiSelecionado"
        :items="listaOi"
        item-label="oi"
        dense
        label="OI"
        @update:search-input="handleInputOi"
      ></v-autocomplete>
    </v-col>
      
    </v-row>
    <v-layout align-start justify-center>
      <v-flex xs6 class="elevation-1 pa-3 ma-2">
        <v-list 
          v-if="perfis"
          two-line>
          <v-subheader> PERFIL </v-subheader>
          <draggable
            v-model="perfis"
            :options="{ group: 'people' }"
            style="min-height: 10px"
          >
            <v-list-item 
              
              v-for="(item, index) in perfis" :key="index">

              <v-list-item-content>
                <v-list-item-title v-text="item.key.cdProj+item.key.idModu"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="item.codigoNivelAcesso.idNivlAces"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="associaPerfil(item)">
                  <v-icon color="grey lighten-1">mdi-arrow-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </draggable>
        </v-list>
      </v-flex>
      <v-flex xs6 class="elevation-1 pa-3 ma-2">
        <v-list v-if="perfisAssociados" two-line>
          <v-subheader> PERFIL ASSOCIADO: {{ moduloSelecionado }}</v-subheader>
          <draggable
            v-model="perfisAssociados"
            :options="{ group: 'people' }"
            style="min-height: 10px"
          >
            <v-list-item 
              
              v-for="item in perfisAssociados" :key="item.key.cdProj+item.key.idModu+item.codigoNivelAcesso.idNivlAces">
              <v-list-item-content>
                <v-list-item-title v-text="item.codigoNivelAcesso.idNivlAces"></v-list-item-title>
                <v-list-item-subtitle>OI: {{item.oi}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="desassociaPerfil(item)">
                  <v-icon color="grey lighten-1">mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </draggable>
        </v-list>
      </v-flex>
    </v-layout>
    <snackbar 
      :open="snack.open"  
      :text="snack.text" 
      @close="snack.open = false"
    />
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import axios from 'axios'
import { debounce } from "debounce";
import snackbar from "../../components/Snackbar"
export default {
  components: {
    draggable,
    snackbar,
  },
  data() {
    return {
      modulos: [],
      moduloSelecionado: "",
      cpf: "",
      pessoa: {nmFunc: ''},
      oiSelecionado: "",
      perfis: [],
      perfisAssociados: [],
      listaOi: [],
      listaCompletaOi: [],
      snack: { open: false, text: "" }
    };
  },
  watch: {
    cpf(val){
      if(val.length < 11) {
        this.pessoa = { nmFunc:'' }
        return
      }
      
      this.getPessoaPorCpf(val);
    }
  },
  computed: {
    findOi(){
      return this.listaCompletaOi.find(i=>i.oi===this.oiSelecionado)
    }
  },
  methods: {
    associaPerfil(item){
      const perfil = { ...item, oi: this.oiSelecionado }

      const existe = this.perfisAssociados.find(f => f.oi.concat(f.key.cdNivlAces) === perfil.oi.concat(perfil.key.cdNivlAces))
      if(existe) {
        return
      }

      let payload = {
        key: { 
          nrCpf01: this.pessoa.nrCpfFunc01,
          nrCpf02: this.pessoa.nrCpfFunc02,
          nrCpf03: this.pessoa.nrCpfFunc03,
          idDvCpf: this.pessoa.idDvCpfFunc,
          cdSupe: this.pessoa.cdSupe,
          cdDept: this.pessoa.cdDept,
          cdDivs: this.pessoa.cdDivs,
          cdScao: this.pessoa.cdSecao,
          cdSetr: this.pessoa.cdSetr,
          nivelAcesso: {
            cdProj: item.cdProj,
            idMoud: item.idModu,
            cdNivlAces: item.cdNivlAces,
          }
        }
      }

      console.log(payload)


      this.perfisAssociados.unshift(perfil)
      this.snack = { open: true, text: "Perfil associado"}
    },
    desassociaPerfil(item) {
      this.perfisAssociados = this.perfisAssociados.filter(f => {
        return f.oi.concat(f.key.cdNivlAces) != item.oi.concat(item.key.cdNivlAces)
      })
      this.snack = { open: true, text: "Perfil removido"}
    },
    handleChangeModulo(item){
      const cdProj = item.substring(0,2)
      const idModu = item.substring(2,4)
      console.log(cdProj, idModu)
      this.getNivelAcesso(cdProj, idModu)
      this.getNivelAcessoPorPessoa(this.cpf, cdProj, idModu)
    },
    handleInputOi: debounce(function (oi){
      if(!oi) return
      console.log(oi)
      this.getOi(oi)
    }, 700),
    
    getModulos(){
       axios.get('http://localhost:8082/modulos')
        .then(response => {
          this.modulos = response.data
          
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    getPessoaPorCpf(cpf){
      axios.get(`http://localhost:8082/pessoas/findbycpf?cpf=${cpf}`)
        .then(response => {
          console.log(response.data);
          this.pessoa = response.data
          
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    getNivelAcesso(cdProj, idModu){
      axios.get(`http://localhost:8082/nivelacesso?cdProj=${cdProj}&idModu=${idModu}`)
        .then(response => {
          console.log(response.data);
          this.perfis = response.data
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    getNivelAcessoPorPessoa(cpf, cdProj, idModu){
      axios.get(`http://localhost:8082/nivelusuario/findByCpfProj?cpf=${cpf}&cdProj=${cdProj}&idModu=${idModu}`)
        .then(response => {
          this.perfisAssociados = response.data.map(e => {
            return { codigoNivelAcesso: e.key.nivelAcesso.codigoNivelAcesso,
                      key: e.key.nivelAcesso.key,
                      oi: e.oi
                    }
          })
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    getOi(oi){
      axios.get(`http://localhost:8082/oi/like?oi=${oi}`)
        .then(response => {
          console.log(response.data);
          this.listaCompletaOi = response.data
          this.listaOi = response.data.map(e => e.oi)
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    
  },
  created(){
    this.getModulos()
    // this.getPessoaPorCpf('05608377710')
    // this.getNivelAcesso('PV', '01')
    // this.getNivelAcessoPorPessoa('05608377710','PV', '01' )
  }
};
</script>

<style>
</style>