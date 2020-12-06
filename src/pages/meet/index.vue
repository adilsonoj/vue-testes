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
    options() {
      return {
        roomName: "some-room-name",
        noSSL: false,
        userInfo: {
          email: "user@email.com",
          displayName: "",
        },
        configOverwrite: {
          enableNoisyMicDetection: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
        },
        onload: this.onIFrameLoad,
      };
    },
  },
  methods: {
    onIFrameLoad() {
      console.log("open meet");
    },
  },
};
</script>
