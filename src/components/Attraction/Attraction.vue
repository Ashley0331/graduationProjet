<template>
  <div id="attraction">
      <sort-list @sortList='getSort'></sort-list>
      <div class="attraction-container">
          <div class="attraction-list">
              <div class="item" 
              v-for="item in selectedAttraction" 
              :key="item.attractionId">
                  <div class="left-img">
                      <img :src="item.attractionPic">
                  </div>
                  <div class="right-info">
                      <div class="name">
                          <router-link 
                          :to="{name:'AttractionInfo',params:{id:item.attractionId}}">
                          {{item.attractionName}}
                          </router-link>
                      </div>
                      <div class="description">
                          <p>
                              {{item.attractionDes}}
                          </p>
                          <div class="more">
                              <div class="icon">
                                  <i class="el-icon-location-information"></i>
                                  {{item.attractionProvice}}&nbsp;&nbsp;{{item.attractionCity}}
                              </div>
                              <div class="icon">
                                  <i class="el-icon-collection-tag"></i>
                                    {{item.attractionTheme}}
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
    components: { SortList },
    name:'attraction',
    created(){
        this.initAttractionList();
    },
    data(){
        return {
            allAttraction:[],//景点列表
            selectedAttraction:[],
            sortList:{
                theme:[],
                area:''
            }
        }
    },
    methods:{
        initAttractionList(){
            this.$http.get('Attraction/GetAllInfo')
            .then(res=>{
                this.allAttraction=res.data;
                this.selectedAttraction=res.data;
            })
        },
        getSort(sortList){
            this.sortList=sortList;
            this.selectItem();
        },
        selectItem(){
            this.selectedAttraction=[];
            this.allAttraction.forEach(p=>{
                if((this.sortList.theme.length>=0&&this.sortList.theme.includes(p.attractionTheme))||this.sortList.theme.length==0){
                    if(this.sortList.area.length==0||(this.sortList.area===p.attractionProvice))
                    this.selectedAttraction.push(p);
                }
            });
        }
    }
}
</script>

<style>
#attraction,
.attraction-list{
    width: 100%;
}
a{
    cursor: pointer;
    text-decoration: none;
}
a:link,
a:visited{
    color: #409EFF;
}
.attraction-container
{
    width: 1100px;
    margin: 0 auto;
}
.attraction-list .item{
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 10px;
    padding-bottom: 20px;
}
.attraction-list .item+.item{
    border-top: 1px solid rgb(243, 243, 243);
    padding:20px 10px;
}
.attraction-list .item .left-img{
    float: left;
    width: 300px;
    margin-right: 20px;
}
.attraction-list .item .left-img img{
    width: 100%;
    border-radius: 10px;
}
.attraction-list .item .right-info{
    position: relative;
}
.attraction-list .item .right-info .name{
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #409EFF;
}
.attraction-list .item .right-info .description{
    color: gray;
    font-weight: 100;
    font-size: 15px;
}
.attraction-list .item .right-info .description p{
    height: 60px;
    text-overflow: ellipsis;
    word-break: break-word;
    overflow: hidden;
}
.attraction-list .item .right-info .description .more .icon{
    height: 20px;
}
.attraction-list .item .right-info .description .more .icon i{
    color: #E6A23C;
}
</style>