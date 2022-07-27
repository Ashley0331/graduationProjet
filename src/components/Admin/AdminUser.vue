<template>
    <div id="admin-user">
        
        <div class="list">
            <div class="item" 
            v-for="(item,index) in currentList"
            :key="index">
            <div class="left-img">
                <img :src="item.userPic">
            </div>
            <div class="right-info">
                <h3>{{item.userId}}</h3>
                <h4>昵称：{{item.userName}}</h4>
                <h4>身份：{{item.userIdentity}}</h4>
            </div>
            </div>
        </div>
        <div class="page">
            <el-pagination
            layout="prev,pager,next"
            :total="allUser.length"
            :page-size="pageSize"
            @current-change="pageChange"
            v-show="allUser.length>pageSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name:'admin-user',
    created(){
        this.initAllUser();
        
    },
    data(){
        return {
            allUser:[],
            currentPage:1,
            pageSize:6,
            currentList:[]
        }
    },
    methods:{
        pageChange(n){
            this.currentPage=n;
            this.currentList=this.allUser.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        },
        initAllUser(){
            this.$http.get('User/AllUser')
            .then(res=>{
                this.allUser=res.data;
                this.currentList=this.allUser.slice(0,this.pageSize);
            })
        }
    }
}
</script>

<style>
#admin-user .list{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    height: 450px;
    margin-bottom: 20px;
    overflow: hidden;
}
#admin-user .list .item{
    width: 30%;
    display: inline-block;
    border: 1px solid rgb(197, 197, 197);
    margin-right: 10px;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 10px;
    position:relative;
}
#admin-user .list .item:hover{
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
#admin-user .list .item .left-img{
    margin-right: 20px;
    display: inline-block;
}
#admin-user .list .item .left-img img{
    width: 100px;
    height: 100px;
}
#admin-user .list .item .right-info{
    position: absolute;
    top: 10px;
    left: 120px;
}
#admin-user .list .item .right-info h3{
    margin-top: 0;
}

#admin-user .list .item .right-info h4{
    font-weight: 400;
    color: gray;
    margin-top: 0;
    margin-bottom: 0.5em;
}
#admin-user .page{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    height: 80px;
}
</style>