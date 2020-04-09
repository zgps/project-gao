<template>
  <div>
    <div class="router-view">
      <p>用户管理界面</p>
      <div class="container">
        <div class="treeModel fl">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="treeLeft"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
        <div class="tableModel fr">
          <!-- 显示列表 -->
          <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
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
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              class="pagiantion"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-size="pagination.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pagination.total"
            ></el-pagination>
          </div>

          <!-- <vv-pagination></vv-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userService from "@/services/userService";
export default {
  name: "UserManage",
  data() {
    return {
      // 列表
      dataList: [
        {
          username: "",
          birthday: "",
          remark: "",
          telephone: "",
          station: ""
        }
      ],
      pagination: {
        //分页相关属性
        currentPage: 1,
        pageSize: 10,
        total: 0,
        queryString: null
      },

      //查询参数
      queryParams: {
        username: undefined,
        deptid: undefined
      },
      //部门树
      deptOptions: undefined,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.findPage();
    this.fuzzyDept();
  },
  methods: {
    //gaoshang begin
    //获取部门（树结构）
    fuzzyDept() {
      userService.getDept().then(data => {
        this.deptOptions = data.data;
      });
    },
    //分页查询
    findPage() {
      var Params = {
        currentPage: this.pagination.currentPage, //页码
        pageSize: this.pagination.pageSize, //每页显示的记录数
        queryString: this.pagination.queryString, //查询条件(姓名)
        username: this.queryParams.username,
        deptid: this.queryParams.deptid
      };
      userService.findPage(Params).then(data => {
          console.log(data)
          this.dataList = data.rows;
          this.pagination.total = data.total;
        },err => {
          this.$message.warning("当前查询无用户信息");
        }
      );
    },
    // 节点单击事件
    handleNodeClick(data) {
      if (data.id == 100) {
        this.queryParams.deptid = undefined;
        this.findPage();
      } else {
        this.queryParams.deptid = data.id;
        this.findPage();
      }
    },
    //gaoshang end

    //编辑
    handleEdit() {
      //发送ajax请求将模型数据提交到后台进行处理
      // alert(this.$refs.tree.getCheckedKeys());
      // console.log(this.roleIds, this.formData ,this.deptIds, this.tableDept.id);
      var editParam = {
        sysUser: this.formData,
        roleIds: this.roleIds,
        deptIds: this.$refs.tree.getCheckedKeys()
      };
      // axios.post("/user/edit",editParam).then((res) => {
      //         //隐藏编辑窗口
      //         this.dialogFormVisible4Edit = false;
      //         if (res.data.flag) {
      //             this.$message({
      //                 message: res.data.message,
      //                 type: 'success'
      //             });
      //         } else {
      //             this.$message.error(res.data.message);
      //         }
      //     }).finally(() => {
      //     this.findPage();
      // })
    },
    //添加
    handleAdd() {
      //发送ajax请求将模型数据提交到后台进行处理
      // alert(this.$refs.tree.getCheckedKeys());
      // console.log(this.roleIds, this.formData ,this.deptIds, this.tableDept.id);
      var addParam = {
        sysUser: this.formData,
        roleIds: this.roleIds,
        deptIds: this.$refs.tree.getCheckedKeys()
      };
      // axios.post("/user/add",addParam).then((res) => {
      //         //关闭新增窗口
      //         this.dialogFormVisible = false;
      //         if (res.data.flag) {
      //             //新增成功，弹出成功提示
      //             this.$message({
      //                 message: res.data.message,
      //                 type: 'success'
      //             });
      //         } else {
      //             //新增失败，弹出错误提示
      //             this.$message.error(res.data.message);
      //         }
      //     }).finally(() => {
      //     this.findPage();
      // });
    },

    // 重置表单
    resetForm() {
      this.formData = {};
    },
    // 弹出添加窗口
    handleCreate() {
      this.dialogFormVisible = true;
      this.resetForm();
      //默认切换到第一个标签页
      this.activeName = "first";
      //重置
      this.roleIds = [];
      this.deptIds = [];
      //发送axios请求查询所有检查项信息
      // axios.get("/role/findAll").then((res) => {
      //     if (res.data.flag) {
      //         //成功就将检查项列表数据赋值给模型数据用于页面表格展示
      //         this.tableData = res.data.data;
      //     } else {
      //         this.$message.error(res.data.message);
      //     }
      // });
      //发送ajax请求查询所有的部门信息,用于查询项表格展示
      // axios.get("dept/treeSelect").then((res) => {
      //     if (res.data.flag) {
      //         this.tableDept = res.data.data;
      //     } else {
      //         this.$message.error(res.data.message);
      //     }
      // });
    },
    // 弹出编辑窗口
    handleUpdate(row) {
      //重置
      this.resetForm();
      this.roleIds = [];
      this.deptIds = [];
      // alert(row);
      // axios.get("/user/findById?id=" + row.id).then((res) => {
      //     if (res.data.flag) {
      //         //弹出编辑窗口
      //         this.dialogFormVisible4Edit = true;
      //         //默认选中第一个标签页
      //         this.activeName = "first";
      //         //为模型数据赋值,通过vue数据双向绑定进行信息的回显
      //         this.formData = res.data.data;
      //         //发送ajax请求查询所有的权限信息,用于查询项表格展示
      //         // axios.get("/role/findAll").then((res) => {
      //         //     if (res.data.flag) {
      //         //         //为模型数据赋值,通过vue数据双向绑定进行数据回显
      //         //         this.tableData = res.data.data;
      //         //         //查询当前检查组包含的所有检查项id, 用于页面回显
      //         //         axios.get("/user/findRoleIdsByUserId?id=" + row.id).then((res) => {
      //         //             //为模型数据进行赋值,通过vue数据双向绑定进行信息的回显
      //         //             this.roleIds = res.data;
      //         //         });
      //         //     } else {
      //         //         this.$message.error(res.data.message);
      //         //     }
      //         // });
      //         //发送ajax请求查询所有的部门信息,用于查询项表格展示
      //         // axios.get("dept/treeSelect").then((res) => {
      //         //     if (res.data.flag) {
      //         //         this.tableDept = res.data.data;
      //         //         axios.get("/user/findDeptIdsByUserId?id=" + row.id).then((res) => {
      //         //             this.deptIds = res.data;
      //         //         });
      //         //     } else {
      //         //         this.$message.error(res.data.message);
      //         //     }
      //         // });
      //     } else {
      //         this.$message.error("获取数据失败,请刷新当前页面");
      //     }
      // })
    },
    userSelect() {
      //currentPage先切换到第一页再查询
      this.pagination.currentPage = 1;
      this.findPage();
    },
    //切换页码
    handleCurrentChange(currentPage) {
      //currentPage为切换后的页码
      this.pagination.currentPage = currentPage;
      this.findPage();
    },
    // 删除
    handleDelete(row) {
      userService.handDelete(row).then(
        data => {},
        err => {
          console.log(row);
        }
      );
      //  console.log(row)

      // axios.get("/user/deleteById?id=" + row.id).then((res) => {
      //     if (res.data.flag) {
      //         this.$message.success("用户信息删除成功")
      //     } else {
      //         this.$message.error("用户信息删除失败")
      //     }
      // }).finally(() => {
      //     this.findPage();
      // })
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    /** 查询部门下拉树结构 */
    getTreeselect() {
      // axios.get("dept/treeSelect").then(response => {
      //     this.deptOptions = response.data.data;
      // });
    }
  }
};
</script>
<style lang="scss">
@import "../../../scss/common";
</style>