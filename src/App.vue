<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import TopMenu from './components/Public/TopMenu';
export default {
  components:{
    TopMenu,
  },
  name: 'App',
  created(){
    
  },
  data(){
    return {

    }
  },
  methods:{
    

  }
}
</script>

<style>
#app {
}
</style>
