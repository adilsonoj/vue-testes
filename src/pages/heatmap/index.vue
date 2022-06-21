<template>
  <section id="section">
    <v-btn @click="getDataUrl">dataurl</v-btn>
    <v-btn @click="addData">addData</v-btn>
    <!-- <div id="area" @click="onClick($event)"></div>

    <div id="sgv-area"></div> -->

    <div id="img-container">
      <img :src="dataUrl" alt="" srcset="" />
    </div>
  </section>
</template>


<script>
import h337 from "heatmap.js";
export default {
  name: "HeatMap",
  data: () => ({
    heatmap: null,
    dataUrl: "",
    points: [
      { x: 209, y: 91, value: 20, valueField: "Value Field" },
      { x: 283, y: 92, value: 40 },
      { x: 367, y: 87, value: 60 },
      { x: 171, y: 251, value: 80 },
      { x: 257, y: 254, value: 90 },
      { x: 355, y: 254, value: 100 },
      { x: 689, y: 139, value: 80 },
      { x: 760, y: 176, value: 40 },
      { x: 835, y: 216, value: 80 },
      { x: 902, y: 261, value: 100 },
      { x: 629, y: 307, value: 25 },
      { x: 699, y: 342, value: 45 },
      { x: 771, y: 383, value: 67 },
      { x: 840, y: 424, value: 58 },
      { x: 510, y: 524, value: 58 },
      { x: 473, y: 195, value: 100 },
      { x: 218, y: 378, value: 100 },
      { x: 240, y: 381, value: 100 },
      { x: 254, y: 384, value: 100 },
      { x: 272, y: 385, value: 100 },
    ],
  }),
  methods: {
    onClick(e) {
      var x = e.layerX;
      var y = e.layerY;
      console.log(e);
      this.points.push({ x, y, value: 100 });
      //this.heatmap.addData({ x: x, y: y, value: 1 });
    },

    getDataUrl() {
      this.dataUrl = this.heatmap.getDataURL();
    },

    point() {
      var section = document.getElementById("section");
      var divNova = document.createElement("div");
      divNova.setAttribute("id", "image");
      section.appendChild(divNova);
      var heatmap = h337.create({
        container: document.getElementById("image"),
      });

      heatmap.setData({
        max: 100,
        radius: 10,
        blur: 0.75,
        maxOpacity: 0.5,
        data: this.points,
        onExtremaChange: function onExtremaChange(data) {
          console.log(data);
        },
      });

      this.heatmap = heatmap;
    },

    addData() {
      this.heatmap.addData({ x: 209, y: 91, value: 20 });
      this.getDataUrl();
    },
    autmaticUpdate() {
      let n;
      let point;
      const interval = setInterval(() => {
        n = Math.floor(Math.random() * (this.points.length - 1 - 0)) + 0;
        point = this.points[n];
        point.value = 20;
        this.heatmap.addData(point);
        this.getDataUrl();
      }, 1000);

      setTimeout(() => clearInterval(interval), 20000);
    },
  },
  mounted() {
    this.point();
    this.getDataUrl();

    this.autmaticUpdate();
  },
};
</script>

<style>
#area {
  max-width: 800px;
  max-height: 800px;

  min-width: 300px;
  min-height: 600px;
  background-color: azure;
  background-image: url("../../assets/austria.svg");
  background-size: contain;
}

#img-container {
  max-width: 1024px;
  max-height: 786px;
  min-width: 300px;
  min-height: 600px;

  background-image: url("http://www.agrestemed.com.br/wp-content/uploads/2018/08/p1.jpg");
  background-size: contain;
}

#image {
  width: 1024px;
  height: 786px;
  background-color: azure;
  background-image: url("http://www.agrestemed.com.br/wp-content/uploads/2018/08/p1.jpg");
  background-size: contain;
  display: none;
}

img {
  width: 100%;
  height: auto;
}
</style>