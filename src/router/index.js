import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const base4Learns = [
  {
    path: '/card-scroll',
    name: 'CardScroll',
    component: () => import('@/components/bases/CardScorll.vue')  // 使用相对路径
  },
  {
    path: '/html',
    name: 'Html',
    component: () => import('@/components/bases/Html.vue')  // 使用相对路径
  },
  {
    path: '/parallax-scroll',
    name: 'ParallaxScroll',
    component: () => import('@/components/bases/ParallaxScroll.vue')  // 使用相对路径
  },
  {
    path: '/gradient-rotation',
    name: 'GradientRotation',
    component: () => import('@/components/bases/GradientRotation.vue')  // 使用相对路径
  },
  {
    path: '/sidebarexe',
    name: 'SidebarEXE',
    component: () => import('@/components/bases/SidebarEXE.vue')  // 使用相对路径
  },
  {
    path: '/nav-bar',
    name: 'NavBar',
    component: () => import('@/components/bases/TagList.vue')  // 使用相对路径
  },
  {
    path: '/display-card',
    name: 'DisplayCard',
    component: () => import('@/components/bases/DisplayCard.vue')  // 使用相对路径
  },
  {
    path: '/waterfall-flow',
    name: 'WaterfallFlow',
    component: () => import('@/components/bases/WaterfallFlow.vue')  // 使用相对路径
  },
  {
    path: '/waterfall-flow-with-a',
    name: 'WaterfallFlowWithA',
    component: () => import('@/components/bases/WaterfallFlowWithA.vue')  // 使用相对路径
  }, {
    path: '/cat-scroll',
    name: 'CatScroll',
    component: () => import('@/components/bases/CatScorll.vue')  // 使用相对路径
  },
  {
    path: '/nav-bar-list',
    name: 'NavBarList',
    component: () => import('@/components/bases/NavBarList.vue')  // 使用相对路径
  },
  {
    path: '/img-list',
    name: 'ImgList',
    component: () => import('@/components/bases/ImgList.vue')  // 使用相对路径
  },
  {
    path: '/flow-gradient',
    name: 'FlowGradient',
    component: () => import('@/components/bases/FlowGradient.vue')  // 使用相对路径
  }, {
    path: '/bootstrap-learn',
    name: 'BootstrapLearn',
    component: () => import('@/components/bases/BoostreapLearn.vue')  // 使用相对路径
  },
  {
    path: '/need-learn',
    name: 'NeedLearn',
    component: () => import('@/components/bases/VNeedLearn.vue')  // 使用相对路径
  },
  {
    path: '/new-need',
    name: 'NewNeed',
    component: () => import('@/components/bases/NewNeedLearn.vue')  // 使用相对路径
  },
]

const viewRoutes = [
  {
    path: '/rabbit-shop-index',
    name: 'RabbitShopIndex',
    component: () => import('@/views/RabbitShopIndex.vue'),  // 使用相对路径
    meta: { title: '兔子商店' }
  },
  {
    path: '/lubashop-index',
    name: 'LubaShopIndex',
    component: () => import('@/views/LubaShopIndex.vue')  // 使用相对路径
  },
  {
    path: '/mhtml',
    name: 'MHtml',
    component: () => import('@/views/mobie/MHtml.vue')  // 使用相对路径
  },
  {
    path: '/mr-login',
    name: 'MRabbitShopLogin',
    component: () => import('@/views/mobie/MRabbitShopLogin.vue')  // 使用相对路径
  },
  {
    path: '/tts',
    name: 'TTS',
    component: () => import('@/views/IndexTTSView.vue')  // 使用相对路径
  },
  {
    path: '/design-code-index',
    name: 'DesignCodeIndex',
    component: () => import('@/views/DesignCodeIndex.vue'),  // 使用相对路径
    meta: { title: '课程' }
  },
  {
    path: '/user-info/:id',
    name: 'UserInfo',
    component: () => import('@/components/UserInfo.vue'),  // 使用相对路径
    props: true,
    children: [
      {
        path: 'children1',
        name: 'UserInfoChildren1',
        component: () => import('@/components/UserInfoChildren1.vue')  // 使用相对路径
      },
      {
        path: 'children2',
        name: 'UserInfoChildren2',
        component: () => import('@/components/UserInfoChildren2.vue'),  // 使用相对路径
        props: true
      }
    ]
  },
  {
    path: '/element',
    name: 'ElementPlus4L',
    component: () => import('@/components/bases/ElementPlus4L.vue')  // 使用相对路径
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/curse/Login.vue'), // 使用相对路径
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/curse/Register.vue'), // 使用相对路径
    meta: { title: '注册', hidden: true }
  },
  {
    path: '/curse',
    component: () => import('@/components/layout/curselayout/CurseLayou.vue'), // 使用相对路径
    redirect: '/curse/home',
    children: [
      {
        path: 'home',
        name: 'CurseHome',
        component: () => import('@/views/curse/CurseHome.vue'), // 使用相对路径
        meta: { title: '课程首页' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/curse/errors/NotFound.vue'), // 使用相对路径
    meta: { hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...base4Learns, ...viewRoutes,],
  scrollBehavior(to, from, savedPosition) {
    // 路由切换时滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router