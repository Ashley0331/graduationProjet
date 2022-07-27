<template>
    <div id="discuss-info">
        <div class="main-info">
          <div class="route-cover">
              <img :src="currentPost.postPic">
          </div>
          <div class="route-des">
              <h2>{{currentPost.postTitle}}</h2>
              <div class="writor-info">
                  <img :src="currentPost.postWritorPic">
                  <span>{{currentPost.postWritorName}}</span>
                  <span>发布于：{{currentPost.postTime}}</span>
              </div>
              <div class="icon">
                  <div class="left">
                      <i class="el-icon-location-information"></i>
                      {{currentPost.postProvice}}
                  </div>
                  <div class="right">
                      <i class="el-icon-collection-tag"></i>
                      {{currentPost.postTheme}}
                  </div>
              </div>
              <div class="interaction-btn">
                  <i 
                  :class="isCollected?'el-icon-star-on':'el-icon-star-off'"
                  @click="collectEvent"></i>
              </div>
          </div>
      </div>
      <div class="post-content">
          <p>{{currentPost.postContent}}</p>
      </div>
    </div>
</template>

<script>
export default {
    name:'discuss-info',
    created(){
        let n=this.$route.params["id"];
        this.initCurrentPost(n);
        this.checkCollectState(n);
    },
    data(){
        return {
            currentPost:{},
            isCollected:false,
        }
    },
    methods:{
        initCurrentPost(id){
        this.$http.get('Post/GetPostById',
                        {params:{
                          post_id:id
                        }})
        .then(res=>{
          this.currentPost=res.data;
        })
      },
      checkCollectState(id){
          if(typeof localStorage["userId"]=='undefined'){
              this.isCollected=false;
          }else{
              this.$http.get('Post/CheckCollectState',
              {params:{
                  post_id:id,
                  user_id:localStorage["userId"]
              }})
              .then(res=>{
                  this.isCollected=res.data;
              })
          }
      },
      collectEvent(){
          if(!this.isCollected){
              if(typeof localStorage["userId"]=='undefined'){
              if (window.confirm("游客无法进行收藏，需要去登录吗？")) this.$router.push("/");
            }else{
              this.userCollectPost();
          }
          }else{
              this.userCancelCollect();
          }   
      },
      userCollectPost(){
          this.$http.post('Post/UserCollectPost',{
              UserId:localStorage["userId"],
              PostId:this.currentPost.postId
          }).then(res=>{
              if(res.data){
                  this.$notify({
                      title:'收藏成功',
                      type:'success'
                  });
                  this.isCollected=true;
              }else{
                  this.$notify({
                      title:'收藏失败',
                      type:'warning'
                  })
              }
          })
      },
      userCancelCollect(){
          this.$http.delete('Post/UserCancelCollect',{params:{
              user_id:localStorage["userId"],
              post_id:this.currentPost.postId
          }}).then(res=>{
              if(res.data){
                  this.$notify({
                      title:'取消成功',
                      type:'success'
                  });
                  this.isCollected=false;
              }else{
                  this.$notify({
                      title:'取消失败',
                      type:'warning'
                  })
              }
          })
      }
    }
}
</script>

<style>
#discuss-info{
    width: 1100px;
    margin: 0 auto;
}
#discuss-info .main-info{
    width: 100%;
    position: relative;
    margin-bottom: 40px;
    height: 500px;
}
#discuss-info .main-info .route-cover{
    width: 100;
    height: 400px;
    overflow: hidden;
    position: relative;
    border-radius: 20px;
}
#discuss-info .main-info .route-cover img{
    width: 100%;
    position: absolute;
    top: -40%;
}
#discuss-info .main-info .route-des{
    width: 900px;
    background-color: #fff;
    position: absolute;
    top:250px;
    margin-left:100px;
    box-shadow: 0 2px 14px 0 rgb(67 67 67 / 17%);
    border-radius: 4px;
    box-sizing: border-box;
    height: 250px;
    padding: 10px;
}
#discuss-info .main-info .route-des .writor-info{
    margin-bottom: 10px;
    position: relative;
    box-sizing: border-box;
}
#discuss-info .main-info .route-des .writor-info span{
    display: inline-block;
    position: absolute;   
    bottom: 0;
}
#discuss-info .main-info .route-des .writor-info span:first-child{
    left: 50px;
}
#discuss-info .main-info .route-des .writor-info span:last-child{
    right: 0;
}
#discuss-info .main-info .route-des .writor-info,
#discuss-info .main-info .route-des .writor-info span{
    height: 50px;
    line-height: 50px;
}
#discuss-info .main-info .route-des .writor-info img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
#discuss-info .main-info .route-des .icon{
    position: relative;
    color: gray;
    height: 50px;
}
#discuss-info .main-info .route-des .icon .left{
    position: absolute;
    left: 0;
}
#discuss-info .main-info .route-des .icon .right{
    position: absolute;
    right: 0;
}
#discuss-info .main-info .route-des i{
    color:#E6A23C;
}
#discuss-info .main-info .route-des i:hover{
    cursor: pointer;
}
#discuss-info .main-info .route-des .interaction-btn{
    font-size: 30px;
    position: absolute;
    bottom: 10px;
}
#discuss-info .post-content{
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 2px 14px 0 rgb(67 67 67 / 17%);
    padding: 20px;
    text-indent: 2em;
    line-height: 25px;
}
</style>