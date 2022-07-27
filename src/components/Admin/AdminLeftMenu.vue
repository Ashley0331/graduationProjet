<template>
    <div id="admin-left-menu">
        <div class="menu-box">
            <div class="user-navator">
            <img src="../../../static/images/Default Avatar-1.jpg" alt="" srcset="">
            </div>
            <div class="user-info">
                管理员id：{{adminInfo.adminId}}
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
    name:'admin-left-menu',
    created(){
        this.checkState();
        this.initAdminInfo();
    },
    data(){
        return {
          adminInfo:{},
          menuItems:[
              {name:'管理员信息',icon:'el-icon-user',path:'AdminInfo'},
              {name:'景点信息管理',icon:'el-icon-edit-outline',path:'AdminAttraction'},
              {name:'线路信息管理',icon:'el-icon-star-off',path:'AdminRoute'},
              {name:'用户管理',icon:'el-icon-user',path:'AdminUser'},
              {name:'退出管理员中心',icon:''}
          ]
        }
    },
    methods:{
        pageJump(item){
            if(item.name=='退出管理员中心'){
                if(window.confirm("退出后需要重新登录，您确定退出吗？")){
                    localStorage.removeItem("adminId");
                    this.$router.push('/');
                }
            }
            else{
                this.$emit('getItemInfo',item.name);
                this.$router.push('/Admin/'+item.path);
            }
        },
        checkState(){
            if(typeof localStorage["adminId"]=='undefined'){
                this.$router.push('/Login');
            }
        },
        initAdminInfo(){
            this.$http.get('Admin/GetAdminInfoById',{params:{
                admin_id:localStorage["adminId"]
            }}).then(res=>{
                this.adminInfo=res.data;
            })
        }
    }
}
</script>

<style>
#admin-left-menu{
    width: 250px;
}
#admin-left-menu .menu-box{
    width: 100%;
    background-color: black;
    border-radius: 3px;
    position: relative;
    top: 50px;
    z-index: 1;
    background-color: rgb(235, 235, 235);
    height: 500px;
    padding-top: 70px;
    color: rgb(63, 63, 63);
}
#admin-left-menu .menu-box .user-navator{
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
#admin-left-menu .menu-box .user-navator img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
}
#admin-left-menu .menu-box .user-info{
    text-align: center;
    height: 40px;
    line-height:40px;
    border-bottom: 1px solid white;
}
#admin-left-menu .menu-box .menu-item .item{
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    padding-left: 70px;
    height: 50px;
    line-height: 50px;
    /* border-left: 5px solid rgb(235, 235, 235); */
}
#admin-left-menu .menu-box .menu-item .item i{
     color: rgb(165, 165, 165);
 }
#admin-left-menu .menu-box .menu-item .item+.item{
    border-top: 1px solid white;
}
#admin-left-menu .menu-box .menu-item .item:hover{
  border-left: 5px solid white;
  cursor: pointer;
}
</style>