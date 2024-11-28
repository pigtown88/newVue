import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import NewPage from '../views/NewPage.vue'
import CalculatorView from '../views/CalculatorView.vue'
import StudentListView from '../views/StudentListView.vue'
import StudentManageView from '../views/StudentManageView.vue'
import TodoListView from '../views/TodoListView.vue'
import ProductView from '../views/ProductView.vue'
import SimpleTodoView from '../views/SimpleTodoView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'
import ItemList from '../views/ItemList.vue'
import TodoList from '../views/TodoList.vue'; // 引入 TodoList 組件

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  },
  {
    path: '/new',
    name: 'NewPage',
    component: NewPage
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: CalculatorView
  },
  {
    path: '/students',
    name: 'Students',
    component: StudentListView
  },
  {
    path: '/student-manage',
    name: 'StudentManage',
    component: StudentManageView
  },
  {
    path: '/todos',
    name: 'Todos',
    component: TodoListView
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductView
  },
  {
    path: '/simple-todo',
    name: 'SimpleTodo',
    component: SimpleTodoView
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCartView
  },
  {
    path: '/item-list',
    name: 'ItemList',
    component: ItemList
  },
  {
    path: '/todo-list',
    name: 'TodoList',
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
