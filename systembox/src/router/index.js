import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import Login from '@/pages/Login'
import UserManages from '@/pages/userManages/UserManages'
import Home from '@/components/Home'
import CustomerManages from '@/pages/customerManages/CustomerManages'
import BoxStandard from '@/pages/boxManages/boxStandard/BoxStandard'
import BoxInfo from '@/pages/boxManages/boxInfo/BoxInfo'
import AdvertManages from '@/pages/advertManages/AdvertManages'
import OrderManages from '@/pages/orderManages/OrderManages'
import ViewManages from '@/pages/viewManages/ViewManages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/sidebar',
      name: 'SideBar',
      component: SideBar
    },
    {
      path:'/home',
      name: 'Home',
      component: Home,
      children:[
        {
            path: '/usermanages',
            name: 'usermanages',
            component: UserManages
        },
        {
          path: '/customerManages',
          name: 'customerManages',
          component: CustomerManages
        },
        {
          path: '/boxstandard',
          name: 'boxstandard',
          component: BoxStandard
        },
        {
          path: '/boxinfo',
          name: 'boxinfo',
          component: BoxInfo
        },
        {
          path: '/advertmanages',
          name: 'advertmanages',
          component: AdvertManages
        },
        {
          path: '/ordermanages',
          name: 'ordermanages',
          component: OrderManages
        },
        {
          path: '/viewmanages',
          name: 'viewmanages',
          component: ViewManages
        },
      ]
    },
  ]
})
