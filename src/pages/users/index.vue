<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      no-data-text="Nenhum registro encontrado"
      no-results-text="Nenhum registro encontrado"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
      :disable-sort="$vuetify.breakpoint.xs"
    >
      <!-- template insert and edit -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuários</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn fab color="primary" dark class="mr-2">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
          <CreateEdit @snackbar="openSnackbar" />

          <v-dialog v-model="dialogDelete" max-width="480px">
            <v-card>
              <v-card-title class="headline">Tem certeza?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-toolbar flat class="mt-5">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisa"
            single-line
            hide-details
            class="mb-5"
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:[`item.bloqueado`]="{ item }">
        <!-- <v-simple-checkbox v-model="item.bloqueado"></v-simple-checkbox> -->
        <v-switch v-model="item.bloqueado"></v-switch>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-btn tile small color="primary"
          ><v-icon small @click="editItem(item)"> mdi-pencil </v-icon></v-btn
        >
        <v-btn tile small color="red"
          ><v-icon small color="white"@click="editItem(item)"> mdi-delete </v-icon></v-btn
        > -->
        <v-btn icon color="success" @click="upload(item)"
          ><v-icon small dark> mdi-paperclip </v-icon></v-btn
        >
        <v-btn icon color="primary" @click="editItem(item)"
          ><v-icon small dark> mdi-pencil </v-icon></v-btn
        >
        <v-btn icon color="red" @click="deleteItem(item)"
          ><v-icon small dark> mdi-delete </v-icon></v-btn
        >
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template> -->
    </v-data-table>
    <div class="text-center pt-2 pb-5">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <!-- <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field> -->
    </div>
    <Snackbar
      :open="snackbar.open"
      :text="snackbar.text"
      @close="snackbar.open = $event"
    />
    <Upload :openupload="openupload" @closeUpload="closeUpload" />
  </div>
</template>

<script>
import Snackbar from "../../components/Snackbar";
import CreateEdit from "./create-edit";
import Upload from "./upload";
export default {
  name: "Users",
  components: {
    Snackbar,
    CreateEdit,
    Upload,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      search: "",
      headers: [
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "telefone" },
        { text: "Perfil", value: "perfil" },
        { text: "Bloqueado", value: "bloqueado", align: "center" },
        { text: "Ações", value: "actions", sortable: false },
      ],

      dialog: false,
      dialogDelete: false,
      snackbar: {
        open: false,
        text: "",
      },
      openupload: false,
    };
  },
  computed: {
    desserts() {
      return this.$store.state.desserts;
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    editItem(item) {
      this.$store.commit("editItem", item);
    },
    deleteItem(item) {
      this.$store.commit("selectItem", item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.closeDelete();
      this.openSnackbar("Excluído com sucesso!");
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$store.commit("deleteItem");
    },
    openSnackbar(text) {
      this.snackbar.open = true;
      this.snackbar.text = text;
    },
    upload(item) {
      this.openupload = true;
      console.log(item);
    },
    closeUpload() {
      this.openupload = false;
    },
  },
};
</script>

<style></style>
