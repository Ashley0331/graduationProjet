<template>
  <div id="rotation">
      <div class="rotation-container">
        <el-carousel height="450px">
        <el-carousel-item
        v-for="(item,index) in imgList"
        :key='index'
       >
        <h3>{{item.name}}</h3>
        <img :src="item.path" 
        :alt="item.name"
        width="1100px"
        height="450"
         @click="goToRouteDetail(item)">
        </el-carousel-item>
      </el-carousel>
      </div>
  </div>
</template>

<script>
export default {
    name:'rotation',
    props:[
        'imgList'
    ],
    data(){
        return {
        }
    },
    methods:{
        goToRouteDetail(item){
            this.$router.push('/Route/'+item.id)
        }
    }

}
</script>

<style>
#rotation{
    width: 100%;

}
#rotation .rotation-container{
    width: 1100px;
    margin: 0 auto;
}
#rotation .rotation-container .el-carousel__item h3{
    color:aliceblue;
    position: absolute;
    width: 100%;
    background-color:rgba(146, 145, 145,0.75);
    height: 50px;
    line-height: 50px;
    top:400px;
    margin: 0;
    text-indent: 2em;
}
#rotation .rotation-container .el-carousel__item img{
    cursor: pointer;
}
#rotation .el-carousel__container{
    margin: 0 auto;
    background-color: #fff;
}
</style>