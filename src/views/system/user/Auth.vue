<template>
  <div>
    <div class="title">
      <span>系统设置</span>
      <span>/权限管理</span>
    </div>
    <div class="app-container">
      <div class="box">
        <div class="filter-container">
          <el-input
            placeholder="权限名称/权限关键字"
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
          <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
          <el-table-column prop="keyword" label="权限关键字(keyword)" align="center"></el-table-column>
          <el-table-column prop="description" label="权限说明" align="center"></el-table-column>

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
          <el-dialog title="新增权限" :visible.sync="dialogFormVisible">
            <el-form ref="dataAddForm" label-position="right" label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="权限名称" prop="name">
                    <el-input v-model="formData.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="权限关键字" prop="keyword">
                    <el-input v-model="formData.keyword" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="权限说明">
                    <el-input v-model="formData.description" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleAdd()">确定</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 编辑标签弹层 -->
        <div class="add-form">
          <el-dialog title="编辑权限项" :visible.sync="dialogFormVisible4Edit">
            <el-form
              ref="dataEditForm"
              :model="formData"
              label-position="right"
              label-width="100px"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="权限名称" prop="name">
                    <el-input v-model="formData.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="权限关键字" prop="keyword">
                    <el-input v-model="formData.keyword" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="权限说明">
                    <el-input v-model="formData.description" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
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
  name: "Auth",
  data() {
    return {
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 10, //每页显示的记录数
        total: 0, //总记录数
        queryString: null //查询条件
      },
      dataList: [], //当前页要展示的分页列表数据
      formData: {}, //表单数据
      dialogFormVisible: false, //增加表单是否可见
      dialogFormVisible4Edit: false, //编辑表单是否可见
      rules: {
        //校验规则
        code: [
          { required: true, message: "项目编码为必填项", trigger: "blur" }
        ],
        name: [{ required: true, message: "项目名称为必填项", trigger: "blur" }]
      }
    };
  },
  created() {
    this.findPage();
  },
  methods: {
    // TODO:  BEGIN
    //分页查询
    findPage() {
      var param = {
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        queryString: this.pagination.queryString
      };
      userService.findPage("/permission/findPage", param).then(res => {
        this.dataList = res.rows;
        this.pagination.total = res.total;
      });
    },

    //添加
    handleAdd() {
      console.log(this.formData.name);
      // 添加权限管理项
      userService
        .handAdd("/permission/add", this.formData)
        .then(res => {
          this.dialogFormVisible = false;
          console.log(0);
          if (res.flag) {
            this.$message({
              message: res.message,
              type: "success"
            });
          } else {
            this.$message.error(res.data.message);
            console.log("添加失败，请重新添加");
          }
        })
        .finally(() => {
          this.findPage();
        });
    },

    // 弹出编辑窗口
    handleUpdate(row) {
      userService.getById("/permission/findById", { id: row.id }).then(res => {
        if (res.flag) {
          this.dialogFormVisible4Edit = true;
          this.formData = res.data;
        } else {
          this.$message.error("获取数据失败，请刷新当前页面");
        }
      });
    },
    handleEdit() {
      userService
        ._edit1("/permission/edit", this.formData)
        .then(res => {
          this.dialogFormVisible4Edit = false;
          if (res.flag) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .finally(() => {
          this.findPage();
        });
    },
    // 重置表单
    resetForm() {
      this.formData = {};
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
      this.$confirm("确认删除当前选中记录吗？", "提示", { type: "warning" })
        .then(() => {
          userService
            ._delete("/permission/delete", { id: row.id })
            .then(res => {
              if (res.flag) {
                this.$message.success(res.message);
              } else {
                this.$message.error(res.message);
              }
            })
            .finally(() => {
              this.findPage();
            });
        })
        .catch(() => {
          this.$message("操作已取消");
        });

      //   }).finally(()=>{
      //       this.findPage();
      //   });

      //     })
      // axios.get("/permission/delete?id=" + row.id).then((res)=>{
      //     if (res.data.flag){
      //         this.$message.success(res.data.message);
      //     }else{
      //         this.$message.error(res.data.message);
      //     }
      // }).finally(()=>{
      //     this.findPage();
      // });
      // })
      // .catch(() => {
      //   this.$message("操作已取消");
      // });
      // })
    }

    //TODO:   END
  }
};
</script>
<style lang="scss">
</style>