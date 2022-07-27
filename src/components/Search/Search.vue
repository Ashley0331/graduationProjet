<template>
    <div id="search">
        <div class="word">
            <span>关于</span>
            “{{searchText}}”
            <span>的搜索结果</span>
        </div>
        <div class="type">
            <ul>
                <li @click="getRouteList">线路 &nbsp; {{this.allRoute.length}}</li>
                <li @click="getAttractionList">景点 &nbsp; {{this.allAttraction.length}}</li>
                <li @click="getPostList">推文 &nbsp; {{this.allPost.length}}</li>
            </ul>
        </div>
        <div class="list-container">
            <div class="result-list">
                <el-empty 
                description="抱歉，未搜索到您相要的信息"
                v-if="!searchResult.length"></el-empty>
                <div class="item"
                v-for="(item,index) in searchResult"
                :key="index">
                  <div class="left-img">
                      <img :src="item.resultCover">
                  </div>
                  <div class="right-info">
                      <div class="name">
                          <a @click="goToDetail(item)">{{item.resultName}}</a>
                      </div>
                      <div class="description">
                          <p>
                              {{item.resultDes}}
                          </p>
                          <div class="more">
                              <div class="icon">
                                  <i class="el-icon-location-information"></i>
                                  {{item.resultProvice}}
                              </div>
                              <div class="icon">
                                  <i class="el-icon-collection-tag"></i>
                                    {{item.resultTheme}}
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
import SortList from '../Public/SortList.vue'
export default {
    name:'search',
    components:{
        SortList
    },
    created(){
        this.searchText=this.$route.params["searchText"];
        this.initSearchRoute();
        this.initSearchPost();
        this.initSearchAttraction();
    },
    data(){
        return {
            searchText:'重庆师范大学',
            searchResult:[],
            allRoute:[],
            allPost:[],
            allAttraction:[],
            
        }
    },
    methods:{
        initSearchRoute(){
            this.$http.get('Search/SearchRoute',{params:{
                searchText:this.searchText
            }})
            .then(res=>{
                console.log(res.data);
                this.allRoute=res.data;
                this.searchResult=this.allRoute;
            })
        },
        initSearchPost(){
            this.$http.get('Search/SearchPost',{params:{
                searchText:this.searchText
            }})
            .then(res=>{
                this.allPost=res.data;
            })
        },
        initSearchAttraction(){
            this.$http.get('Search/SearchAttraction',{params:{
                searchText:this.searchText
            }})
            .then(res=>{
                this.allAttraction=res.data;
            })
        },
        getRouteList(){
            this.searchResult=this.allRoute;
        },
        getAttractionList(){
            this.searchResult=this.allAttraction;
        },
        getPostList(){
            this.searchResult=this.allPost;
        },
        goToDetail(item){
            this.$router.push('/'+item.resultType+'/'+item.resultId);
        }
    }
}
</script>

<style>
#search .list-container,
#search .word,
#search .type{
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 20px;
}
#search .word{
    font-size: 30px;
    font-weight: 700;
}
#search .word span{
    display: inline-block;
    font-size: 20px;
    font-weight: 400;
    color: gray;
}
#search .type ul{
    padding-left: 0;
}
#search .type li{
    display: inline-block;
    color: #409EFF;
    width: 90px;
    cursor: pointer;
}
#search .result-list .item{
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 10px;
    padding-bottom: 20px;
}
#search .result-list .item+.item{
    border-top: 1px solid rgb(243, 243, 243);
    padding:20px 10px;
}
#search .result-list .item .left-img{
    float: left;
    width: 300px;
    margin-right: 20px;
}
#search .result-list .item .left-img img{
    width: 100%;
    border-radius: 10px;
}
#search .result-list .item .right-info{
    position: relative;
}
#search .result-list .item .right-info .name{
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #409EFF;
    cursor: pointer;
}
#search .result-list .item .right-info .description{
    color: gray;
    font-weight: 100;
    font-size: 15px;
}
#search .result-list .item .right-info .description p{
    height: 60px;
    text-overflow: ellipsis;
    word-break: break-word;
}
#search .result-list .item .right-info .description .more .icon{
    height: 20px;
}
#search .result-list .item .right-info .description .more .icon i{
    color: #E6A23C;
}
</style>