import Vue from 'vue'
import Router from 'vue-router'

import GeneAdd from "../components/gene/GeneAdd";
import GeneList from "../components/gene/GeneList";
import GeneManager from "../views/GeneManager";
import Search from "../components/Search";

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: ()=>import('../components/Index')
  },
  {
    path: '/geneAdd',
    name: 'geneAdd',
    component: GeneAdd
  },
  {
    path: '/geneList',
    component: GeneList
  },
  {
    path: '/geneManager',
    component: GeneManager
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new Router({
  routes
})

export default router

