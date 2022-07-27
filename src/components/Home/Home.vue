<template>
  <div id="home">
    <div class="home-container">
      <rotation :imgList="linkImg"></rotation>
      <div class="items-list">
        <recommend></recommend>
        <!-- 单个板块区域 -->
        <div class="item" v-for="(item, index) in link" :key="index">
          <!-- 板块标题 -->
          <div class="item-title">
            <div class="header">{{ item.itemName }}</div>
            <div class="more-info">
              <div class="name">
                <div class="text">&nbsp;{{ item.itemEnglishName }}&nbsp;</div>
                <div class="line"></div>
              </div>
              <div class="jump">
                <a @click="jumpToPage(item)">MORE</a>
                <i class="el-icon-right"></i>
              </div>
            </div>
          </div>
          <div class="link-list">
            <div
              class="img-box"
              v-for="(link, number) in item.list"
              :key="number"
              @click="jumpToInfo(item.more,link)"
            >
              <div class="route-img">
                <img :src="link.path" />
              </div>
              <div class="route-info">
                <div class="route-name">
                  {{ link.name }}
                </div>
                <div class="route-description">
                  {{ link.description }}
                </div>
                <div class="route-address">
                  <i class="el-icon-location-information"></i>
                  {{ link.provice }}&nbsp;
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
import Rotation from "./Rotation.vue";
import Recommend from "./Recommend"
export default {
  name: "home",
  components: {
    Rotation,
    Recommend,
  },
  created() {
    this.initRoute();
    this.initPost();
  },
  data() {
    return {
      linkImg: [],
      link: [
        {
          itemName: "线路推荐",
          itemEnglishName: "ROUTE",
          list: [],
          more: "Route",
        },
        {
          itemName: "用户推文",
          itemEnglishName: "POST",
          list: [],
          more: "Discuss",
        },
      ],
    };
  },
  methods: {
    initRoute() {
      this.$http.get("Route/GetAllRoute").then((res) => {
          const all=res.data;
          const list=[];
          for(let i =0;i<3;i++){
              const row=all[i];
              const current={};
              current["id"]=row["routeId"];
              current["name"]=row["routeName"];
              current["description"]=row["routeDes"];
              current["provice"]=row["routeProvice"];
              current["path"]=row["routePic"];
              list.push(current);
          }
        this.link[0].list = list;
        this.linkImg=list;
      });
    },
    initPost() {
      this.$http.get("Post/GetAllPost").then((res) => {
        const all=res.data;
          const list=[];
          for(let i =0;i<3;i++){
              const row=all[i];
              const current={};
              current["id"]=row["postId"];
              current["name"]=row["postTitle"];
              current["description"]=row["postContent"];
              current["provice"]=row["postProvice"];
              current["path"]=row["postPic"];
              list.push(current);
          }
        this.link[1].list = list;
      });
    },
    jumpToPage(item) {
      this.$router.push("/" + item.more);
    },
    jumpToInfo(item,link){
        this.$router.push('/'+item+'/'+link.id)
    }
  },
};
</script>

<style>
#home {
  width: 100%;
}
.home-container {
  width: 1100px;
  margin: 0 auto;
}
#home .items-list {
  margin-top: 20px;
}
#home .item {
  position: relative;
  margin-bottom: 20px;
}
#home .item .item-title {
  position: relative;
  font-weight: 400;
  width: 100%;
  text-align: center;
  height: 55px;
}
#home .item .item-title .haeder {
  font-size: 15px;
  color: black;
  height: 40px;
  line-height: 40px;
  width: 100%;
}
#home .item .item-title .more-info {
  position: absolute;
  font-size: 10px;
  width: 100%;
}
.item .item-title .more-info .name {
  text-align: center;
}
#home .item .item-title .more-info .name .text {
  background-color: #fff;
  display: inline-block;
  color: gray;
}
#home .item .item-title .more-info .name .line {
  width: 200px;
  height: 0px;
  border-top: 2px solid rgba(236, 150, 38, 0.856);
  position: absolute;
  top: 50%;
  right: 41%;
  z-index: -1;
}
#home .item .item-title .more-info .jump {
  position: absolute;
  top: 0;
  right: 0;
}
#home .item .item-title .more-info .jump a {
  cursor: pointer;
  color: #409eff;
}
#home .item .link-list {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#home .item .link-list .img-box {
  width: 33%;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#home .item .link-list .img-box + .img-box {
  margin-left: 10px;
}
#home .item .link-list .img-box .route-img {
  overflow: hidden;
  height: 200px;
  width: 100%;
}
#home .item .link-list .img-box .route-img img {
  width: 100%;
  display: inline-block;
  height: 200px;
  overflow: hidden;
  transition: all 0.75s;
}
#home .item .link-list .route-info {
  padding: 5px;
  height: 100px;
}
#home .item .link-list .route-info .route-name {
  font-size: 20px;
  margin: 10px 0;
}
#home .item .link-list .route-info .route-description {
  font-size: 10px;
  color: gray;
  position: relative;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}
#home .item .link-list .route-info .route-address {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 10px;
  color: gray;
}
#home .item .link-list .route-info .route-address i {
  color: #e6a23c;
}
/* 行为产生效果 */
#home .item .link-list .img-box:hover {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
#home .item .link-list .img-box:hover img {
  transform: scale(1.4);
}
</style>