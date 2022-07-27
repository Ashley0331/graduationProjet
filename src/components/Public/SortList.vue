<template>
  <div id="sort-list">
      <div class="sort-container">
          <el-form>
              <el-form-item label="研学区域">
              <el-select
              v-model="selected.area"
              placeholder="请指定研学区域"
              @change="getSortValue">
              <el-option
              v-for="(item,index) in sortForm.area"
              :key="index"
              :label="item.proviceName"
              :value="item.proviceName">
              </el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="研学主题">
              <el-checkbox-group
              v-model="selected.theme"
              @change="getSortValue">
              <el-checkbox
              v-for="(item,index) in sortForm.theme"
              :key="index"
              :label="item"
              ></el-checkbox>
              </el-checkbox-group>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
    name:'sort-list',
    created(){
        this.initArea();
    },
    data(){
        return {
            sortForm:{
                theme:['培养红色精神','锻炼身体素质','感受生态自然','学习相关知识','感受学习氛围','探索城市文化'],//研学主题
                area:[],//研学区域
            },
            selected:{
                theme:[],
                area:''
            }
        }
    },
    methods:{
        getSortValue(value){
            this.$emit('sortList',this.selected);
        },
        initArea(){
            this.$http.get('Address/AddressList')
            .then(res=>{
                this.sortForm.area=[{
                    proviceId: 0,
                    proviceName: ""
                },...res.data];
            })
        }
    }
}
</script>

<style>
#sort-list{
    width: 100%;
    background-color: rgb(243, 243, 243);
    height: 150px;
    margin-bottom: 20px;
}
.sort-container{
    width: 1100px;
    margin: 0 auto;
    padding: 10px;
}
</style>