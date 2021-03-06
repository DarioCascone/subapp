
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'home' },
      { path: '/admin', component: () => import('pages/Admin.vue'), name: 'admin' },
      { path: '/termCondition', name: 'termCondition', component: () => import('pages/TermAndCond.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
