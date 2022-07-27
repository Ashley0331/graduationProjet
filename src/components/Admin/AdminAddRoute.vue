<template>
    <div id="admin-add-route">
        <div class="word">
            <span>线路信息设置</span>
        </div>
        <div class="form-container">
            <el-form
            :model="postInfoForm"
            ref="postInfoForm"
            :rules="rules"
            >
            <el-form-item label="线路封面">
                <div class="pic">
                    <img src="">
                    <span>图片名</span>
                </div>
            </el-form-item>
            <el-form-item label="线路标题" prop="title">
                <el-input v-model="postInfoForm.title"></el-input>
            </el-form-item>
            <el-form-item label="线路区域" prop="provice">
                <el-select v-model="postInfoForm.provice">
                    <el-option
                    v-for="(item,index) in postArea"
                    :key="index"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="线路主题" prop="theme">
                <el-select v-model="postInfoForm.theme">
                    <el-option
                    v-for="(item,index) in postTheme"
                    :key="index"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="线路描述" prop="content">
                <el-input
                type="textarea"
                :rows="10"
                v-model="postInfoForm.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(postInfoForm)">发布</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'admin-add-route',
    data(){
        return {
            postInfoForm:{
                title:'',
                content:'',
                pic:[],
                provice:'',
                theme:''
            },
            postTheme:['培养红色精神','锻炼身体素质','感受生态自然','学习相关知识','感受学习氛围'],
            postArea:['重庆','北京','四川','上海','浙江','香港'],//研学区域
            rules:{
                title:[{required:true,message:'请输入文章标题',trigger:blur}],
                content:[{required:true,message:'内容不可为空',trigger:blur}],
                provice:[{required:true,message:'请选择研学地区',trigger:blur}],
                theme:[{required:true,message:'请选择研学地区',trigger:blur}],
                
            }
        }
    },
    methods:{
        initAttraction(){
            this.$http.get('Attraction/GetAllInfo')
            .then(res=>{
                
            })
        }
    }
}
</script>

<style>
#admin-add-route .word{
    font-weight: 700;
    margin-bottom: 10px;
}
#admin-add-route .form-container{
    height: 440px;
    overflow: auto;
    box-sizing: border-box;
}
#admin-add-route .form-container .el-form{
    width: 90%;
}
#admin-add-route .form-container .pic{
    position: relative;
}
#admin-add-route .form-container .pic img{
    width: 200px;
    height: 150px;
}
#admin-add-route .form-container .pic img:hover{
    cursor: pointer;
}
#admin-add-route .form-container .pic span{
    display: block;
    position: absolute;
    bottom: 14px;
    text-indent: 1em;
    width: 200px;
    height: 30px;
    left: 68px;
    line-height: 30px;
    background-color:rgba(146, 145, 145,0.25);
    color: white;
}
</style>