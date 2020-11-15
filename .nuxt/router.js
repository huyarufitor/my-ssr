import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e23cdeee = () => interopDefault(import('../pages/blog.vue' /* webpackChunkName: "pages/blog" */))
const _980fda4e = () => interopDefault(import('../pages/blog/comment.vue' /* webpackChunkName: "pages/blog/comment" */))
const _84371c98 = () => interopDefault(import('../pages/blog/_id.vue' /* webpackChunkName: "pages/blog/_id" */))
const _34d4860a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog",
    component: _e23cdeee,
    name: "blog",
    children: [{
      path: "comment",
      component: _980fda4e,
      name: "blog-comment"
    }, {
      path: ":id?",
      component: _84371c98,
      name: "blog-id"
    }]
  }, {
    path: "/",
    component: _34d4860a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
