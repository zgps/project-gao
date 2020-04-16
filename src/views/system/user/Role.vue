<template>
  <div>
    <div class="title">
      <span>系统设置</span>
      <span>/角色管理</span>
    </div>
    <div class="app-container">
      <div class="box">
        <div class="filter-container">
          <el-input
            placeholder="角色编码/角色名称"
            v-model="pagination.queryString"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="findPage"
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="findPage()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">新增</el-button>
        </div>
        <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
          <el-table-column type="index" align="center" label="序号"></el-table-column>
          <el-table-column prop="keyword" label="角色编码" align="center"></el-table-column>
          <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="description" label="角色描述" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <!-- 新增标签弹层 -->
        <div class="add-form">
          <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
            <template>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本信息" name="first">
                  <el-form label-position="right" label-width="100px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="角色编码">
                          <el-input v-model="formData.keyword" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="角色名称">
                          <el-input v-model="formData.name" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="角色描述">
                          <el-input v-model="formData.description" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="菜单信息" name="second">
                  <div class="checkScrol">
                    <el-tree :data="menudata" show-checkbox node-key="id" ref="tree">
                      <span slot-scope="{ node }">
                        <span>{{ node.label }}</span>
                      </span>
                    </el-tree>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="权限信息" name="third">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                        <tr>
                          <th>选择</th>
                          <th>项目编码</th>
                          <th>项目名称</th>
                          <th>项目说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="c in tableData" :key="c.id">
                          <td>
                            <el-checkbox-group v-model="permissionIds" :min="0" :max="100">
                              <el-checkbox :label="c.id" :key="c.id">{{c.id}}</el-checkbox>
                            </el-checkbox-group>
                          </td>
                          <td>
                            <label :for="c.id">{{c.name}}</label>
                          </td>
                          <td>
                            <label :for="c.id">{{c.keyword}}</label>
                          </td>
                          <td>
                            <label :for="c.id">{{c.description}}</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleAdd()">确定</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 编辑标签弹层 -->
        <div class="edit-form">
          <el-dialog title="编辑角色组" :visible.sync="dialogFormVisible4Edit">
            <template>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本信息" name="first">
                  <el-form label-position="right" label-width="100px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="角色编码">
                          <el-input v-model="formData.keyword" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="角色名称">
                          <el-input v-model="formData.name" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="角色描述">
                          <el-input v-model="formData.description" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="菜单信息" name="second">
                  <div class="checkScrol">
                    <el-tree
                      :data="menudata"
                      show-checkbox
                      node-key="id"
                      ref="tree"
                      :default-expand-all="true"
                      :default-expanded-keys="menuIds"
                    >
                      <span slot-scope="{ node }">
                        <span>{{ node.label }}</span>
                      </span>
                    </el-tree>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="权限信息" name="third">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                        <tr>
                          <th>选择</th>
                          <th>项目编码</th>
                          <th>项目名称</th>
                          <th>项目说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="c in tableData" :key="c.id">
                          <td>
                            <el-checkbox-group v-model="permissionIds" :min="0" :max="100">
                              <el-checkbox :label="c.id" :key="c.id">{{c.id}}</el-checkbox>
                            </el-checkbox-group>
                          </td>
                          <td>
                            <label :for="c.id">{{c.name}}</label>
                          </td>
                          <td>
                            <label :for="c.id">{{c.keyword}}</label>
                          </td>
                          <td>
                            <label :for="c.id">{{c.description}}</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="exit()">取消</el-button>
              <el-button type="primary" @click="handleEdit()">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/userService";
export default {
  name: "Role",
  data() {
    return {
      activeName: "first", //添加/编辑窗口Tab标签名称
      pagination: {
        //分页相关属性
        currentPage: 1, //当前页码
        pageSize: 10, // 每页显示记录数
        total: 0, // 总记录数
        queryString: null // 查询条件
      },
      dataList: [], //当前页要展示的分页列表数据
      formData: {}, //表单数据
      menudata: [], //新增和编辑表单中对应的菜单列表数据
      tableData: [], //新增和编辑表单中对应的权限列表数据
      menuIds: [], //新增和编辑表单中菜单项对应的复选框，基于双向绑定可以进行回显和数据提交
      permissionIds: [], //新增和编辑表单中权限项对应的复选框，基于双向绑定可以进行回显和数据提交
      dialogFormVisible: false, //控制添加窗口显示/隐藏
      dialogFormVisible4Edit: false, //控制编辑窗口显示/隐藏
      getRowKeys(row) {
        return row.id;
      }
    };
  },
  created() {
    this.findPage();
    this.getMenu();
    this.getPomission();
  },
  methods: {
    //TODO: 已改写
    // 获取数据
    getMenu() {
      userService.getMenu("/menu/treeSelect").then(res => {
        this.menudata = res.data;
      });
    },
    getPomission() {
      userService.getPomission("/permission/findAll").then(res => {
        this.tableData = res.data;
      });
    },

    //分页查询
    findPage() {
      // 分页参数
      var param = {
        currentPage: this.pagination.currentPage, // 页码
        pageSize: this.pagination.pageSize, // 每页显示的记录数
        queryString: this.pagination.queryString // 查询条件
      };
      userService.findPage("/role/findPage", param).then(
        data => {
          this.dataList = data.rows;
          this.pagination.total = data.total;
        },
        err => {
          this.$message.warning("当前查询无用户信息");
        }
      );
    },

    // 重置表单
    resetForm() {
      this.formData = {};
      this.activename = "first";
      this.permissionIds = [];
      this.menuIds = [];
    },

    showMessage(error) {
      if (error.response.status == 403) {
        // 权限不足
        this.$message.error("无权限访问");
        return;
      } else {
        this.$message.error("未知错误");
        return;
      }
    },

    //取消弹出窗口，同时刷新子页面
    exit() {
      this.dialogFormVisible4Edit = false;
      // location.reload();
    },

    //添加
    handleAdd() {
      // 发送ajax请求将表单数据提交到后台
      this.formData.menuIds = this.$refs.tree.getCheckedKeys();
      this.formData.permissionIds = this.permissionIds;
      userService
        .handAdd("/permission/add", this.formData)
        .then(
          res => {
            this.dialogFormVisible = false;
            if (res.flag) {
              this.$message({
                message: res.message,
                type: "success"
              });
              // this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          },
          err => {}
        )
        .finally(() => {
          this.findPage();
        });

      userService
        .handAdd("/role/add", this.formData)
        .then(
          res => {
            // 隐藏新增窗口
            this.dialogFormVisible = false;
            // 判断后台返回的flag值，true表示添加操作成功，false为添加操作失败
            if (res.flag) {
              this.$message({
                message: res.message,
                type: "success"
              });
            } else {
              this.$message.error(res.message);
            }
          },
          err => {}
        )
        .finally(() => {
          this.findPage();
        });
    },

    // 弹出添加窗口
    handleCreate() {
      this.resetForm();
      this.dialogFormVisible = true;
    },
    //切换页码
    handleCurrentChange(currentPage) {
      // currentPage为切换后的页码
      this.pagination.currentPage = currentPage;
      this.findPage();
    },

    // 删除
    handleDelete(row) {
      this.$confirm("确认删除吗？", "提示", { type: "warning" })
        .then(() => {
          // 点击确定按钮时只需此处代码

          userService
            ._delete("/role/delete", { id: row.id })
            .then(res => {
              if (!res.flag) {
                // 删除失败
                this.$message.error(res.message);
              } else {
                // 删除成功
                this.$message({
                  message: res.message,
                  type: "success"
                });
                // 调用分页，获取最新分页数据
                this.findPage();
              }
            })
            .catch(error => {
              this.showMessage(error);
            });
        })
        .catch(() => {
          // 点击取消按钮执行此代码
          this.$message("操作已取消");
        });
    },

    // 弹出编辑窗口
    handleUpdate(row) {
      this.resetForm();
      this.permissionIds = [];
      this.menuIds = [];
      userService._edit("/role/findById", { id: row.id }).then(res => {
        if (res.flag) {
          // 弹出编辑窗口
          this.dialogFormVisible4Edit = true;
          // 默认选中第一个标签页
          this.activeName = "first";
          // 为模型数据赋值，通过VUE数据双向绑定进行信息的回显
          this.formData = res.data;
          // this.getMenu();

          if (this.menudata.length) {
            userService
              .getById("/role/findMenuIdsByRoleId", { id: row.id })
              .then(res => {
                this.$refs.tree.setCheckedKeys(res);
              });
          } else {
            this.$message.error(res.message);
          }

          if (this.tableData.length) {
            userService
              .getById("/role/findPermissionIdsByRoleId", { id: row.id })
              .then(res => {
                this.permissionIds = res;
              });
          } else {
            this.$message.error("获取数据失败，请刷新当前页面");
          }

    
        }
      });
    },
    //编辑
    handleEdit() {
      this.formData.menuIds = this.$refs.tree.getCheckedKeys();
      this.formData.permissionIds = this.permissionIds;
      userService._edit1('/role/edit',this.formData).then(res => {
             this.dialogFormVisible4Edit = false;
           if (res.flag){
               // 编辑成功，弹出成功提示信息
               this.$message({
                   message:res.data.message,
                   type:'success'
               });
           } else {
               // 编辑失败，弹出错误提示
               this.$message.error(res.message);
           }
      }).finally(()=>{
        this.findPage();
      })
    }
  }

  //TODO: 已改写  --  end
};
</script>

<style lang="scss">
@import "../../../scss/common";
</style>