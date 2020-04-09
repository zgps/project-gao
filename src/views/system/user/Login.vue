<template>
  <div>
    <p>这是登陆页面</p>
    <el-button @click="login" type="primary">登陆</el-button>
  </div>
</template>
<script>
import userService from "@/services/userService";
export default {
  name: "Login",
  data() {
    return {};
  },
  created() {},
  methods: {
    login() {
      userService.login().then(
        data => {
          console.log("000");
        },
        err => {
          this.$router.push({ name: "nav" });
        }
      );
    }
  }
};
</script>
<style lang="scss">
// @import 'xxx'
</style>