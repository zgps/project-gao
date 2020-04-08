<template>
  <div>
    <div class="changeTab">
      <p>用户管理界面</p>
      <div class="container">
          <div class="left">

          </div>
        <div class="right">
          <el-table size="small" current-row-key="id"  stripe highlight-current-row>
            <el-table-column type="index" align="center" label="序号"></el-table-column>
            <el-table-column prop="username" label="用户名" align="center"></el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.gender == '0' ? '不限' : scope.row.gender == '1' ? '男' : '女'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="birthday" label="生日" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column prop="station" label="状态" align="center"></el-table-column>
            <el-table-column prop="telephone" label="联系电话" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserManage"
};
</script>
<style lang="scss">
@import "../../../scss/common";
</style>