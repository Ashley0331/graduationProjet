<template>
  <div id="login">
    <div class="login-container">
      <div class="box">
        <div class="left">
          <h2>WELCOME</h2>
          <h2>HAVE A GOOD DAY</h2>
          <div class="btn">
            <el-button>注册账号</el-button>
            <el-button @click="goToHome()">游客身份浏览</el-button>
          </div>
          <div class="admin-btn">
            <el-button @click="goToAdmin">我是管理员</el-button>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <h2>登录</h2>
          </div>
          <div class="content">
            <el-form
              :model="user"
              :rules="rules"
              ref="user"
              hide-required-asterisk
            >
              <el-form-item label="用户名" prop="userId">
                <el-input v-model="user.userId" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userPwd">
                <el-input
                  v-model="user.userPwd"
                  placeholder="密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  created() {},
  data() {
    return {
      user: {
        userId: "",
        userPwd: "",
      },
      rules: {
        userId: [{ required: true, message: "此处不可为空", trigger: "blur" }],
        userPwd: [{ required: true, message: "此处不可为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    goToAdmin() {
      this.$router.push("/AdminLogin");
    },
    login() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.$http
            .get("User/Login", {
              params: {
                user_id: this.user.userId,
                user_pwd: this.user.userPwd,
              },
            })
            .then((res) => {
              if (res.data) {
                localStorage["userId"] = this.user.userId;
                this.$http.get('User/GetUserInfoById',{params:{
                  user_id:this.user.userId
                }}).then(res=>{
                  localStorage["userLike"]=res.data.userLike;
                })
                this.$router.push("/");
              } else {
                alert("用户名或者错误！");
              }
            });
        }
      });
    },
  },
};
</script>

<style>
body {
}
#login .login-container {
  background-image: linear-gradient(white, #409eff, #228ffc);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#login .box {
  width: 750px;
  display: flex;
  justify-content: left;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#login .box .left {
  width: 300px;
  height: 500px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px 0px 0px 10px;
  color: rgb(255, 255, 255);
  position: relative;
}
#login .box .left .el-button {
  background-color: transparent;
  border-color: white;
  color: white;
  transition: all 0.5s ease-in-out;
}
#login .box .left .el-button:hover {
  color: #409eff;
  background-color: #fff;
}
#login .box .left .admin-btn {
  position: absolute;
  bottom: 10px;
}
#login .box .right {
  width: 450px;
  height: 500px;
  padding: 10px;
  background-color: #fff;
  border-radius: 0px 10px 10px 0px;
}
#login .box .right .title {
  color: #70b8ff;
  text-align: center;
}
#login .box .right .content .el-form {
  padding: 20px;
}
</style>