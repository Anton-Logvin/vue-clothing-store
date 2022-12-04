import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogPage from './layouts/catalog'
import ProductPage from './layouts/product'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: CatalogPage
  },
  {
    path: '/catalog/:product?',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/cart',
    component: () => import('./components/vCart')
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})