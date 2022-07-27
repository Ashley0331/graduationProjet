<template>
  <div id="index">
      <top-menu></top-menu>
      <div class="search">
      <div class="search-container">
      <el-input
      v-model="searchText"
      placeholder="请输入内容">
      <el-button slot="append" icon="el-icon-search" @click="goToSearch"></el-button>
      </el-input>
      </div>
    </div>
    <router-view/>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import TopMenu from '../components/Public/TopMenu.vue'
import BottomFooter from '../components/Public/BottomFooter.vue'
export default {
    name:'index',
    components:{
        TopMenu,
        BottomFooter
    },
    data(){
      return {
        searchText:'',          //搜索框文字,
      }
    },
    methods:{
      goToSearch(){
        this.$router.push('/Search/'+this.searchText);
      }
    }

}
</script>

<style>
body{
    margin: 0;
}
#index{

}
.search{
  margin-top: 20px;
  width: 100%;
}
.search .search-container{
  width: 1100px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.search .el-input{
    width: 20%;
}
.search .el-input .el-input__inner{
    width: 200px;
}
</style>