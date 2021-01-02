<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
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
            <v-col cols="12" lg="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.perfil"
                label="Perfil"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" lg="6" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.bloqueado"
                        label="Bloqueado"
                      ></v-text-field>
                    </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateEdit",
  props: {
    opendialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      desserts: [],
      editedIndex: -1,
    };
  },
  computed: {
    formTitle() {
      return this.$store.state.editedIndex === -1
        ? "Novo Usuário"
        : "Edita Usuário";
    },
    editedItem() {
      return this.$store.state.editedItem;
    },
    dialog: {
      get: function () {
        return this.$store.state.dialog;
      },
      set: function (newValue) {
        this.$store.state.dialog = newValue;
      },
    },
  },
  methods: {
    close() {
      this.$store.commit("closeDialog");
      // this.$nextTick(() => {
      //   this.editedIndex = -1;
      // });
    },

    save() {
      if (this.$store.state.editedIndex > -1) {
        this.$store.commit("save", this.editedItem);
        this.$emit("snackbar", "Editado com sucesso!");
      } else {
        this.$store.commit("save", this.editedItem);
        this.$emit("snackbar", "Salvo com sucesso");
      }
      this.close();
    },
  },
};
</script>