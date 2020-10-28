import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Registration from '../components/Auth/Registration'
import newNote from '../components/Notes/newNote'
import Todo from '../components/Todo/Todo'
import routeGuard from './routeFuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
    // beforeEnter: routeGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/new',
    name: 'newNote',
    component: newNote,
    beforeEnter: routeGuard
  },
  {
    path: '/todo/:id',
    name: 'todo',
    props: true,
    component: Todo,
    beforeEnter: routeGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
