<template>
    <div id="register">
        <div class="register-box">
            <div class="left">
                <h2>Join us!</h2>
                <el-button @click="this.$router.push('/Login')">已有账号</el-button>
            </div>
            <div class="right">
                <h2>注册</h2>
                <div class="form">
                    <el-form
                    :model="newUserInfo"
                    :ref="newUserInfo"
                    label-width="80px"
                    :rules="rules">
                    <el-form-item label="用户id" prop="userId">
                        <el-input v-model="newUserInfo.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="userName">
                        <el-input v-model="newUserInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="用户身份" prop="userIdentity">
                        <el-select v-model="newUserInfo.userIdentity">
                            <el-option 
                            v-for="(item,index) in identity"
                            :key="index"
                            :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPwd">
                        <el-input v-model="newUserInfo.userPwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repeatPwd">
                        <el-input v-model="newUserInfo.repeatPwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">注册</el-button>
                    </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'register',
    data(){
        let checkPwd=(rule,value,callback)=>{
            if(value=='') callback(new Error('请再次输入密码！'));
            else if(value!==this.newUserInfo.userPwd){
                callback(new Error('两次输入的密码不一致！'));
            }
            else callback();
        }
        return {
            newUserInfo:{
                userId:"",
                userName:'',
                userPwd:'',
                userIdentity:'',
                repeatPwd:'',
            },
            identity:['学生','家长'],
            rules:{
                userId:[{required:true,message:'用户名不可为空',trigger:'blur'}],
                userName:[{required:true,trigger:'blur',message:'昵称不可为空'}],
                userIdentity:[{required:true,trigger:'blur',message:'身份不可为空'}],
                userPwd:[{required:true,trigger:'blur',message:'密码不可为空'}],
                repeatPwd:[
                    {required:true,trigger:'blur',message:'此处不可为空'},
                    {validator:checkPwd,trigger:'blur'}
                ]
                
            }
        }
    },
    methods:{
        submit(){
            this.$$refs.newUserInfo.validate(valid=>{
                if(valid){
                    let newUser={};
                    newUser["userId"]=this.newUserInfo.userId;
                    newUser["userName"]=this.newUserInfo.userId;
                    newUser["userPwd"]=this.newUserInfo.userPwd;
                    newUser["userIdentity"]=this.newUserInfo.userIdentity;
                }
            })
        }
    }
}
</script>

<style>
#register{
    height: 100vh;
    background-image:linear-gradient(white,#409EFF,#228ffc);
    display: flex;
    justify-content: center;
    align-items: center;
}
#register .register-box{
    display: flex;
    justify-content: left;
}
#register .register-box .left{
    width: 200px;
    color: #fff;
    box-sizing: border-box;
    padding: 10px;
    height: 500px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px 0px 0px 10px;
    position: relative;
}
#register .register-box .left .el-button{
    background-color: transparent;
    border-color: white;
    color: white;
    transition:all 0.5s ease-in-out;
    position: absolute;
    bottom: 10px;
}
#register .register-box .left .el-button:hover{
    color:#409EFF;
    background-color: #fff;
}
#register .register-box .right{
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0px 10px 10px 0px;
    padding: 10px;
}
#register .register-box .right h2{
    text-align: center;
    color:#409EFF;
}
#register .register-box .right .form{
    width: 80%;
    display: flex;
    justify-content: center;
}
</style>