<template>
  <div id="my-collection">
    <div class="sort-item">
      <el-select 
      v-model="selectedOption.value"
      @change="changeCurrentList"
      >
        <el-option
        v-for="(item,index) in sortItem"
        :key="index"
        :value="item.value"
        :label="item.label"
        ></el-option>
      </el-select>
    </div>
    <div class="items">
      <div class="item-box"
      v-for="(item,index) in collectionList.list"
      :key="index"
      @click="goToPage(item)"
      >
        <div class="collection-img">
          <img :src="item.pic">
        </div>
        <div class="collection-info">
          <div class="collection-title">
            <span>{{item.title}}</span>
          </div>
          <div class="collection-time">
            收藏于：<span>{{item.time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'my-collection',
    created(){
      this.initPost();
      this.initRoute();
    },
    data(){
        return {
          collectionList:{},
          sortItem:[
            {label:'官方线路',value:'Route'},
            {label:'用户推文',value:'Post'}
          ],
          selectedOption:{
            label:'官方线路',
            value:'Route'
          },
          collectRouteList:{
            type:"Route",
            list:[]
          },
          collectPostList:{
            type:'Discuss',
            list:[]
          }
        }
    },
    methods:{
      goToPage(item){
        let url='/'+this.collectionList.type+'/'+item.id;
        this.$router.push(url);
      },
      initRoute(){
        this.$http.get('Route/RouteCollectList',{
          params:{user_id:localStorage["userId"]}
        })
        .then(res=>{
          this.collectRouteList.list=res.data;
          this.collectionList=this.collectRouteList;
        })
      },
      initPost(){
        this.$http.get('Post/PostCollectList',{
          params:{user_id:localStorage["userId"]}
        })
        .then(res=>{
          this.collectPostList.list=res.data;
        })
      },
      changeCurrentList(value){
        value=='Post'?this.collectionList=this.collectPostList:this.collectionList=this.collectRouteList;
      }
    }
}
</script>

<style>
#my-collection .items{
  width: 100%;
  box-sizing: border-box;
  height: 400px;
}
#my-collection .sort-item{
  margin-bottom: 10px;
}
#my-collection .sort-item .el-input__inner{
  border: none;
  width: 85px;
  padding: 0;
}
#my-collection .items .item-box{
  width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: relative;
  display: inline-block;
  margin-right: 20px;
}
#my-collection .items .item-box img{
  width: 100%;
  height: 100px;
  border-radius: 5px 5px 0 0;
}
#my-collection .items .item-box  .collection-info{
  width: 100%;
  height: 50px;
  overflow: hidden;
  font-size: 12px;
  box-sizing: border-box;
  padding: 0 5px;
}
#my-collection .items .item-box  .collection-info .collection-time{
  position: absolute;
  bottom: 5px;
}
#my-collection .items .item-box:hover{
  cursor: pointer;
  box-shadow:  0 2px 10px 0 rgba(0, 0, 0, 0.1);
}
#my-collection .items .item-box:hover .collection-title span{
  color: #409EFF;
}
</style>