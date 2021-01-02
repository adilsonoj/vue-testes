import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        desserts: [
            {
                name: "Isaac Newton",
                email: "newton@domain.com",
                telefone: "(99) 9999-9999",
                perfil: "admin",
                bloqueado: true,
            },
            {
                name: "Charles Augustin de Coulomb",
                email: "coulomb@domain.com",
                telefone: "(99) 9999-9999",
                perfil: "admin",
                bloqueado: false,
            },
            {
                name: "Amedeo Avogadro",
                email: "avogadro@domain.com",
                telefone: "(99) 9999-9999",
                perfil: "user",
                bloqueado: false,
            },
            {
                name: "Johann Josef Loschmidt",
                email: "loschmidt@domain.com",
                telefone: "(99) 9999-9999",
                perfil: "user",
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
                perfil: "user",
                bloqueado: false,
            },
            {
                name: "Ludwig Boltzmann",
                email: "boltzmann@domain.com",
                telefone: "(99) 9999-9999",
                perfil: "operator",
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
        dialog: false,
        editedIndex: -1,
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
    },

    mutations: {
        selectItem(state, item) {
            state.editedIndex = state.desserts.indexOf(item);
            state.editedItem = Object.assign({}, item);
        },
        editItem(state, item) {
            state.editedIndex = state.desserts.indexOf(item);
            state.editedItem = Object.assign({}, item);
            state.dialog = true;
        },
        closeDialog(state) {
            state.dialog = false;
            state.editedItem = Object.assign({}, state.defaultItem);
            state.editedIndex = -1;
        },
        save(state, item) {
            if (state.editedIndex > -1) {
                Object.assign(state.desserts[state.editedIndex], item);
            } else {
                state.desserts.push(Object.assign({}, item));
            }
        },
        deleteItem(state) {
            state.desserts.splice(state.editedIndex, 1);
            state.editedItem = Object.assign({}, state.defaultItem);
            state.editedIndex = -1;
        }
    }
})

export default store;