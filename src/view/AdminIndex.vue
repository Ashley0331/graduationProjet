<template>
    <div id="admin-index">
        <div class="left-menu">
            <admin-left-menu @getItemInfo='itemInfo'></admin-left-menu>
        </div>
        <div class="right-content">
            <span>{{currentItem}}</span>
            <div class="box">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import AdminLeftMenu from '../components/Admin/AdminLeftMenu.vue'
export default {
    name:'admin-index',
    components:{
        AdminLeftMenu
    },
    created(){},
    data(){
        return {
            currentItem:'管理员信息'
        }
    },
    methods:{
        itemInfo(itemName){
            this.currentItem=itemName;
        },
    }
}
</script>

<style>
#admin-index{
    background-color: rgb(245, 245, 245);
    height: 100vh;
    box-sizing: border-box;
    padding-top: 50px;
    display: flex;
    justify-content: left;
}
#admin-index .left-menu{
    margin-left: 10px;
}
#admin-index .right-content{
    background-color: #fff;
    height: 570px;
    flex: 1;
    margin:50px 20px 0 10px;
    padding: 15px;
    box-sizing: border-box;
}
#admin-index .right-content>span{
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
    height: 30px;
    line-height: 30px;
}
#admin-index .right-content .box{
    box-sizing: border-box;
    padding: 0 0 15px 0;
}
</style>