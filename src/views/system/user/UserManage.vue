<template>
  <div>
    <div>
      <!-- <p>用户管理界面</p> -->
      <div class="title">
        <span>系统设置</span><span>/用户管理</span>
      </div>
      <div class="container routerCon">
        <div class="treeModel fl">
          <div class="head-container">
            <el-input class='treeSelect'
              v-model="deptName"
              placeholder="请输入部门名称"
              clearable
              size="small"
              prefix-icon="el-icon-search"
              style="margin-bottom: 20px"
            />
          </div>
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
          <el-input
            placeholder="用户名"
            v-model="queryParams.username"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="userSelect"
          ></el-input>

          <el-button type="primary" icon="el-icon-search" @click="userSelect()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">新增</el-button>
          <el-table size="small" current-row-key="id" :data="dataList" stripe hi hlight-current-row>
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
            <el-table-column label="操作" align="center"  width=260px>
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

          <!-- 新增标签弹层 -->
          <div class="add-form">
            <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
              <template>
                <el-tabs v-model="activeName" type="card">
                  <el-tab-pane label="基本信息" name="first">
                    <el-form label-position="right" label-width="100px">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="姓名">
                            <el-input v-model="formData.username" />
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item label="性别">
                            <el-select v-model="formData.gender">
                              <el-option label="男" value="1"></el-option>
                              <el-option label="女" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="18">
                          <el-form-item label="生日">
                            <el-date-picker
                              type="date"
                              placeholder="选择日期"
                              v-model="formData.birthday"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>

                        <!--                                                <el-col :span="12">-->
                        <!--                                                    <el-form-item label="归属部门" prop="deptid">-->
                        <!--                                                        <treeselect v-model="formData.deptid" :options="deptOptions" placeholder="请选择归属部门" />-->
                        <!--                                                    </el-form-item>-->
                        <!--                                                </el-col>-->
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="备注">
                            <el-input v-model="formData.remark" type="textarea"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="状态">
                            <el-input v-model="formData.station" type="textarea"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="电话">
                            <el-input v-model="formData.telephone" type="textarea"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-tab-pane>
                  <!--第二个框，角色框-->
                  <el-tab-pane label="角色信息" name="second">
                    <div class="checkScrol">
                      <table class="datatable">
                        <thead>
                          <tr>
                            <th>选择</th>
                            <th>角色编码</th>
                            <th>角色名称</th>
                            <th>角色关键字</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="c in tableData" :key="c.id">
                            <td>
                              <el-checkbox-group v-model="roleIds" :min="0" :max="1">
                                <el-checkbox :label="c.id" :key="c.id">{{c.id}}</el-checkbox>
                              </el-checkbox-group>
                            </td>
                            <td>
                              <label :for="c.id">{{c.name}}</label>
                            </td>
                            <td>
                              <label :for="c.id">{{c.keyword}}</label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </el-tab-pane>

                  <!--第三个框，部门框-->
                  <el-tab-pane label="部门信息" name="Three">
                    <el-tree
                      ref="tree"
                      :data="tableDept"
                      show-checkbox
                      node-key="id"
                      :default-checked-keys="deptIds"
                      default-expand-all
                    ></el-tree>
                  </el-tab-pane>
                </el-tabs>
              </template>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAdd()">确定</el-button>
              </div>
            </el-dialog>
          </div>
          <!-- 编辑弹层 -->
          <div class="add-form">
            <el-dialog title="编辑用户组" :visible.sync="dialogFormVisible4Edit">
              <template>
                <el-tabs v-model="activeName" type="card">
                  <el-tab-pane label="基本信息" name="first">
                    <el-form label-position="right" label-width="100px">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="姓名">
                            <el-input v-model="formData.username" />
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item label="性别">
                            <el-select v-model="formData.gender">
                              <el-option label="男" value="1"></el-option>
                              <el-option label="女" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="18">
                          <el-form-item label="生日">
                            <el-date-picker
                              type="date"
                              placeholder="选择日期"
                              v-model="formData.birthday"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>

                        <!--                                                <el-col :span="12">-->
                        <!--                                                    <el-form-item label="归属部门" prop="deptId">-->
                        <!--                                                        <treeselect v-model="formData.deptid" :options="deptOptions" placeholder="请选择归属部门" />-->
                        <!--                                                    </el-form-item>-->
                        <!--                                                </el-col>-->
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="备注">
                            <el-input v-model="formData.remark" type="textarea"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="状态">
                            <el-input v-model="formData.station" type="textarea"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="电话">
                            <el-input v-model="formData.telephone" type="textarea"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-tab-pane>
                  <!--第二个框，角色框-->
                  <el-tab-pane label="角色信息" name="second">
                    <div class="checkScrol">
                      <table class="datatable">
                        <thead>
                          <tr>
                            <th>选择</th>
                            <th>角色编码</th>
                            <th>角色名称</th>
                            <th>角色关键字</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="c in tableData" :key="c.id">
                            <td>
                              <el-checkbox-group v-model="roleIds" :min="0" :max="1">
                                <el-checkbox :label="c.id" :key="c.id">{{c.id}}</el-checkbox>
                              </el-checkbox-group>
                            </td>
                            <td>
                              <label :for="c.id">{{c.name}}</label>
                            </td>
                            <td>
                              <label :for="c.id">{{c.keyword}}</label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </el-tab-pane>

                  <!--第三个框，部门框-->
                  <el-tab-pane label="部门信息" name="Three">
                    <el-tree
                      ref="tree"
                      :data="tableDept"
                      show-checkbox
                      node-key="id"
                      :default-checked-keys="deptIds"
                      default-expand-all
                    ></el-tree>
                  </el-tab-pane>
                </el-tabs>
              </template>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
                <el-button type="primary" @click="handleEdit()">确定</el-button>
              </div>
            </el-dialog>
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
      },
      deptName: undefined,

      formData: {}, //表单数据
      activeName: "first", //添加/编辑窗口Tab标签名称
      tableData: [], //新增和编辑表单中对应的角色列表数据
      tableDept: [], //新增和编辑表单中对应的部门数据
      roleIds: [], //新增和编辑表单中权限信息对应的复选框，基于双向绑定可以进行回显和数据提交
      deptIds: [], //新增和编辑表单中部门信息对应的复选框
      dialogFormVisible: false, //控制添加窗口显示/隐藏
      dialogFormVisible4Edit: false //控制编辑窗口显示/隐藏
    };
  },
  created() {
    this.findPage();
    this.fuzzyDept();
    console.log(this.$route.matched)
  },
  methods: {
    //gaoshang begin
    //获取部门（树结构）
    fuzzyDept() {
      userService.getDept().then(data => {
        this.deptOptions = data.data;
        console.log(data)
        if(data.flag) {
          this.tableDept = data.data;
        } else {
          this.$message.error(data.message)
        }
      });
    },
    //获取role
    getRole() {
      userService.getRole().then(data => {
        if (data.flag) {
          this.tableData = data.data
        } else {
          this.$message.error(data.message);
        }
        
      })
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
      this.getRole();
      this.fuzzyDept();
      //发送ajax请求查询所有的部门信息,用于查询项表格展示
      // axios.get("dept/treeSelect").then((res) => {
      //     if (res.data.flag) {
      //         this.tableDept = res.data.data;
      //     } else {
      //         this.$message.error(res.data.message);
      //     }
      // });
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
      userService.findPage('/user/findPage',Params).then(
        data => {
          console.log(data);
          this.dataList = data.rows;
          this.pagination.total = data.total;
        },
        err => {
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

    handleAdd() {
      var addParam = {
        sysUser: this.formData,
        roleIds: this.roleIds,
        deptIds: this.$refs.tree.getCheckedKeys()
      };

      userService
        .handAdd('/user/add',addParam)
        .then(
          res => {
            //关闭新增窗口
            this.dialogFormVisible = false;
            if (res.data.flag) {
              //新增成功，弹出成功提示
              this.$message({
                message: res.data.message,
                type: "success"
              });
            } else {
              //新增失败，弹出错误提示
              this.$message.error(res.data.message);
            }
          },
          err => {}
        )
        .finally(() => {
          this.findPage();
        });
    },

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
      userService
        .handEdit(editParam)
        .then(
          res => {
            this.dialogFormVisible4Edit = false;
            if (res.data.flag) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
            } else {
              this.$message.error(res.data.message);
            }
          },
          err => {}
        )
        .finally(() => {
          this.findPage();
        });
    },
    // 重置表单
    resetForm() {
      this.formData = {};
    },
    //gaoshang end

    //添加


    
    
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
.datatable {
                position: relative;
                box-sizing: border-box;
                -webkit-box-flex: 1;
                width: 100%;
                max-width: 100%;
                font-size: 14px;
                color: rgb(96, 98, 102);
                overflow: hidden;
                flex: 1 1 0%;
            }
            .datatable td, .datatable th {
                padding: 12px 0;
                min-width: 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                position: relative;
                text-align: left;
            }
</style>