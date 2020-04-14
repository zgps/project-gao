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
      // let menuList = [
      //   "UCPPage",
      //   "dist/hello.html",
      //   "xx1",
      //   "xxOrderPage",
      //   "xx002",
      //   "userPage",
      //   "rolePage",
      //   "permissionPage"
      // ];
      // this.$store.dispatch("doMenu", menuList);
      // sessionStorage.setItem('test', 1213)
      // this.$router.push({ name: "nav" });
      let userMsg = {
        userName:'admin',
        password:'123123'
      }
      userService.login(userMsg).then(
        data => {
          if (data.data) {
            userService.getMenuList(data.data).then(data => {
              let menuList = data.data;
              this.$dispatch("doMenu", menuList);
               this.$router.push({ name: "nav" });
            });
          }
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