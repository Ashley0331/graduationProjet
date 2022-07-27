<template>
    <div id="left-menu">
        <div class="menu-box">
            <div class="user-navator">
            <img :src="userInfo.userPic" alt="" srcset="">
            </div>
            <div class="user-info">
                用户名：{{userInfo.userName}}
            </div>
            <div class="menu-item">
                <div class="item"
                v-for="(item,index) in menuItems"
                :key="index"
                @click="pageJump(item)">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
export default {
    name:'left-menu',
    created(){
        this.initUserInfo();
    },
    data(){
        return {
            userInfo:{},
          menuItems:[
              {name:'我的帖子',icon:'el-icon-edit-outline',path:'MyPost'},
              {name:'我的收藏',icon:'el-icon-star-off',path:'MyCollection'},
              {name:'个人信息',icon:'el-icon-user',path:'MyInfo'},
              {name:'切换账号',icon:''}
              
          ]
        }
    },
    methods:{
        pageJump(item){
            if(item.name=="切换账号"){
                if(window.confirm('退出后需要重新登录，您确定退出吗？')){
                    localStorage.clear();
                    this.$router.push('/Login');
                }
            }else{
                this.$emit('getItemInfo',item.name);
                this.$router.push('/User/'+item.path);
            }
            
        },
        initUserInfo(){
            if(typeof localStorage["userId"] =='undefined')
            this.$router.push('/');
            else{
                this.$http.get('User/GetUserInfoById',
                {params:{
                    user_id:localStorage["userId"]
                }}).then(res=>{
                    this.userInfo=res.data;
                })
            }
        }
    }
}
</script>

<style>
#left-menu{
    width: 250px;
}
#left-menu .menu-box{
    width: 100%;
    background-color: black;
    border-radius: 3px;
    position: relative;
    top: 50px;
    z-index: 1;
    background-color: rgb(235, 235, 235);
    height: 480px;
    padding-top: 70px;
    color: rgb(63, 63, 63);
}
#left-menu .menu-box .user-navator{
    position: absolute;
    background-color: #fff;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 25%;
    top: -60px;
    border: 1px solid rgb(228, 228, 228);
    margin-bottom: 10px;
}
#left-menu .menu-box .user-navator img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
}
#left-menu .menu-box .user-info{
    text-align: center;
    height: 40px;
    line-height:40px;
    border-bottom: 1px solid white;
}
#left-menu .menu-box .menu-item .item{
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    /* border-left: 5px solid rgb(235, 235, 235); */
}
#left-menu .menu-box .menu-item .item i{
     color: rgb(165, 165, 165);
 }
#left-menu .menu-box .menu-item .item+.item{
    border-top: 1px solid white;
}
#left-menu .menu-box .menu-item .item:hover{
  border-left: 5px solid white;
  cursor: pointer;
}
</style>