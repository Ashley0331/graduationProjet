<template>
    <div id="tweet">
        <div class="word">
            <span>投稿设置</span>
        </div>
        <div class="form-container">
            <el-form
            :model="postInfoForm"
            ref="postInfoForm"
            :rules="rules"
            >
            <el-form-item label="推文封面">
                <el-upload
                :auto-upload="false"
                action="D:\Mine\Study\MyProject\ZXTX\front-codes\static"
                ref="cover"
                :on-change="previewCover"
                :show-file-list="false"
                >
                    <div class="pic">
                    <img :src="currenPic.path">
                    <span>{{currenPic.name}}</span>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="推文标题" prop="postTitle">
                <el-input v-model="postInfoForm.postTitle"></el-input>
            </el-form-item>
            <el-form-item label="线路区域" prop="postProvice">
                <el-select v-model="postInfoForm.postProvice">
                    <el-option
                    v-for="(item,index) in postArea"
                    :key="index"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="推文主题" prop="postTheme">
                <el-select v-model="postInfoForm.postTheme">
                    <el-option
                    v-for="(item,index) in postTheme"
                    :key="index"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="推文内容" prop="postContent">
                <el-input
                type="textarea"
                :rows="10"
                v-model="postInfoForm.postContent"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">发布</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:"tweet",
    created(){},
    data(){
        return {
            postInfoForm:{
                postTitle: '',
                postId: '',
                postPic: '',
                postTheme: '',
                postContent: '',
                postTime: '',
                postWritorId: '',
                postWritorName: '',
                postWritorPic: '',
                postAddress: '',
                postProvice: ''
            },
            currenPic:{
                path:'',
                name:'图片名'
            },
            postTheme:['培养红色精神','锻炼身体素质','感受生态自然','学习相关知识','感受学习氛围'],
            postArea:['重庆','北京','四川','上海','浙江','香港'],//研学区域
            rules:{
                postTitle:[{required:true,message:'请输入文章标题',trigger:blur}],
                postContent:[{required:true,message:'内容不可为空',trigger:blur}],
                postProvice:[{required:true,message:'请选择研学地区',trigger:blur}],
                postTheme:[{required:true,message:'请选择研学地区',trigger:blur}],
                
            }
        }
    },
    methods:{
        submitForm(){
            this.$refs.postInfoForm.validate((res)=>{
                if(res){
                    console.log(this.postInfoForm);
                }
                else console.log("请正确填写内容！");
            })
        },
        submitData(form){
            this.$http.post('',form)
            .then(res=>{
                if(res.data){
                    alert("发布成功！");
                    // this.$refs.cover.submit();
                    this.$router.push('MyPost');
                }else{
                    alert("出现错误！发布失败！");
                }
            })
        },
        submitCover(){
            this.$refs.cover
        },
        previewCover(file,fileList){
            this.currenPic.path=URL.createObjectURL(file.raw);
            this.currenPic.name=file.name;
        }
    }
}
</script>

<style>
#tweet .word{
    font-weight: 700;
    margin-bottom: 10px;
}
#tweet .form-container{
    height: 440px;
    overflow: auto;
    box-sizing: border-box;
}
#tweet .form-container .el-form{
    width: 90%;
}
#tweet .form-container .pic{
    position: relative;
}
#tweet .form-container .pic img{
    width: 200px;
    height: 150px;
}
#tweet .form-container .pic img:hover{
    cursor: pointer;
}
#tweet .form-container .pic span{
    display: block;
    position: absolute;
    bottom: 14px;
    text-indent: 1em;
    width: 200px;
    height: 30px;
    line-height: 30px;
    background-color:rgba(146, 145, 145,0.25);
    color: white;

}
</style>