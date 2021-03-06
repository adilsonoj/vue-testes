<template>
  <container>
    <v-container fill-height id="scroll">
      <v-row class="pb-14" align="end">
        <v-col>
          <div
            v-for="(item, index) in chat"
            :key="index"
            :class="[
              'd-flex flex-row align-center my-2',
              item.from == 'user' ? 'justify-end' : null,
            ]"
          >
            <v-card max-width="344" color="#f7ffd6">
              <span
                v-if="item.from == 'user'"
                class="black--text ma-3 pb-6 mt-3"
                >{{ item.msg }}</span
              >
            </v-card>
            <v-avatar :color="item.from == 'user' ? 'indigo' : 'red'" size="36">
              <span class="white--text">{{ item.from[0] }}</span>
            </v-avatar>
            <v-card max-width="344" color="#f7ffd6">
              <span v-if="item.from != 'user'" class="black-text ma-3">{{
                item.msg
              }}</span>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-row class="pt-15"> </v-row>
    </v-container>
    <v-footer fixed>
      <v-container class="pb-10">
        <v-row no-gutters>
          <v-col>
            <div class="d-flex flex-row align-center">
              <v-text-field
                v-model="msg"
                placeholder="Type Something"
                @keypress.enter="send"
              ></v-text-field>
              <v-btn icon class="ml-4" @click="send"
                ><v-icon>mdi-send</v-icon></v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </container>
</template>

<script>
export default {
  data() {
    return {
      chat: [],
      msg: null,
    };
  },
  methods: {
    send: function () {
      this.chat.push({
        from: "user",
        msg: this.msg,
      });
      this.msg = null;
      this.addReply();
      const container = this.$el.querySelector("#scroll");

      this.$nextTick(() => {
        // DOM updated
        container.scrollIntoView({ behavior: "smooth", block: "end" });
        // console.log(container.scrollHeight);
        // container.scrollTop = -1000000;
        //container.scrollTo = 0;
      });
    },
    addReply() {
      this.chat.push({
        from: "sushant",
        msg: "Hmm",
      });
    },
  },
};
</script>

<style>
</style>