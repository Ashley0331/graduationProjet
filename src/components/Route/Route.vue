<template>
  <div id="route">
      <sort-list @sortList='getSort'></sort-list>
      <div class="route-container">
      <div class="route-list">
          <div class="item" 
              v-for="item in selectedRoute" 
              :key="item.routeId">
                  <div class="left-img">
                      <img :src="item.routePic">
                  </div>
                  <div class="right-info">
                      <div class="name">
                          <router-link 
                          :to="{name:'RouteInfo',params:{id:item.routeId}}">
                          {{item.routeName}}
                          </router-link>
                      </div>
                      <div class="description">
                          <p>
                              {{item.routeDes}}
                          </p>
                          <div class="more">
                              <div class="icon">
                                  <i class="el-icon-location-information"></i>
                                  {{item.routeProvice}}
                              </div>
                              <div class="icon">
                                  <i class="el-icon-collection-tag"></i>
                                    {{item.routeTheme}}
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
    name:'route',
    components:{
        SortList
    },
    created(){
        this.initList();
    },
    data(){
        return {
            allRoute:[],
            selectedRoute:[],
            sortList:{
                theme:[],
                area:''
            }
        }
    },
    methods:{
        initList(){
            this.$http.get('Route/GetAllRoute')
            .then(res=>{
                this.allRoute=res.data;
                this.selectedRoute=res.data;
            })
        },
        getSort(sortList){
            this.sortList=sortList;
            this.selectItem();
        },
        selectItem(){
            this.selectedRoute=[];
            this.allRoute.forEach(p=>{
                if((this.sortList.theme.length>=0&&this.sortList.theme.includes(p.routeTheme))||this.sortList.theme.length==0){
                    if(this.sortList.area.length==0||(this.sortList.area===p.routeProvice))
                    this.selectedRoute.push(p);
                }
            });
        }
    }
}
</script>

<style>
#route,
#route .route-list{
    width: 100%;
}
#route a{
    cursor: pointer;
    text-decoration: none;
}
#route a:link,
#route a:visited{
    color: #409EFF;
}
#route .route-container
{
    width: 1100px;
    margin: 0 auto;
}
#route .route-list .item{
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 10px;
    padding-bottom: 20px;
}
#route .route-list .item+.item{
    border-top: 1px solid rgb(243, 243, 243);
    padding:20px 10px;
}
#route .route-list .item .left-img{
    float: left;
    width: 300px;
    margin-right: 20px;
}
#route .route-list .item .left-img img{
    width: 100%;
    border-radius: 10px;
}
#route .route-list .item .right-info{
    position: relative;
}
#route .route-list .item .right-info .name{
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #409EFF;
}
#route .route-list .item .right-info .description{
    color: gray;
    font-weight: 100;
    font-size: 15px;
}
#route .route-list .item .right-info .description p{
    height: 60px;
    text-overflow: ellipsis;
    word-break: break-word;
}
#route .route-list .item .right-info .description .more .icon{
    height: 20px;
}
#route .route-list .item .right-info .description .more .icon i{
    color: #E6A23C;
}
</style>