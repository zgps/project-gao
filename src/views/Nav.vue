<template>
  <div>
    <vv-header></vv-header>
    <div class="slideBar">
      <!-- 菜单部分 -->

      <el-aside :class='isCollapse?"width64":"width200"'>
        <transition>
          <img
            v-if="isCollapse"
            src="../assets/images/cd-l.png"
            @click="isCollapse= !isCollapse"
            style="width:32px;height:32px"
          />
          <img
            v-else
            src="../assets/images/cd-r.png"
            @click="isCollapse= !isCollapse"
            style="width:32px;height:32px"
          />
        </transition>
        <el-menu
          default-active="menu.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu v-for="(menu) in menuList" :key="menu.name" :index="menu.path">
            <template slot="title">
              <i class="fa" :class="menu.icon"></i>
              <span slot="title">{{menu.name}}</span>
            </template>
            <template v-for="(child) in menu.children">
              <el-menu-item :index="child.path" :key="child.name" v-go="`/nav/${child.linkUrl}`">{{child.name}}</el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
    </div>
    <el-container style="margin-right:20px;" :class="isCollapse?'left-cont':'stretch-left-cont'">
      <el-main>
        <div class="router-view">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import userService from "@/services/userService";
export default {
  name: "Nav",
  data() {
    return {
      // username: "",
      menuList: [],
      isCollapse: true
      // fullscreen: false,

      // tableData: [
      //   {
      //     id: 1,
      //     date: "2019-12-01 09:10",
      //     name: "接近响应截至时间",
      //     remarks: "接近响应截至时间，请尽快处理工单，如已经处理请忽略此条消息",
      //     children: [
      //       {
      //         id: 31,
      //         date: "2016-05-01 09:10",
      //         name: "接近响应截至时间2",
      //         remarks:
      //           "接近响应截至时间，请尽快处理工单，如已经处理请忽略此条消息"
      //       },
      //       {
      //         id: 32,
      //         date: "2016-05-01 09:10",
      //         name: "接近响应截至时间3",
      //         remarks:
      //           "接近响应截至时间，请尽快处理工单，如已经处理请忽略此条消息"
      //       }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     date: "2019-12-02 09:15",
      //     name: "有新分配工单",
      //     remarks: "有N张新分配工单给您，请尽快到个人任务池处理"
      //   },
      //   {
      //     id: 3,
      //     date: "2019-12-03 12:12",
      //     name: "工单XXXXXXXX已催办，请尽快处理",
      //     remarks: "工单XXXXXXXX已催办，请尽快处理"
      //   }
      // ]
    };
  },
  created() {
    this.getAuthName();
    this.getMenuList();
    // axios.get("/user/getUserName").then(res => {
    //   this.username = res.data.data;

    //   // 发送请求获取侧边栏菜单
    //   axios.get("/menu/getMenuList?username=" + this.username).then(res => {
    //     this.menuList = res.data.data;
    //   });
    // });
  },
  methods: {
    //获取数据
    getAuthName() {
      userService.getAuthName().then(data => {});
    },
    getMenuList() {
      let un = "admin";
      userService.getMenuList(un).then(data => {
        this.menuList = data.data;
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    
  }
};
</script>
<style lang="scss">
@import "../scss/common";
.width64 {
  height: calc(100vh - 70px);
  width:64px !important;
  transition:all 0.5s;
  overflow: hidden;
}
.width200 {
  height: calc(100vh - 70px);
  width:200px !important;
  overflow: hidden;
  transition:all 0.5s;
}
</style>