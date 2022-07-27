<template>
    <div id="my-info">
        <div class="container">
            <div class="form-box">
                <el-form
                v-model="userInfo"
                label-position="right"
                label-width="80px">
                <el-form-item>
                    <el-upload
                    action="http://localhost:60624/User/ChangeAvatar"
                    :auto-upload="false"
                    :on-change="previweAvatar"
                    :show-file-list="false"
                    :http-request="changeAvatar"
                    ref="upload">
                        <div class="user-img">
                        <img :src="currentPic">
                        <div class="avatar-change">更换头像</div>
                        </div>
                    </el-upload>
                    <el-button v-show="isChangingAvatar" @click="preserveAvatar">确认更换</el-button>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input
                    v-model="userInfo.userId"
                    placeholder="用户名"
                    disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input
                    v-model="userInfo.userName"
                    placeholder="用户名"></el-input>
                </el-form-item> 
                <el-form-item label="用户身份">
                    <el-select
                    v-model="userInfo.userIdentity">
                    <el-option
                    v-for="(item,index) in identity"
                    :key="index"
                    :value="item"></el-option>
                    </el-select>
                </el-form-item>   
                <el-form-item label="偏好设置">
                    <el-select
                    v-model="userInfo.userLike">
                    <el-option
                    v-for="(item,index) in theme"
                    :key="index"
                    :value="item"></el-option>
                    </el-select>
                    <span><font color="red">（推荐设置，网站将根据该设置在网页对您进行内容推荐）</font></span>
                </el-form-item>
                <el-form-item>
                    <el-button
                    type="primary" @click="preserveOrNot">保存当前修改</el-button>
                    <el-button type="primary" @click="passwordDialog=true">修改密码</el-button>
                </el-form-item>                
                </el-form>
            </div>
            <password-dialog 
            :isVisible='passwordDialog'
            @closeDialog='getVisible'
            :identity='currentIdentity'>
            </password-dialog>
        </div>
    </div>
</template>

<script>
import PasswordDialog from '../Public/PasswordDialog.vue'
export default {
    name:'my-info',
    components:{
        PasswordDialog
    },
    created(){
        this.initUserInfo();

    },
    data(){
        return {
          userInfo:{},
          identity:['学生','家长'],
          passwordDialog:false,//模态框是否显示
          currentIdentity:'user',//传递给密码模态框，与管理员区分开
          theme:['培养红色精神','锻炼身体素质','感受生态自然','学习相关知识','感受学习氛围','探索城市文化'],//研学主题
          currentPic:'',
          isChangingAvatar:false,
        }
    },
    methods:{
        /**
         * 修改密码的模态框是否可见
         */
        getVisible(isVisible){
            this.passwordDialog=isVisible;
        },
        /**
         * 初始用户信息
         */
        initUserInfo(){
            this.$http.get('User/GetUserInfoById',
                {params:{
                    user_id:localStorage["userId"]
                }}).then(res=>{
                    this.userInfo=res.data;
                    this.currentPic=this.userInfo.userPic;
                })
        },
        /**
         * 用户修改基础信息
         */
        changeBaseInfo(){
            this.$http.post('User/ChangeBaseInfo',this.userInfo)
            .then(res=>{
                if(res.data){
                    this.$notify({
                        title:'修改成功',
                        type:'success'
                    });
                    localStorage["userLike"]=this.userInfo.userLike;
                }else{
                    this.$notify({
                        title:'修改失败',
                        type:'warning'
                    })
                }
            })
        },
        /**
         * 信息保存按钮事件
         */
        preserveOrNot(){
            if(window.confirm("确定保存当前修改吗？")){
                this.changeBaseInfo();
            }
        },
        /**
         * 选择新头像之后，头像预览以及按钮的显示
         */
        previweAvatar(file,fileList){
            this.currentPic=URL.createObjectURL(file.raw);
            this.isChangingAvatar=true;
            
        },
        /**
         * 更换头像按钮事件
         */
        preserveAvatar(){
            if(window.confirm("确认更换当前头像吗？")){
                this.$refs.upload.submit();
            }
        },
        /**
         * 覆盖upload组件的上传事件
         */
        changeAvatar(params){
            let formData=new FormData();
            // formData.append('avatar',params.file);
            console.log(params.file);
            this.$http.get('User/ChangeAvatar',params.file)
            .then(res=>{
                console.log(res);
            })
        }

    }
}
</script>

<style>
#my-info .container .form-box{
    width: 90%;
}
#my-info .container .form-box .user-img{
    display: inline-block;
    position: relative;
}
#my-info .container .form-box .user-img img{
    width: 100px;
    height: 100px;
    padding: 5px;
    border: 1px solid black;
    z-index: 1;
}
#my-info .container .form-box .user-img .avatar-change{
    position:absolute;
    display: inline-block;
    width: 111px;
    height: 112px;
    left: 0;
    text-align: center;
    color: transparent;
    transition: all 0.2s ease-in-out;
}
#my-info .container .form-box .user-img:hover .avatar-change{
    background-color:rgba(0,0,0,0.3);
    color: white;
    cursor: pointer;
}
#my-info .el-form-item__content{
    margin-left: 0;
}
#my-info .el-input__inner{
    width: 240px;
}
#my-info .avatar-btn{
    display: inline-block;
}
</style>