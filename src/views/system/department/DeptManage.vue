<template>
  <div>
    <div class="title">
      <span>系统设置</span>
      <span>/部门管理</span>
    </div>
    <div class="app-container">
      <div class="box">
        <el-form :inline="true">
          <el-form-item label="部门名称">
            <el-input
              v-model="dept.deptName"
              placeholder="请输入部门名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="dept.status" placeholder="部门状态" clearable size="small">
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus"  size="mini" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>

        <el-table
          v-loading="loading"
          :data="deptList"
          row-key="deptId"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="deptName" label="部门名称" width="250"></el-table-column>
          <el-table-column prop="orderNum" label="排序" align="center" width="200"></el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status == '0' ? '正常' : scope.row.status == '1' ? '停用' : '未知'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ (scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-plus"
                @click="handleAdd(scope.row)"
              >新增</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 添加或修改部门对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-row>
              <el-col :span="24" v-if="form.parentId !== 0">
                <el-form-item label="上级部门" prop="parentId">
                  <treeselect v-model="form.parentId" :options="deptOptions" placeholder="选择上级部门" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门名称" prop="deptName">
                  <el-input v-model="form.deptName" placeholder="请输入部门名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="显示排序" prop="orderNum">
                  <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人" prop="leader">
                  <el-input v-model="form.leader" placeholder="请输入负责人" maxlength="20" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门状态">
                  <el-radio v-model="form.status" label="0">正常</el-radio>
                  <el-radio v-model="form.status" label="1">停用</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
 import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import userService from "@/services/userService";
export default {
  components: { Treeselect },
  name: "DeptManage",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表格树数据
      deptList: [],
      // 部门部门树选项
      deptOptions: undefined,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      dept: {
        deptName: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "上级部门不能为空", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "显示排序不能为空", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // TODO:  BEGIN
    /** 查询部门列表 */
    getList() {
      userService.getList("/dept/getList").then(res => {
        this.deptList = res.data;
        this.loading = false;
      });
     
    },

    /** 查询部门下拉树结构 */
    getTreeselect() {
      userService.getDept("dept/treeSelect").then(res => {
        this.deptOptions = res.data;
      })
      // axios.get("dept/treeSelect").then(response => {
      //     this.deptOptions = response.data.data;
      // });
    },

    // TODO:  END
    
    // // 字典状态字典翻译
    // statusFormat(row, column) {
    //     return this.selectDictLabel(this.statusOptions, row.status);
    // },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: 100,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0"
      };
      this.resetForm("form");
    },
    // 重置表单
    resetForm() {
      this.form = {};
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // this.getList();
      // axios.post("/dept/queryList",this.dept).then(response => {
      //     this.deptList = response.data.data;
      //     this.loading = false;
      // });
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != undefined) {
        this.form.parentId = row.deptId;
      }
      this.open = true;
      this.title = "添加部门";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();

      // axios.get("/dept/findByDeptId?deptId=" + row.deptId).then((response) => {
      //     if (response.data.flag){
      //         this.form = response.data.data;
      //         this.open = true;
      //         this.title = "修改部门";
      //     } else {
      //         this.$message.error("获取数据失败,请刷新当前页面");
      //     }
      // });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.deptId != undefined) {
            // axios.put("/dept",this.form).then(response => {
            //     if (response.data.flag) {
            //         //修改成功，弹出成功提示
            //         this.$message({
            //             message:response.data.message,
            //             type:'success'
            //         });
            //         this.open = false;
            //         this.getList();
            //     } else {
            //         this.$message.error(response.data.message);
            //     }
            // });
          } else {
            // axios.post("/dept/addDept",this.form).then(response => {
            //     if (response.data.flag) {
            //         //新增成功，弹出成功提示
            //         this.$message({
            //             message:response.data.message,
            //             type:'success'
            //         });
            //         this.open = false;
            //         this.getList();
            //     } else {
            //         this.$message.error(response.data.message);
            //     }
            // });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(
        '是否确认删除名称为"' + row.deptName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          // return axios.post("/dept/deleteDept?deptId="+row.deptId);
        })
        .then(response => {
          if (response.data.flag) {
            this.getList();
            //删除成功，弹出成功提示
            this.$message({
              message: response.data.message,
              type: "success"
            });
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch(() => {
          this.$message.error("删除失败！请重新检查");
        });
    }
  }
};
</script>
<style lang="scss">
@import "../../../scss/common";
.app-container {
  background-color:#fff;
}
  

</style>