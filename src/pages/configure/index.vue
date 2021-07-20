<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title>Consulta</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Duração"
              placeholder="minutos"
              outlined
              type="number"
              dense
              v-model="duracaoConsulta"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              :items="items"
              chips
              label="Chips"
              multiple
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Hora Início"
              type="time"
              outlined
              dense
              v-model="horaInicio"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Hora Fim"
              type="time"
              outlined
              dense
              v-model="horaFim"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-range-slider
              :min="'0'"
              :max="horarioslabel.length == 0 ? 10 : horarioslabel.length-1"
              :disabled="horarioslabel.length == 0"
              :tick-labels="horarioslabel"
              
              v-model="intervalo"
              @end="rangeslider"
              thumb-label="always"
              ticks="false"
             
            >
            <template v-slot:thumb-label="{ value }">
              {{ horarioslabel[value] }}
             </template>
            </v-range-slider>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              :items="items"
              chips
              label="Dias"
              multiple
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="1">
            <v-btn tile dark color="primary">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="5" class="pl-10">
            <h4 class="text">Intervalos cadastrados</h4>
            <ul>
              <li>11:00 as 13:00 - seg, ter, qua</li>
              <li>11:00 as 13:00 - seg, ter, qua</li>
              <li>11:00 as 13:00 - seg, ter, qua</li>
            </ul>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Recesso</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Data Início"
              type="date"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Data Fim"
              type="date"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              label="Hora Início"
              type="time"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              label="Hora Fim"
              type="time"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="1">
            <v-btn tile dark color="primary" @click="addIntervalo">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3"> </v-col>
          <v-col cols="12" sm="6" md="3"> </v-col>
          <v-col cols="12" sm="6" md="5" class="pl-10">
            <h4 class="text">Intervalos cadastrados</h4>
            <ul v-for="item in intervalos" :key="item">
              <li>{{ item }}</li>
            </ul>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ["seg", "ter", "qua", "qui"],
    intervalos: [],
    intervalo: [0 ,2],
    horarios: ["08:30","08:30","09","09:30","10","10:30"],
   // horarioslabel: ["08","08:30","09","09:30","10","10:30"],
    duracaoConsulta: 30,
    horaFim: "12:00",
    horaInicio: "08:00",
    i: 0,
  }),
  computed: {
     horarioslabel(){
       if(this.duracaoConsulta == 0 || !this.horaInicio || !this.horaFim)
        return []

      return this.getRangeHorarios(
                              this.duracaoConsulta,
                              this.horaInicio,
                              this.horaFim
                              );
    }
  },
  methods: {
    addIntervalo() {
      this.intervalos.push("11:00 as 13:00 - seg, ter, qua " + this.i++);
    },
    replace(value){
       return value && value.replace(".5",":30")
    },
    rangeslider(val){
      this.$nextTick(()=>{
        console.log('inicio',this.horarioslabel[val[0]])
        console.log('fim',this.horarioslabel[val[1]])

      })
    },
   
    getRangeHorarios(duracaoConsulta, horarioInicio, horarioFinal){
      let h = horarioInicio.split(":")
      let nextH = ""
      let rangeHorario = []
      while(nextH != horarioFinal){
        nextH = new Date(new Date(2021, 7, 21, parseInt(h[0]), parseInt(h[1])).getTime() + duracaoConsulta * 60 * 1000).toTimeString().substring(0,5)
        rangeHorario.push(nextH)
        h = nextH.split(":")
      }
      rangeHorario.unshift(horarioInicio)
      return rangeHorario
   }


  },
};
</script>

<style scope>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.v-slider--horizontal .v-slider__tick .v-slider__tick-label {
  display: none;
}
</style>