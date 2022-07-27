<template>
  <div id="my-post">
    <div class="word">
      <span>当前您已发布</span>
      {{postList.length}}
      <span>篇推文</span>
      <el-button icon="el-icon-edit" size="small" type="primary" plain @click="goToTweet()">发布推文</el-button>
    </div>
    <post @postNumber="getPostNumber" :postList="postList"></post>
  </div>
</template>

<script>
import Post from './Post.vue'
export default {
    name:'my-post',
    components:{
      Post
    },
    created(){
      this.initPost();
    },
    data(){
        return {
          postList:[],
        }
    },
    methods:{
      getPostNumber(n){

      },
      goToTweet(){
        this.$router.push('/User/Tweet');
      },
      initPost(){
        this.$http.get('Post/GetPostListByUserId',{params:{user_id:localStorage["userId"]}})
        .then(res=>{
          this.postList=res.data;
        });
      }
    }
}
</script>

<style>
#my-post .word{
  margin-bottom:10px;
  color: #409EFF;
}
#my-post .word>span{
  color: gray;
}
#my-post .word>.el-button{
  margin-left:10px ;
}

</style>