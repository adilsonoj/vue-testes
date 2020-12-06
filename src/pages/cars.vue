<template>
  <v-app>
    <v-banner elevation="1"> Car List </v-banner>
    <v-main>
      <v-container>
        <v-card max-width="400" class="mx-auto">
          <v-row dense>
            <v-col v-for="car in cars" :key="car.id" cols="12">
              <v-card dark color="#385F73">
                <v-card-title class="headline">
                  {{ car.model }}
                </v-card-title>

                <v-card-subtitle>{{ car.brand }}.</v-card-subtitle>

                <v-card-actions>
                  <v-btn text> More </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      cars: [],
    }
  },
  async created() {
    const cars = await this.$axios.$get('http://localhost:8080/carlist')
    this.cars = cars
  },
}
</script>
