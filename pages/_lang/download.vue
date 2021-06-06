<template>
  <div class="download relative h-screen">
    <div class="absolute bottom-0 clffffff w-full pb-6 space-y-2">
      <a
        class="block"
        :href="getSysInfoData.androidDownload"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="w-2/3 mx-auto"
          src="~/assets/image/home/Android_download.png"
          alt=""
        >
      </a>
      <a
        class="block"
        :href="getSysInfoData.iosDownload"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="w-2/3 mx-auto"
          src="~/assets/image/home/ios_download.png"
          alt=""
        >
      </a>
    </div>
  </div>
</template>
<script>
export default {
  layout: "download",
  data () {
    return {
      getSysInfoData: {
        androidVersion: "",
        iosDownload: "",
        androidDownload: "",
      }
    }
  },
  created () {
    this.getSysInfo()
  },
  methods: {
    getSysInfo () {
      this.$api.main.getSysInfo().then((res) => {
        if (res.type == "success") {
          this.getSysInfoData = res.data
        }
      })
    }
  },
}
</script>