<template>
  <div id="discuss-index">
    <div class="discuss-container">
      <div class="discuss-top-menu">
        <div class="left-rotation">
          <el-carousel height="300px">
            <el-carousel-item
            v-for="(item,index) in hotPost"
            :key="index">
            <h3>{{item.postTitle}}</h3>
            <img :src="item.postPic" 
            :alt="item.name"
            width="800px"
            height="300"
            @click="goToInfo(item)">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="right-user">
          <div class="user-img">
            <img :src="userInfo.userPic" alt="">
            <p>{{userInfo.userName}}</p>
          </div>
          <div class="other">
            <el-button type="primary" @click="goToUser">查看我的贴子</el-button>
          </div>
        </div>
      </div>
      <div class="post-sort">
        <div class="post-list">
          <div class="list-title">
            <h3>用户推荐</h3>
          </div>
          <div class="post-box">
            <div class="post-item"
            v-for="(item,index) in posts"
            :key="index">
              <div class="left-img">
                <img :src="item.postPic">
              </div>
              <div class="right-content">
                <div class="post-title">
                  <h3 @click="goToInfo(item)">{{item.postTitle}}</h3>
                  <h6>作者：{{item.postWritorName}}</h6>
                  <h6>发布于：{{item.postTime}}</h6>
                </div>
                <div class="post-content">
                  {{item.postContent}}
                </div>
                <div class="more-info">
                  <div class="tag-icon">
                    <i class="el-icon-collection-tag"></i>
                    {{item.postTheme}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'discuss-index',
    components:{
    },
    created(){
      this.initPostList();
      if(typeof localStorage["userId"]=='undefined'){
        this.userInfo={
            userName:'游客',
            userIdentity:'游客',
            userPic:'../../../static/images/Default Avatar-1.jpg'
          }
      }else{
        this.initUserInfo(localStorage["userId"]);
      }
    },
    data(){
        return {
          hotPost:[],//热点帖子列表
          userInfo:{
            userName:'游客',
            userIdentity:'游客',
            userPic:'../../../static/images/Default Avatar-1.jpg'
          },
          posts:[]
        }
    },
    methods:{
      goToUser(){
        if(typeof localStorage["userId"]=='undefined'){
          if(window.confirm("您目前是游客身份，需要跳转到登录界面吗？")){
            this.$router.push('/Login');
          }
        }
        else this.$router.push('/User');
      },
      goToInfo(item){
        this.$router.push('/Discuss/'+item.postId)
      },
      initPostList(){
        this.$http.get('Post/GetAllPost')
        .then(res=>{
          this.posts=res.data;
          for(let i=0;i<3;i++){
          this.hotPost.push(res.data[i]);
        }
        });
      },
      initUserInfo(id){
        this.$http.get('User/GetUserInfoById',{params:{
          user_id:id
        }}).then(res=>{
          this.userInfo=res.data;
        })
      }
    }
}
</script>

<style>
#discuss-index .discuss-container{
  width: 1100px;
  margin: 0 auto;
}
#discuss-index .discuss-top-menu{
  position: relative;
  display: flex;
  justify-content: left;
  
}
.discuss-top-menu .left-rotation{
  width: 800px;
  margin-right: 20px;
  border-radius: 10px 10px 0px 0px;
}
.discuss-top-menu .el-carousel__item h3{
  color:aliceblue;
  position: absolute;
  width: 100%;
  background-color:rgba(146, 145, 145,0.75);
  height: 50px;
  line-height: 50px;
  top: 230px;
  text-indent: 2em;
}
.discuss-top-menu .left-rotation img{
  border-radius: 10px 10px 0px 0px;
  cursor: pointer;
}
.discuss-top-menu .right-user{
  flex: 1;
  height: 300px;
  background-color: rgb(243, 243, 243);
  border-radius: 10px 10px 0px 0px;
}
.discuss-top-menu .right-user .user-img{
  width: 100%;
  height: 200px;
  position: relative;
  text-align: center;
  overflow: hidden;;
}
.discuss-top-menu .right-user .user-img img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-top: 50px;
  display: inline-block;
}
.discuss-top-menu .right-user .user-img p{
  text-align: center;
}
.discuss-top-menu .right-user .other{
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.discuss-container .post-list{
  width: 100%;
  margin-top: 20px;
}
.post-list .list-title{
  border-bottom: 2px solid rgba(236, 150, 38, 0.856);
}
.post-list .list-title h3{
  display: inline-block;
  background-color: rgba(236, 150, 38, 0.856);
  color: white;
  padding: 3px;
  margin: 0;
}
.post-list .post-box{
  width: 100%;
}
.post-list .post-box .post-item{
  padding: 20px 10px;
  display: flex;
  justify-content: left;
}
.post-list .post-box .post-item+.post-item{
  border-top: 1px solid rgb(223, 223, 223);
}
.post-list .post-box .post-item .left-img{
  width: 220px;
}
.post-list .post-box .post-item .left-img img{
  width: 180px;
  height: 130px;
}
.post-list .post-box .post-item .right-content{
  position: relative;
  flex: 1;
}
.post-list .post-box .post-item .right-content .post-content{
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-list .post-box .post-item .right-content .post-title{
  transition: color 0.2s ease-in-out;
}
.post-list .post-box .post-item .right-content h3,
.post-list .post-box .post-item .right-content h6{
  margin-top: 0;
  margin-bottom: 5px;
}
.post-list .post-box .post-item .right-content h6{
  font-weight: 400;
  color: #409EFF;
}
.post-list .post-box .post-item .right-content .more-info{
  font-size: 15px;
  color: gray;
  position: absolute;
  bottom: 0;
}
.post-list .post-box .post-item .right-content i{
  color: #E6A23C;
}

.post-list .post-box .post-item .right-content .post-title:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>