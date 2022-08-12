import Vue from 'vue'
import Router from 'vue-router'
import GeneAdd from "../components/gene/GeneAdd";
import GeneList from "../components/gene/GeneList";
import GeneManager from "../views/GeneManager";
import Search from "../components/Search";
import Browser from "../components/Browser";

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: ()=>import('../components/Home')
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
  },
  {
    path: '/browser',
    component: Browser
  }
]

const router = new Router({
  routes
})

export default router

