import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WebSql from '@/components/WebSql'
import IndexedDB from '@/components/IndexedDB'
import Indexeddbshim from '@/components/Indexeddbshim'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/websql',
      name: 'websql',
      component: WebSql
    },
    {
      path: '/indexedDB',
      name: 'indexedDB',
      component: IndexedDB
    },
    {
      path: '/indexeddbshim',
      name: 'indexeddbshim',
      component: Indexeddbshim
    }
  ]
})
