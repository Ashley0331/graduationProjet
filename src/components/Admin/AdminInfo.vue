<template>
    <div id="admin-info">
        <div class="container">
            <div class="form-box">
                <el-form
                label-width="100px"
                :model="adminInfo">
                <el-form-item label="管理员ID">
                    <el-input v-model="adminInfo.adminId" disabled></el-input>
                </el-form-item>
                <el-form-item>
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
    name:'admin-info',
    components:{
        PasswordDialog
    },
    created(){},
    data(){
        return {
            adminInfo:{
                adminId:'zs123',
                adminPwd:'123456'
            },
            passwordDialog:false,
            currentIdentity:'admin'
        }
    },
    methods:{
        getVisible(isVisible){
            this.passwordDialog=isVisible;
        },
        getAdminInfo(){
            this.$http.get('Admin/GetAdminInfo')
            .then(res=>{
                this.adminInfo=res.data;
            })
        },
        checkLoginState(){
            if(typeof localStorage["adminId"]=='undefined'){
                this.$router.push('/Login');
            }
        }
    }
}
</script>

<style>
#admin-info .container{
    box-sizing: border-box;
    padding: 10px;
}
#admin-info .form-box{
    width: 50%;
}
</style>