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
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Hora Fim"
              type="time"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-range-slider
              hint="Im a hint"
              max="50"
              min="-50"
            ></v-range-slider>
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
    i: 0,
  }),
  methods: {
    addIntervalo() {
      this.intervalos.push("11:00 as 13:00 - seg, ter, qua " + this.i++);
    },
  },
};
</script>

<style>
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
</style>