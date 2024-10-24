import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About | Countries info',
      },
    },
    {
      path: '/country/:code',
      name: 'Single Country Details Page',
      component: () => import('../views/SingleCountryView.vue'),
    },
  ],
})

router.beforeEach(to => {
  let title
  switch (to.name) {
    case 'Single Country Details Page':
      title = `${to.query?.name ?? 'Unknown'} | Country details`
      break
    default:
      title = to.meta.title ?? ''
      break
  }

  document.title = title || import.meta.env.VITE_DEFAULT_APP_TITLE;
})

export default router
