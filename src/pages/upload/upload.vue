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
import { saveAs } from "file-saver";
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
      const bodyFormData = new FormData();
      bodyFormData.append("file", this.currentFile);
      bodyFormData.append(
        "alias",
        "leonardo lira de oliveira eireli35443330000136"
      );
      bodyFormData.append("senha", "@oliveira09");
      const resp = await axios({
        method: "POST",
        data: bodyFormData,
        url: "http://localhost:8085/certificado/assinar",
        headers: {
          "Content-Type": "multipart/form-data",
          responseType: "blob",
        },
      });

      saveAs(this.dataURItoBlob(resp.data.file), resp.data.name);
      console.log(resp);
    },

    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      var blob = new Blob([ab], { type: "application/pdf" });
      return blob;
    },
  },
};
</script>

<style></style>
