<template>
  <div id="bottom-footer">
      <h2>联系信息</h2>
      <div class="info-list">
          <div class="item"
          v-for="(item,index) in footerInfo"
          :key="index">
              <div class="icon">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
              </div>
              <div class="description">
                  {{item.description}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'bottom-footer',
    created(){},
    data(){
        return {
            footerInfo:[
                {
                    icon:'el-icon-phone',
                    title:'Phone',
                    description:'13668014542'
                },
                {
                    icon:'el-icon-location',
                    title:'Address',
                    description:'重庆师范大学计信学院'
                },
                {
                    icon:'el-icon-s-promotion',
                    title:'Email',
                    description:'767883550@qq.com'
                }
            ]
        }
    }
}
</script>

<style>
#bottom-footer{
    width: 100%;
    background-color: #6ab2fa;
    height: 200px;
    margin-top: 20px;
    color: white;
}
#bottom-footer h2{
    text-align: center;
    height: 50px;
    line-height: 50px;
}
#bottom-footer .info-list{
    text-align: center;
    margin-top: 50px;
    box-sizing: border-box;
    width: 1100px;
    margin: 50px auto 0;
}
#bottom-footer .info-list .item{
    display: inline-block;
    width: 32%;
    text-align: left;
}
#bottom-footer .info-list .item  .icon{
    position: relative;
    margin-bottom: 10px;
}
#bottom-footer .info-list .item  .icon i{
    font-size: 40px;
    position: absolute;
    bottom: 0;
}
#bottom-footer .info-list .item .icon span{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 0;
    left: 50px;
    color: rgba(255, 203, 134, 0.856);
    font-weight: 700;
    font-size: 20px;
}
#bottom-footer .info-list .item .description{
    box-sizing: border-box;
    padding-left: 50px;
}
</style>