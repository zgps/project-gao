<template>
  <div class="login">
    <div class="loginMsg">
      <div class="left"></div>
      <div class="right">
        <div class="login-form">
          <h1>客服管理系统</h1>
          <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px">
            <el-form-item label="用户" prop="pass">
              <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>

            <!-- <el-form-item> -->
            <el-button class="submit" type="primary" @click="login()">提交</el-button>
            <!-- </el-form-item> -->
          </el-form>
        </div>
      </div>
    </div>
    <!-- <p>这是登陆页面</p>
    <el-button @click="login" type="primary">登陆</el-button>-->
  </div>
</template>
<script>
import userService from "@/services/userService";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {}
    };
  },
  created() {},
  methods: {
    login(formName) {
     
      let userMsg = this.ruleForm;
      console.log(this.ruleForm);

      userService.login(userMsg).then(
        data => {
          if (data.data) {
            userService.getMenuList(data.data).then(data => {
              let menuList = data.data;
              this.$dispatch("doMenu", menuList);
              // this.$router.push({ name: "nav" });
            });
          }
        },
        err => {
          this.$router.push({ path: "nav/system/userManage" });
        }
      );
    }
  }
};
</script>
<style lang="scss" scope>
@import "../../../scss/common";
.login {
  background-image: url("../../../assets/images/banner.jpg");
  // background: pink;
  width: calc(100vw);
  height: calc(100vh);
  .login-form {
    position: absolute;
    width: 85%;
    text-align: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 230px;
    margin: auto;
    // transform: translate(-50%, -50%);
    .el-form-item__label {
      text-align: left;
      width: 55px !important;
    }
    .el-form-item__content {
      margin-left: 65px !important;
    }

    h1 {
      text-align: center;
      width: 100%;
      /* height: 40px; */
      /* line-height: 40px; */
      font-size: 35px;
      font-weight: 400;
      color: #fff;
      margin-bottom: 33px;
    }
    .el-button {
      margin-left: 0px !important;
      margin-top: 20px;
      width: 120px;
    }
  }
  .loginMsg {
    width: 800px;
    height: 400px;
    background: pink;
    /* margin: 0 auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .left,
    .right {
      display: inline-block;
    }
    .left {
      width: 50%;
      height: 100%;
      background-image: url("../../../assets/images/banner.jpg");
    }
    .right {
      position: relative;
      width: 50%;
      height: 100%;
    }
  }
}
// @import 'xxx'
</style>