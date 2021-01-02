<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Upload</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <Upload />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeUpload"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="closeUpload"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
import Upload from "../../components/Upload";
export default {
  name: "upload",
  props: {
    openupload: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Upload,
  },
  data() {
    return {};
  },
  computed: {
    dialog() {
      return this.openupload;
    },
  },
  methods: {
    closeUpload() {
      this.$emit("closeUpload");
    },
  },
};
</script>

<style>
</style>