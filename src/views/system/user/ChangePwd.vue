<template>
    <div>
        <div class="title">
      <span>系统设置</span>
      <span>/密码修改</span>
    </div>
        <div class="app-container">

        <div class="box">

            <div class="app-container common-list-page">

            <el-form
                    :model="resetForm"
                    ref="resetForm"
                    :rules="resetFormRules"
                    status-icon
                    label-width="100px"
            >
                <el-form-item label="旧密码：" prop="password">
                    <el-input type="password" v-model="resetForm.password"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newpwd">
                    <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="newpassword">
                    <el-input type="password" v-model="resetForm.newpassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native.prevent="toAmend">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>

            </div>

        </div>
    </div>
</template>
<script>
export default {
    name:'changePwd',
    data() {
        
            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入新密码"));
                } else if (value.toString().length < 6 || value.toString().length > 18) {
                    callback(new Error("密码长度为6-18位"));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.resetForm.newpwd) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };

            return {
                resetForm: {
                    // //传给后台所需要的参数
                    newpassword: "",
                    password: "",
                    username: "",//此处只是后台需要的字段而已，如果前期有公用cookie里面有获取并且保存过，现在需要另外调用进来，具体的获取方法就看个人了
                },
                resetFormRules: {
                    password: [
                        { required: true, message: "请输入正确的旧密码", trigger: 'blur' }
                    ],
                    newpwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    newpassword: [
                        { required: true, validator: validatePass2, trigger: "blur" }
                    ]
                }
            }
        
    },
    create() {

    },
    methods:{
        toAmend() {
                this.$refs.resetForm.validate(valid => {
                    if (valid) {
                        // axios.post("/pwd/Confirm",this.resetForm).then((response)=> {
                        //     if (response.data.flag) {
                                // 发送请求
                                // axios.post("/pwd/update", this.resetForm).then((response2) => {
                                //     if (response2.data.flag) {
                                //         // 编辑成功，弹出成功提示信息
                                //         this.$message({
                                //             message: response2.data.message,
                                //             type: 'success'
                                //         });
                                //         // this.logout();
                                //         setTimeout(() => {
                                //             window.parent.location.href = "/logout";
                                //         },2000)
                                //     } else {
                                //         // 编辑失败，弹出错误提示
                                //         this.$message.error(response2.data.message);
                                //     }
                                // })
                        //     }else {
                        //         // 编辑失败，弹出错误提示
                        //         this.$message.error(response.data.message);
                        //     }
                        // })

                    }
                });
            }
    }
    
}
</script>
<style lang="scss">
    
</style>