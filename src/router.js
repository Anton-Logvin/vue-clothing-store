import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogPage from './layouts/catalog'
import ProductPage from './layouts/product'
import MainPage from './layouts/MainPage'
import UserPage from './layouts/UserPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/catalog',
    component: CatalogPage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/cart',
    component: () => import('./layouts/Cart')
  },
  {
    path: '/user',
    component: UserPage
  },
]

export default new VueRouter({
  mode: 'history',
  routes
})