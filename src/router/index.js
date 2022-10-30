import Vue from 'vue'
import Router from 'vue-router'
import GeneManager from "../views/GeneManager";
import Search from "../components/Search";
import Browser from "../components/Browser";
import Contact from "../components/Contact";
import Analysis from "../components/Analysis";

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
  },
  {
    path: '/ana',
    component: Analysis
  },
  {
    path: '/contact',
    component: Contact
  },
]

const router = new Router({
  routes
})

export default router

