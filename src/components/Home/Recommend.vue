<template>
    <div id="recommend">
        <!-- 单个板块区域 -->
        <div class="item">
          <!-- 板块标题 -->
          <div class="item-title">
            <div class="header">猜你喜欢</div>
            <div class="more-info">
              <div class="name">
                <div class="text">&nbsp;RECOMMEND&nbsp;</div>
                <div class="line"></div>
              </div>
            </div>
          </div>
          <div class="link-list">
            <div
              class="img-box"
              v-for="(link, number) in list"
              :key="number"
              @click="jumpToInfo(link)"
            >
              <div class="route-img">
                <img :src="link.routePic" />
              </div>
              <div class="route-info">
                <div class="route-name">
                  {{ link.routeName }}
                </div>
                <div class="route-description">
                  {{ link.routeDes }}
                </div>
                <div class="route-address">
                  <i class="el-icon-location-information"></i>
                  {{ link.routeProvice }}&nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'recommend',
    created(){
        this.initList();
    },
    data(){
        return {
            list:[],
            userLike:""
        }
    },
    methods:{
        initList(){
            this.userLike=typeof localStorage["userLike"]=='undefined'?"":localStorage["userLike"];
            this.$http.get('Route/Recommend',{params:{
                route_theme:this.userLike
            }})
            .then(res=>{
                this.list=res.data.slice(0,3);
            })
        },
        jumpToInfo(link){
          this.$router.push('/Route/'+link.routeId);
        }
    }
}
</script>

<style>

</style>