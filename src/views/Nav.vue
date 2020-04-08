<template>
  <div>
    <p>这是导航页面</p>
    <header></header>
    <div class='slideBar'>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >

      <!-- 一个完整的下拉列表 -->
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">信息查询</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->

         <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">系统设置</span>
          </template>
          <el-menu-item-group>
            <!-- <span slot="title">分组一</span> -->
            <el-menu-item index="1-1" v-go="'/nav/userManage'">用户管理</el-menu-item>
            <el-menu-item index="1-2" v-go="'/nav/role'">角色管理</el-menu-item>
            <el-menu-item index="1-3" v-go="'/nav/auth'">权限管理</el-menu-item>
            <el-menu-item index="1-4">菜单管理</el-menu-item>
            <el-menu-item index="1-4">部门管理</el-menu-item>
            <el-menu-item index="1-4">修改密码</el-menu-item>
            <el-menu-item index="1-4">派工规则</el-menu-item>
            <el-menu-item index="1-4">工单配置</el-menu-item>
          </el-menu-item-group>
          
        </el-submenu>
       
        <!-- <el-menu-item index="3" >
          <i class="el-icon-document"></i>
          <span slot="title">数据中心</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item> -->
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    name: 'Nav',
    data() {
        return {
            isCollapse: true
        }
    },
    methods:{
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
    }
}
}
</script>
<style lang="scss">
    .slideBar {
        width:300px;
    }
</style>