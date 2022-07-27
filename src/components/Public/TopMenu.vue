<template>
  <div id="top-menu">
      <div class="menu">
          <el-menu
         mode="horizontal"
        active-text-color="#698bb8"
        @select="selectedItem"
        :default-active="this.$route.path.split('/')[1]"
        >
        <el-menu-item
        v-for="(item,index) in menuItem"
        :key='index'
        :index="''+item.english"
        >
        {{item.name}}
        {{item.english}}
        </el-menu-item>
        </el-menu>
      </div>
      
  </div>
</template>

<script>
export default {
    name:'top-menu',
    created(){
    },
    data(){
        return {
            menuItem:[              //菜单数组
                {name:'首页',english:'Home'},
                {name:'景点',english:'Attraction'},
                {name:'线路推荐',english:'Route'},
                {name:'讨论区',english:'Discuss'},
                {name:'用户中心',english:'User'}
            ],
            defaultItem:'',
            userInfo:null
        }
    },
    methods:{
       selectedItem(index,indexPath){
        if(indexPath[0]==='User'){
            let ok=null;
            if(typeof localStorage["userId"]=='undefined'){
                ok=window.confirm('您还未登录！是否跳转到登陆页面?');
                if(ok) this.$router.push('/Login');
            }else this.$router.push('/User');
        }else
        this.$router.push('/'+indexPath[0]);
       },
    }

}
</script>

<style>
#top-menu{
    width: 100%;
    background-color: #fff;
}
.menu{
    margin-bottom: 20px;
    width: 1100px;
    margin: 0 auto;
}
.el-menu>.el-menu-item{
    color: black;
}
</style>