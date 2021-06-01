<template>
  <div>
    <button @click="gets()">调取接口</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    gets: function () {
      var parms = {};
      this.$axios
        .get("https://api.apiopen.top/recommendPoetry", parms)
        .then((res) => {
          console.log(res);
          console.log(res.data.code);
          if (res.data.code == 200) {
            this.$toast.fail(res.data.result);
          }
        });
    },
  },
};
</script>
<style scoped>
</style>