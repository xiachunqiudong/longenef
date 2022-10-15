import Vue from 'vue'
import Router from 'vue-router'
import GeneManager from "../views/GeneManager";
import Search from "../components/Search";
import Browser from "../components/Browser";
import Ana from "../components/Ana"
import Contact from "../components/Contact";
import Methylation from "../components/dzx/Methy";
import Rana from "../components/Rana";

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
    component: Ana
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/rana',
    component: Rana
  }
]

const router = new Router({
  routes
})

export default router

