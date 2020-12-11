<template>
  <JitsiMeet ref="jitsiRef" domain="meet.jit.si" :options="options" />
</template>

<script>
import JitsiMeet from "../../components/JitsiMeet";
export default {
  components: {
    JitsiMeet,
  },
  computed: {
    name() {
      return "user" + Math.floor(Math.random() * 100);
    },
    options() {
      return {
        roomName: "a456f4sd54fs1d3f1sd34gv5sd",
        noSSL: false,
        userInfo: {
          email: this.name + "@email.com",
          displayName: this.name,
        },
        configOverwrite: {
          prejoinPageEnabled: false,
          enableNoisyMicDetection: true,
          enableWelcomePage: false,
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          HIDE_INVITE_MORE_HEADER: true,
          PROVIDER_NAME: true,
          MOBILE_APP_PROMO: false,
          VIDEO_LAYOUT_FIT: "both",
        },
        onload: this.onIFrameLoad,
      };
    },
  },
  methods: {
    onIFrameLoad() {
      console.log("open meet");

      this.$refs.jitsiRef.addEventListener("videoConferenceLeft", () =>
        console.log("fechou a conexao")
      );
    },
  },
};
</script>
