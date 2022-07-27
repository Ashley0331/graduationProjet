<template>
    <div id="user-index">
        <div class="top-tag">
            <el-button @click="goToHome">回到主页面</el-button>
        </div>
        <div class="content-container">
        <div class="left-menu">
            <left-menu @getItemInfo='itemInfo'></left-menu>
        </div>
        <div class="content">
            <span>{{currentItem}}</span>
            <div class="box">
                <router-view/>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import LeftMenu from '../components/User/LeftMenu.vue'
export default {
    name:'user-index',
    components:{
        LeftMenu
    },
    created(){
    },
    data(){
        return {
            currentItem:'我的帖子'
        }
    },
    methods:{
        itemInfo(itemName){
            this.currentItem=itemName;
        },
        goToHome(){
            this.$router.push('/');
        },
    }
}
</script>

<style>
#user-index{
    background-color: rgb(245, 245, 245);
    height: 100vh;
}
#user-index .top-tag{
    width: 100%;
    height: 70px;
    background-color:#fff;
    margin-bottom: 20px;
    line-height: 70px;
    padding-left: 10px;
    box-sizing: border-box;
}
#user-index .content-container{
    display: flex;
    justify-content: left;
}
#user-index .left-menu{
    margin-left: 10px;
    display: inline-block;
}
#user-index .content{
    flex: 1;
    height: 550px;
    background-color: #fff;
    margin:50px 20px 0 10px;
    padding: 15px;
    box-sizing: border-box;
}
#user-index .content>span{
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
    height: 30px;
    line-height: 30px;
}
#user-index .content .box{
    box-sizing: border-box;
    padding: 0 0 15px 0;
}
</style>