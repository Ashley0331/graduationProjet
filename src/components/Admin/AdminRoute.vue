<template>
    <div id="admin-route">
        <div class="word">
            <span>当前共发布了</span>
            {{this.allRoute.length}}
            <span>个线路信息</span>
            <el-button icon="el-icon-edit" size="small" type="primary" plain @click="goToAddRoute">添加线路信息</el-button>
        </div>
        <div class="list">
            <div class="item"
            v-for="(item,index) in currentList"
            :key="index"
            >
            <div class="left-img">
                <img :src="item.routePic">
            </div>
            <div class="mid-info">
                <h3>{{item.routeName}}</h3>
                <h5>{{item.routeDes}}</h5>
            </div>
            <div class="right-btn">
                <el-button>编辑</el-button>
                <el-button>删除</el-button>
            </div>
            </div>
        </div>
        <div class="page">
            <el-pagination
            layout="prev,pager,next"
            :total="allRoute.length"
            :page-size="pageSize"
            @current-change="pageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name:'admin-route',
    created(){
        this.initRoute();
        
    },
    data(){
        return {
            currentPage:1,
            pageSize:3,
            currentList:[],
            allRoute:[]
        }
    },
    methods:{
        pageChange(n){
            this.currentPage=n;
            this.currentList=this.allRoute.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        },
        initRoute(){
            this.$http.get('Route/GetAllRoute')
            .then(res=>{
                this.allRoute=res.data;
                this.currentList=this.allRoute.slice(0,this.pageSize);
            })
        },
        goToAddRoute(){
            this.$router.push('/Admin/AdminAddRoute');
        }
    }
}
</script>

<style>
#admin-route span{
    color: gray;
}
#admin-route .word{
  margin-bottom:10px;
  color: #409EFF;
}
#admin-route .word .el-button{
    margin-left: 10px;
}
#admin-route .word .el-button:hover span{
    color: white;
}
#admin-route .list{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    height: 400px;
}
#admin-route .list .item{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: left;
}
#admin-route .list .item+.item{
    border-top: 1px solid rgb(196, 196, 196);
}
#admin-route .list .item .left-img{
    width: 200px;
}
#admin-route .list .item .left-img img{
    height: 100px;
}
#admin-route .list .item .mid-info{
    width: 800px;
    height: 100px;
    box-sizing: border-box;
}
#admin-route .list .item .mid-info h3{
    margin-top: 0;
}
#admin-route .list .item .mid-info h5{
    font-weight: 500;
    color: gray;
    margin-top: 1em;
    margin-bottom: 0;
    height: 52.8px;
    overflow: hidden;
    width: 95%;
}
#admin-route .list .item .right-btn{
    display: flex;
}
#admin-route .page{
    text-align: center;
}
</style>