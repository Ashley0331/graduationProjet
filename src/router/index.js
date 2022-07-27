import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index.vue'
import Home from '../components/Home/Home.vue'

import Attraction from '../components/Attraction/Attraction.vue'
import AttractionInfo from '../components/Attraction/AttractionInfo.vue'

import Route from '../components/Route/Route.vue'
import RouteInfo from '../components/Route/RouteInfo.vue'

import Discuss from '../components/Discuss/DiscussIndex.vue'
import DiscussInfo from '../components/Discuss/DiscussInfo.vue'

import Search from '../components/Search/Search.vue'

import Login from '../view/Login.vue'
import Register from '../view/Register.vue'
import AdminLogin from '../view/AdminLogin.vue'

import UserIndex from '../view/UserIndex.vue'
import MyInfo from '../components/User/MyInfo.vue'
import MyPost from '../components/User/MyPost.vue'
import MyCollection from '../components/User/MyCollection.vue'
import Tweet from '../components/User/Tweet.vue'

import AdminIndex from '../view/AdminIndex.vue'
import AdminInfo from '../components/Admin/AdminInfo.vue'
import AdminAttraction from '../components/Admin/AdminAttraction.vue'
import AdminRoute from '../components/Admin/AdminRoute.vue'
import AdminUser from '../components/Admin/AdminUser.vue'
import AdminAddAttraction from '../components/Admin/AdminAddAttraction.vue'
import AdminAddRoute from '../components/Admin/AdminAddRoute.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect:'/Home',
      children:[
        {path:'Home',name:'Home',component:Home},
        {path:'Attraction',name:'Attraction',component:Attraction},
        {path:'Attraction/:id',name:'AttractionInfo',component:AttractionInfo},
        {path:'Route',component:Route},
        {path:'Route/:id',name:'RouteInfo',component:RouteInfo},
        {path:'Discuss',component:Discuss},
        {path:'Discuss/:id',component:DiscussInfo},
        {path:'Search',redirect:'/Home'},
        {path:'Search/:searchText',component:Search}
      ]},
    {
      path: '/Login',
      component: Login,
    },
    {
      path:'/Register',
      component:Register
    },
    {
      path:'/AdminLogin',
      component:AdminLogin
    },
    {
      path:'/User',name:'User',
      component:UserIndex,
      redirect:'/User/MyPost',
      children:[
        {path:'MyInfo',component:MyInfo},
        {path:'MyPost',component:MyPost},
        {path:'MyCollection',component:MyCollection},
        {path:'Tweet',component:Tweet}
      ]
    },
    {
      path:'/Admin',name:'Admin',
      component:AdminIndex,
      redirect:'/Admin/AdminInfo',
      children:[
        {path:'AdminInfo',component:AdminInfo},
        {path:'AdminAttraction',component:AdminAttraction},
        {path:'AdminRoute',component:AdminRoute},
        {path:'AdminUser',component:AdminUser},
        {path:'AdminAddAttraction',component:AdminAddAttraction},
        {path:'AdminAddRoute',component:AdminAddRoute}
      ]
    }
  ]
})
