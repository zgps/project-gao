<template>
  <div>
    <el-header class="main-header" style="height:70px;">
      <nav class="navbar navbar-static-top">
        <!-- Logo -->

        <a href="#" class="logo" style="text-align:center;margin-top:-15px">
          <span class="logo-lg">
            <img src="img/logo.png" />
          </span>
        </a>
        <div class="right-menu">
          <!--                    <span class="help"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>帮助</span>-->

          <!-- 全屏显示 -->
          <div class="btn-fullscreen" @click="handleFullScreen">
            <el-tooltip :content="fullscreen?'取消全屏':'全屏'" placement="bottom">
              <i class="el-icon-rank"></i>
            </el-tooltip>
          </div>

          <!-- 消息中心 -->
          <div class="btn-bell">
            <el-popover placement="bottom" width="700" trigger="hover">
              <div class="tips">
                <span class="message-left">您有5条新消息</span>
                <el-button size="mini" class="message-right" type="primary" round>
                  <a style="color: #FFFFFF" href="workOrder.html" target="right">查看全部</a>
                </el-button>
              </div>

              <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                :default-expand-all="false"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              >
                <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
                <el-table-column prop="name" label="标题" sortable width="180"></el-table-column>
                <el-table-column prop="remarks" label="内容" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
              <!--                            <a class="el-icon-bell" slot="reference" href="workOrder.html" target="right"></a>-->
              <a class="el-icon-bell" slot="reference" href="workOrder.html" target="right">
                <el-badge class="tag" :value="5" :max="9" />
              </a>
            </el-popover>
            <!--                        <el-badge value="new" class="tag" v-if="message">1-->
            <!--                        </el-badge>-->
            <!--                        <span class="btn-bell-badge" v-if="tableData"></span>-->
          </div>

          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper" style="margin-bottom: 10px;">
              <img src="img/user-160x160.jpg" class="user-avatar" />
              {{username}}
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <span style="display:block;">
                  <a href="updatePSWPage" target="right">修改密码</a>
                </span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span style="display:block;">
                  <a href="/logout">退出</a>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav>
    </el-header>
  </div>
</template>
<script>
export default {
  name: "vv-header",
  data() {
    return {
      username: "",
      menuList: [],
      isCollapse: true,
      fullscreen: false,

      tableData: [
        {
          id: 1,
          date: "2019-12-01 09:10",
          name: "接近响应截至时间",
          remarks: "接近响应截至时间，请尽快处理工单，如已经处理请忽略此条消息",
          children: [
            {
              id: 31,
              date: "2016-05-01 09:10",
              name: "接近响应截至时间2",
              remarks:
                "接近响应截至时间，请尽快处理工单，如已经处理请忽略此条消息"
            },
            {
              id: 32,
              date: "2016-05-01 09:10",
              name: "接近响应截至时间3",
              remarks:
                "接近响应截至时间，请尽快处理工单，如已经处理请忽略此条消息"
            }
          ]
        },
        {
          id: 2,
          date: "2019-12-02 09:15",
          name: "有新分配工单",
          remarks: "有N张新分配工单给您，请尽快到个人任务池处理"
        },
        {
          id: 3,
          date: "2019-12-03 12:12",
          name: "工单XXXXXXXX已催办，请尽快处理",
          remarks: "工单XXXXXXXX已催办，请尽快处理"
        }
      ]
    };
  },
  created() {},
  methods: {
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>
<style lang="scss">
header {
    height:70px;
    background-color: beige;
}
</style>