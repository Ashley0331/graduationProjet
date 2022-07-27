<template>
  <div id="password-dialog">
      <el-dialog
      :visible.sync='isVisible'
      title="修改密码"
      :before-close='closeHandle'
      :close-on-click-modal="false"
      destroy-on-close
      >
      <div class="pwd-info">
          <el-form 
          :model="pwdForm" 
          label-width="80px"
          ref="pwdForm"
          :rules="rules">
              <el-form-item label="原密码" prop="oldPwd">
                  <el-input v-model="pwdForm.oldPwd" show-password></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                  <el-input v-model="pwdForm.newPwd" show-password></el-input>
              </el-form-item>
              <el-form-item label="重复密码" prop="repeatPwd">
                  <el-input v-model="pwdForm.repeatPwd" show-password></el-input>
              </el-form-item>
          </el-form>
      </div>
      <div class="pwd-btn">
          <el-button type="primary" @click="submitForm(pwdForm)">确认修改</el-button>
          <el-button @click="closeHandle()">取消</el-button>
      </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
    name:'password-dialog',
    created(){},
    props:[
        'isVisible',//控制模态框是否显示,
        'identity'
    ],
    data(){
        let checkRepeatPwd=(rule,value,callback)=>{
            if(value=='') callback(new Error('请再次输入新密码！'));
            else if(value!==this.pwdForm.newPwd){
                callback(new Error('两次输入的密码不一致！'));
            }
            else callback();
        }
        return {
            pwdForm:{
                oldPwd:'',
                newPwd:'',
                repeatPwd:''            
            },
            rules:{
                oldPwd:[{required:true,trigger:'blur',message:"请输入原密码"}],
                newPwd:[{required:true,trigger:'blur',message:"请输入新密码"},],
                repeatPwd:[{validator:checkRepeatPwd,trigger:'blur'}],
            }
        }
    },
    methods:{
        /**
         * 关闭模态框
         */
        closeHandle(){
            let nullNumber=0;
            for(let info in this.pwdForm){
                if(this.pwdForm[info].length>0){
                    this.$confirm('确认取消当前的修改吗？')
                    .then(()=>{
                        this.$refs.pwdForm.resetFields();
                        this.$emit('closeDialog',false);
                    })
                    .catch(()=>{});
                    return;
                }else continue;
            }
            this.$emit('closeDialog',false);
        },
        /**
         * 确认修改密码
         */
        submitForm(){
            this.$refs.pwdForm.validate(res=>{
                if(res){
                    const pwd={};
                    pwd["oldPwd"]=this.pwdForm.oldPwd;
                    pwd["newPwd"]=this.pwdForm.newPwd;
                    if(this.identity=='user'){
                        pwd["id"]=localStorage["userId"];
                        this.changeUserPwd(pwd);
                    }else{
                        pwd["id"]=localStorage["adminId"];
                        this.changeAdminPwd(pwd);
                    }
                }
            })
        },
        changeUserPwd(form){
            this.$http.post('User/ChangePwd',form)
            .then(res=>{
                if(res.data){
                    this.$notify({
                        title:'修改成功',
                        type:'success'
                    })
                    this.$refs.pwdForm.resetFields();
                    this.$emit('closeDialog',false);
                }else{
                    this.$notify({
                        title:'修改失败',
                        type:'warning'
                    })
                }
            })
        },
        changeAdminPwd(form){
            this.$http.post('Admin/ChangeAdminPwd',form)
            .then(res=>{
                if(res.data){
                    this.$notify({
                        title:'修改成功',
                        type:'success'
                    })
                    this.$refs.pwdForm.rese;
                    this.$emit('closeDialog',false);
                }else{
                    this.$notify({
                        title:'修改失败',
                        type:'warning'
                    })
                }
            })
        }
        
    }
}
</script>

<style>
#password-dialog .el-dialog{
    width: 500px;
}
#password-dialog .el-form{
    box-sizing: border-box;
    padding-left:50px;
}   
#password-dialog .pwd-btn{
    text-align: center;
}
</style>