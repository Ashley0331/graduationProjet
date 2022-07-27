<template>
  <div id="admin-login">
    <div class="login-box">
      <div class="btn">
        <el-button type="primary" @click="goToLogin">用户登录</el-button>
      </div>
      <h2>管理员登录</h2>
      <div class="form">
        <el-form
          :model="adminInfo"
          :rules="rules"
          ref="adminInfo"
          hide-required-asterisk
        >
          <el-form-item label="管理员id" prop="adminId">
            <el-input v-model="adminInfo.adminId"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码" prop="adminPwd">
            <el-input v-model="adminInfo.adminPwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="adminLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-login",
  data() {
    return {
      adminInfo: {
        adminId: "",
        adminPwd: "",
      },
      rules: {
        adminId: [{ required: true, message: "此处不可为空", trigger: "blur" }],
        adminPwd: [
          { required: true, message: "此处不可为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/Login");
    },
    adminLogin() {
      this.$refs.adminInfo.validate((valid) => {
        if (valid) {
          this.$http.get("Admin/AdminLogin", {
            params:{
              adminId:this.adminInfo.adminId,
              adminPwd:this.adminInfo.adminPwd
            }
          }).then((res) => {
            if (res.data) {
              localStorage["adminId"] = this.adminInfo.adminId;
              this.$router.push('/Admin');
            } else {
            }
          });
        }
      });
    },
  },
};
</script>

<style>
#admin-login {
  background-image: linear-gradient(white, #409eff, #228ffc);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#admin-login .login-box {
  width: 500px;
  height: 500px;
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#admin-login .login-box .btn {
  position: absolute;
}
#admin-login .login-box h2 {
  color: #409eff;
  margin-top: 100px;
  text-align: center;
}
#admin-login .login-box .form {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
#admin-login .login-box .form .el-button {
  width: 100%;
}
</style>