import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Test from '@/components/Test'
import PersonCenter from '@/components/pages/PersonCenter'
import Index from '@/components/pages/Index'
import IntegralRecord from '@/components/pages/IntegralRecord'
import nullBox from '@/components/pages/nullBox'
import aboutMe from '@/components/pages/aboutMe'
import View from '@/components/pages/View'
import AlterPassword from '@/components/pages/AlterPassword'
import AddrManage from '@/components/pages/AddrManage'
import AddrAdd from '@/components/pages/AddrAdd'
import AddrEdit from '@/components/pages/AddrEdit'
import appointment from '@/components/pages/appointment'
import OrderList from '@/components/pages/OrderList'
import ListDetail from '@/components/pages/ListDetail'
import operate from '@/components/pages/operate'
import accountManagement from '@/components/pages/accountManagement'
import adInfo from "@/components/pages/adInfo"



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/personcenter',
      name: 'personcenter',
      component: PersonCenter
    },
    // {
    //   path: '/',
    //   name: 'Test',
    //   component: Test
    // },
    {
      path: '/index',
      name: 'index',
      component: Index 
    },
    {
      path: '/adinfo',
      name: 'adinfo',
      component: adInfo 
    },
    {
      path: '/integralrecord',
      name: 'integralrecord',
      component: IntegralRecord 
    },
    {
      path: '/nullBox',
      name: 'nullBox',
      component: nullBox 
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: aboutMe 
    },
    {
      path: '/view',
      name: 'view',
      component: View 
    },
    {
      path: '/alterpassword',
      name: 'AlterPassword',
      component: AlterPassword 
    },
    {
      path: '/addrmanage',
      name: 'addrmanage',
      component: AddrManage 
    },
    {
      path: '/addradd',
      name: 'addradd',
      component: AddrAdd 
    },
    {
      path: '/addredit',
      name: 'addredit',
      component: AddrEdit 
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: appointment 
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: OrderList 
    },
    {
      path: '/listdetail',
      name: 'listdetail',
      component: ListDetail 
    },
    {
      path: '/operate',
      name: 'operate',
      component: operate 
    },
    {
      path: '/accountmanagement',
      name: 'accountmanagement',
      component: accountManagement 
    },
  ]
})
