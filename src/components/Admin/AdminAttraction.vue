<template>
    <div id="admin-attraction">
        <div class="word">
            <span>当前共发布了</span>
            {{allAttraction.length}}
            <span>个景点信息</span>
            <el-button icon="el-icon-edit" size="small" type="primary" plain @click="goToAddAttraction">添加新景点</el-button>
        </div>
        <div class="list">
            <div class="item"
            v-for="(item,index) in currentList"
            :key="index"
            >
            <div class="left-img">
                <img :src="item.attractionPic">
            </div>
            <div class="mid-info">
                <h3>{{item.attractionName}}</h3>
                <h5>{{item.attractionDes}}</h5>
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
            :total="allAttraction.length"
            :page-size="pageSize"
            @current-change="pageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name:'admin-attraction',
    created(){
        this.initAllAttraction();
    },
    data(){
        return {
            number:1,
            currentPage:1,
            pageSize:3,
            currentList:[],
            allAttraction:[]
        }
    },
    methods:{
        pageChange(n){
            this.currentPage=n;
            this.currentList=this.allAttraction.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        },
        initAllAttraction(){
            this.$http.get('Attraction/GetAllInfo')
            .then(res=>{
                this.allAttraction=res.data;
                this.currentList=this.allAttraction.slice(0,this.pageSize);
            })
        },
        goToAddAttraction(){
            this.$router.push('/Admin/AdminAddAttraction');
        }
    }
}
</script>

<style>
#admin-attraction span{
    color: gray;
}
#admin-attraction .word{
  margin-bottom:10px;
  color: #409EFF;
}
#admin-attraction .word .el-button{
    margin-left: 10px;
}
#admin-attraction .word .el-button:hover span{
    color: white;
}
#admin-attraction .list{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    height: 400px;
}
#admin-attraction .list .item{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: left;
}
#admin-attraction .list .item+.item{
    border-top: 1px solid rgb(196, 196, 196);
}
#admin-attraction .list .item .left-img{
    width: 200px;
}
#admin-attraction .list .item .left-img img{
    height: 100px;
}
#admin-attraction .list .item .mid-info{
    width: 800px;
    height: 100px;
    box-sizing: border-box;
}
#admin-attraction .list .item .mid-info h3{
    margin-top: 0;
}
#admin-attraction .list .item .mid-info h5{
    font-weight: 500;
    color: gray;
    margin-top: 1em;
    margin-bottom: 0;
    height: 52.8px;
    overflow: hidden;
    width: 95%;
}
#admin-attraction .list .item .right-btn{
    display: flex;
}
#admin-attraction .page{
    text-align: center;
}
</style>