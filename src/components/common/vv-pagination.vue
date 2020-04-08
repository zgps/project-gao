<template lang="">
    <div>
        <div class="pagination-container">
            <el-pagination
                class="pagiantion"
                @current-change="handleCurrentChange"
                :current-page="pagination.currentPage"
                :page-size="pagination.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  name: "vv-pagination",
  data() {
    return {
      pagination: {
        //分页相关属性
        currentPage: 1,
        pageSize: 10,
        total: 0,
        queryString: null
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss">
</style>