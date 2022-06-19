<template>
  <v-container class="back pa-0 ma-0" fluid>
    <v-row align="center" justify="center" style="padding-top: 200px">
      <v-btn @click="dialog = true">glass</v-btn>
    </v-row>
    <div class="glass quadrado"></div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card color="transparent" dark>
        <div class="glass">
          <v-card-text> glass </v-card-text>
          <v-card-actions>
            <v-btn color="#5799e5" dark @click="dialog = false">Fechar</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>
.back {
  background-color: #5799e5;
  height: calc(100vh - 64px);
}
.glass {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border-radius: 10px;
}

.quadrado {
  width: 100px;
  height: 100px;
}
</style>