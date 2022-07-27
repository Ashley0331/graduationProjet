<template>
  <div id="post">
    <div class="items">
        <div class="item-box"
        v-for="(item,index) in postList"
        :key="index"
        @click="goToPage(item)">
        <div class="post-img">
            <img :src="item.postPic">
        </div>
        <div class="post-info">
            <div class="post-title">
                <span>{{item.postTitle}}</span>
            </div>
            <div class="post-other">
                <i class="el-icon-time"></i>{{item.postTime}}
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'post',
    props:[
        'postList'
    ],
    created(){
    },
    data(){
        return {
          themeList:['培养红色精神','锻炼身体素质','感受生态自然','学习相关知识','感受学习氛围'],//研学主题
        }
    },
    methods:{
        goToPage(item){
            // this.$router.push(item.postId)
        },
    }

}
</script>

<style>
#post .items{
    box-sizing: border-box;
    width: 100%;
    height: 400px;
}
#post .items .item-box{
    width: 150px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
    display: inline-block;
    margin-right: 20px;
}
#post .items .item-box:hover{
    cursor: pointer;
    box-shadow:  0 2px 10px 0 rgba(0, 0, 0, 0.1);
}
#post .items .item-box:hover .post-title{
    color:#409EFF;
}
#post .items .item-box img{
    width: 100%;
    height: 100px;
    border-radius: 5px 5px 0 0;

}
#post .items .item-box .post-info{
    font-size: 12px;
    height: 50px;
    overflow: hidden;
    padding: 0 5px;
}
#post .items .item-box .post-info .post-other{
    position: absolute;
    bottom: 5px;
    color: gray;
}
</style>