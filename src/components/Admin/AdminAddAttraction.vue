<template>
    <div id="admin-add-attraction">
        <div class="word">
            <span>景点信息设置</span>
        </div>
        <div class="form-container">
            <el-form
            :model="postInfoForm"
            ref="postInfoForm"
            :rules="rules"
            >
            <el-form-item label="景点封面">
                <el-upload
                :auto-upload="false"
                action="#"
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
            <el-form-item label="景点标题" prop="title">
                <el-input v-model="postInfoForm.title"></el-input>
            </el-form-item>
            <el-form-item label="景点区域" prop="provice">
                <el-select v-model="postInfoForm.provice">
                    <el-option
                    v-for="(item,index) in postArea"
                    :key="index"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="景点主题" prop="theme">
                <el-select v-model="postInfoForm.theme">
                    <el-option
                    v-for="(item,index) in postTheme"
                    :key="index"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="景点描述" prop="content">
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
    name:'admin-add-attraction',
    data(){
        return {
            postInfoForm:{
                title:'',
                content:'',
                pic:[],
                provice:'',
                theme:''
            },
            currenPic:'',
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
        
    }
}
</script>

<style>
#admin-add-attraction .word{
    font-weight: 700;
    margin-bottom: 10px;
}
#admin-add-attraction .form-container{
    height: 440px;
    overflow: auto;
    box-sizing: border-box;
}
#admin-add-attraction .form-container .el-form{
    width: 90%;
}
#admin-add-attraction .form-container .pic{
    position: relative;
}
#admin-add-attraction .form-container .pic img{
    width: 200px;
    height: 150px;
}
#admin-add-attraction .form-container .pic img:hover{
    cursor: pointer;
}
#admin-add-attraction .form-container .pic span{
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