<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
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
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" fab dark v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nome"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.telefone"
                        label="Telefone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.perfil"
                        label="Perfil"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.bloqueado"
                        label="Bloqueado"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
        <v-toolbar flat>
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
        <v-simple-checkbox v-model="item.bloqueado"></v-simple-checkbox>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-btn tile small color="primary"
          ><v-icon small @click="editItem(item)"> mdi-pencil </v-icon></v-btn
        >
        <v-btn tile small color="red"
          ><v-icon small color="white"@click="editItem(item)"> mdi-delete </v-icon></v-btn
        > -->

        <v-btn icon color="primary" @click="editItem(item)"
          ><v-icon small dark>
            mdi-pencil
          </v-icon></v-btn
        >
        <v-btn icon color="red" @click="deleteItem(item)"
          ><v-icon small dark>
            mdi-delete
          </v-icon></v-btn
        >
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
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
  </div>
</template>

<script>
import Snackbar from "../../components/Snackbar";
export default {
  name: "Users",
  components: {
    Snackbar,
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
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "telefone" },
        { text: "Perfil", value: "perfil" },
        { text: "Bloqueado", value: "bloqueado", align: "center" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      desserts: [
        {
          name: "Isaac Newton",
          email: "newton@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "capitania",
          bloqueado: true,
        },
        {
          name: "Charles Augustin de Coulomb",
          email: "coulomb@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "capitania",
          bloqueado: false,
        },
        {
          name: "Amedeo Avogadro",
          email: "avogadro@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "armador",
          bloqueado: false,
        },
        {
          name: "Johann Josef Loschmidt",
          email: "loschmidt@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "armador",
          bloqueado: true,
        },
        {
          name: "Johann Jakob Balmer",
          email: "balmer@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "admin",
          bloqueado: true,
        },
        {
          name: "Joseph Stefan",
          email: "stefan@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "capitania",
          bloqueado: false,
        },
        {
          name: "Ludwig Boltzmann",
          email: "boltzmann@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "capitania",
          bloqueado: true,
        },
        {
          name: "Johannes Rydberg",
          email: "rydberg@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "admin",
          bloqueado: true,
        },
        {
          name: "Joseph John Thomson",
          email: "thomson@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "admin",
          bloqueado: true,
        },
        {
          name: "Max Planck",
          email: "planck@domain.com",
          telefone: "(99) 9999-9999",
          perfil: "admin",
          bloqueado: true,
        },
      ],
      editedItem: {
        name: "",
        email: "",
        telefone: "",
        perfil: "",
        bloqueado: "true",
      },
      defaultItem: {
        name: "",
        email: "",
        telefone: "",
        perfil: "",
        bloqueado: "true",
      },
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      snackbar: {
        open: false,
        text: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Usuário" : "Edita Usuário";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
      this.openSnackbar("Excluído com sucesso!");
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.openSnackbar("Editado com sucesso!");
      } else {
        this.desserts.push(this.editedItem);

        this.openSnackbar("Salvo com sucesso!");
      }
      this.close();
    },
    openSnackbar(text) {
      this.snackbar.open = true;
      this.snackbar.text = text;
    },
  },
};
</script>

<style></style>
