<template>
  <div id="route-info">
    <div class="info-container">
      <div class="main-info">
        <div class="route-cover">
          <img :src="currentRoute.routePic" />
        </div>
        <div class="route-des">
          <h2>{{ currentRoute.routeName }}</h2>
          <div class="icon">
            <div class="left">
              <i class="el-icon-location-information"></i>
              {{ currentRoute.routeProvice }}
            </div>
            <div class="right">
              <i class="el-icon-collection-tag"></i>
              {{ currentRoute.routeTheme }}
            </div>
          </div>
          <div class="text">
            {{ currentRoute.routeDes }}
          </div>
          <div class="interaction-btn">
            <i
              :class="isCollected ? 'el-icon-star-on' : 'el-icon-star-off'"
              @click="collectEvent"
            ></i>
          </div>
        </div>
      </div>
      <div class="route-detail">
        <div class="place" v-for="(item, index) in routeDetail" :key="index">
          <div class="place-name">
            <div class="circle">{{ index + 1 }}</div>
            <span>{{ item.attractionName }}</span>
          </div>
          <div class="img-des">
            <div class="place-img">
              <img :src="item.attractionPic" />
            </div>
            <div class="place-des">
              <p>地址：{{ item.attractionAddress }}</p>
              <p>看点：{{ item.attractionHighlight }}</p>
              <p @click="goToAttraction(item.attractionId)">查看景点信息&nbsp;&nbsp;&nbsp;<i class="el-icon-right"></i></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "route-info",
  created() {
    let n = this.$route.params["id"];
    this.initRoute(n);
    this.initRouteDetail(n);
    this.checkCollectState(n);
  },
  data() {
    return {
      currentRoute: {},
      routeDetail: [],
      isCollected: false,
    };
  },
  methods: {
    initRoute(id) {
      this.$http
        .get("Route/GetRouteInfoById", { params: { route_id: id } })
        .then((res) => {
          this.currentRoute = res.data;
        });
    },
    initRouteDetail(id) {
      this.$http
        .get("Route/GetRouteDetailById", {
          params: {
            route_id: id,
          },
        })
        .then((res) => {
          this.routeDetail = res.data.attrationList;
        });
    },
    checkCollectState(id) {
      if (typeof localStorage["userId"] == "undefined") {
        this.isCollected = false;
      } else {
        this.$http
          .get("Route/CheckCollectState", {
            params: {
              route_id: id,
              user_id: localStorage["userId"],
            },
          })
          .then((res) => {
            this.isCollected = res.data;
          });
      }
    },
    collectEvent() {
      if (!this.isCollected) {
        if (typeof localStorage["userId"] == "undefined") {
          if (window.confirm("游客无法进行收藏，需要去登录吗？")) this.$router.push("/");
        } else {
          this.userCollectRoute();
        }
      } else {
        if (window.confirm("确定取消收藏吗？")) {
          this.userCancelCollect();
        }
      }
    },
    userCollectRoute() {
      this.$http.post("Route/UserCollectRoute", 
      {
          UserId:localStorage["userId"],
          RouteId:this.currentRoute.routeId
      }).then((res) => {
        if (res.data) {
          this.$notify({
            title: "收藏成功",
            type: "success",
          });
          this.isCollected=true;
        } else {
          this.$notify({
            title: "收藏失败",
            type: "warning",
          });
        }
      });
    },
    userCancelCollect() {
      this.$http.delete("Route/UserCancelCollect", {
          params:{
              user_id:localStorage["userId"],
              route_id:this.currentRoute.routeId
          }
      }).then((res) => {
        if (res.data) {
          this.$notify({
            title: "取消成功",
            type: "success",
          });
          this.isCollected=false;
        } else {
          this.$notify({
            title: "取消失败",
            type: "warning",
          });
        }
      });
    },
    goToAttraction(id){
      this.$router.push('/Attraction/'+id);
    }
  },
};
</script>

<style>
#route-info .info-container {
  width: 1100px;
  margin: 0 auto;
}
#route-info .main-info {
  width: 100%;
  position: relative;
  height: 450px;
  margin-bottom: 40px;
}
#route-info .main-info .route-cover {
  width: 100;
  height: 300px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
}
#route-info .main-info .route-cover img {
  width: 100%;
  position: absolute;
  top: -40%;
}
#route-info .main-info .route-des {
  width: 800px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  margin-left: 160px;
  box-shadow: 0 2px 14px 0 rgb(67 67 67 / 17%);
  border-radius: 4px;
  box-sizing: border-box;
  height: 250px;
  padding: 10px;
}
#route-info .main-info .route-des .icon {
  position: relative;
  color: gray;
  height: 50px;
}
#route-info .main-info .route-des .icon .left {
  position: absolute;
  left: 0;
}
#route-info .main-info .route-des .icon .right {
  position: absolute;
  right: 0;
}
#route-info .main-info .route-des i {
  color: #e6a23c;
}
#route-info .main-info .route-des .interaction-btn {
  font-size: 30px;
  position: absolute;
  bottom: 10px;
}
#route-info .main-info .route-des .interaction-btn:hover {
  cursor: pointer;
}
#route-info .route-detail .place .place-name {
  width: 100%;
  position: relative;
}
#route-info .route-detail .place .place-name .circle {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #e6a23c;
  display: inline-block;
  position: absolute;
  bottom: 0;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
  font-weight: 700;
  color: white;
}
#route-info .route-detail .place .place-name span {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  margin-left: 80px;
  font-size: 25px;
  color: #e6a23c;
  font-weight: 700;
}
#route-info .route-detail .place .img-des {
  width: calc(100%-30px);
  margin-left: 30px;
  border-left: 2px solid #e6a23c;
  box-sizing: border-box;
  padding-left: 50px;
  position: relative;
  height: 190px;
}
#route-info .route-detail .place .img-des .place-img img {
  width: 300px;
  position: absolute;
  right: 10px;
  border-radius: 10px;
}
#route-info .route-detail .place .img-des .place-des p:first-child {
  margin-top: 0;
}
#route-info .route-detail .place .img-des .place-des p:last-child{
  color: #409eff;
  cursor: pointer;
}
</style>