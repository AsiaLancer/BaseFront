import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/HelloWorld.vue')  // 使用相对路径
  },
  {
    path: '/card-scroll',
    name: 'CardScroll',
    component: () => import('../components/CardScorll.vue')  // 使用相对路径
  },
  {
    path: '/html',
    name: 'Html',
    component: () => import('../components/Html.vue')  // 使用相对路径
  },
  {
    path: '/parallax-scroll',
    name: 'ParallaxScroll',
    component: () => import('../components/ParallaxScroll.vue')  // 使用相对路径
  },
  {
    path: '/gradient-rotation',
    name: 'GradientRotation',
    component: () => import('../components/GradientRotation.vue')  // 使用相对路径
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: () => import('../components/Sidebar.vue')  // 使用相对路径
  },
  {
    path: '/nav-bar',
    name: 'NavBar',
    component: () => import('../components/TagList.vue')  // 使用相对路径
  },
  {
    path: '/display-card',
    name: 'DisplayCard',
    component: () => import('../components/DisplayCard.vue')  // 使用相对路径
  },
  {
    path: '/waterfall-flow',
    name: 'WaterfallFlow',
    component: () => import('../components/WaterfallFlow.vue')  // 使用相对路径
  },
  {
    path: '/waterfall-flow-with-a',
    name: 'WaterfallFlowWithA',
    component: () => import('../components/WaterfallFlowWithA.vue')  // 使用相对路径
  },
  {
    path: '/lubashop-index',
    name: 'LubaShopIndex',
    component: () => import('../views/LubaShopIndex.vue')  // 使用相对路径
  },
  {
    path: '/rabbitshop-index',
    name: 'RabbitShopIndex',
    component: () => import('../views/RabbitShopIndex.vue')  // 使用相对路径
  },
  {
    path: '/cat-scroll',
    name: 'CatScroll',
    component: () => import('../components/CatScorll.vue')  // 使用相对路径
  },
  {
    path: '/nav-bar-list',
    name: 'NavBarList',
    component: () => import('../components/NavBarList.vue')  // 使用相对路径
  },
  {
    path: '/img-list',
    name: 'ImgList',
    component: () => import('../components/ImgList.vue')  // 使用相对路径
  },
  {
    path: '/flow-gradient',
    name: 'FlowGradient',
    component: () => import('../components/FlowGradient.vue')  // 使用相对路径
  },
  {
    path: '/mhtml',
    name: 'MHtml',
    component: () => import('../components/mobie/MHtml.vue')  // 使用相对路径
  },
  {
    path: '/mr-login',
    name: 'MRabbitShopLogin',
    component: () => import('../components/mobie/MRabbitShopLogin.vue')  // 使用相对路径
  },
  {
    path: '/tts',
    name: 'TTS',
    component: () => import('../views/IndexTTSView.vue')  // 使用相对路径
  },
  {
    path: '/design-code-index',
    name: 'DesignCodeIndex',
    component: () => import('../components/DesignCodeIndex.vue')  // 使用相对路径
  },
  {
    path: '/bootstrap-learn',
    name: 'BootstrapLearn',
    component: () => import('../components/BoostreapLearn.vue')  // 使用相对路径
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router