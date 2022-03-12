<template>
  <div>
    <div v-if="currentFile">
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12">
          <v-progress-linear v-model="progress" color="light-blue" reactive>
          </v-progress-linear>
        </v-col>
      </v-row>
    </div>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="Arquivo"
          @change="selectFile"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="primary" dark small class="mr-5" @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <!-- <v-btn color="primary" fab dark small @click="upload">
          <v-icon dark>mdi-cloud-upload</v-icon>
        </v-btn> -->
      </v-col>
    </v-row>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "upload-files",
  data() {
    return {
      currentFile: "",
      progress: "",
      message: "",
      fileInfos: [],
    };
  },
  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    async upload() {
      this.progress = 100;
      console.log(this.currentFile);
      const formData = new FormData();
      formData.append("file", this.currentFile);
      formData.append("senha", "@oliveira09");
      formData.append("alias", "Ferdinand");

      const resp = await axios({
        method: "POST",
        data: formData,
        url: "http://localhost:8085/certificado/upload/chave",
        headers: {
          "Content-Type": "multipart/form-data",
          responseType: "blob",
        },
      });
      console.log(resp);
    },
  },
};
</script>

<style></style>
