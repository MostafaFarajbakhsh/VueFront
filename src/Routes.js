export const Routes = [
  {
    path: '/',
    component: () => import('@/views/Index/Index'),
  },
  {
    path: '/signup',
    component: () => import('@/views/Acount/SignUp'),
  },
  {
    path: '/login',
    component: () => import('@/views/Acount/Login'),
  },
  {
    path: '/Dashboard',
    component: () => import('@/views/dashboard/Index'),
    children: [
      // Dashboard
      {
        name: 'داشبورد',
        path: '',
        component: () => import('@/views/dashboard/Dashboard'),
      },
      // Pages
      {
        name: 'پروفایل کاربری',
        path: 'pages/user',
        component: () => import('@/views/dashboard/pages/UserProfile'),
      },
      {
        name: 'Notifications',
        path: 'components/notifications',
        component: () => import('@/views/dashboard/component/Notifications'),
      },
      {
        name: 'Icons',
        path: 'components/icons',
        component: () => import('@/views/dashboard/component/Icons'),
      },
      {
        name: 'Typography',
        path: 'components/typography',
        component: () => import('@/views/dashboard/component/Typography'),
      },
      // Tables
      {
        name: 'Regular Tables',
        path: 'tables/regular-tables',
        component: () => import('@/views/dashboard/tables/RegularTables'),
      },
      // Maps
      {
        name: 'Google Maps',
        path: 'maps/google-maps',
        component: () => import('@/views/dashboard/maps/GoogleMaps'),
      },
      // Upgrade
      {
        name: 'Upgrade',
        path: 'upgrade',
        component: () => import('@/views/dashboard/Upgrade'),
      },
    ],
  },
]
