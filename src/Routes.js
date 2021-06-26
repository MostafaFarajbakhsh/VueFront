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
        component: () => import('@/views/dashboard/pages/Dashboard/Dashboard'),
      },
       // Dashboard
       {
        name: 'کاربران',
        path: '/dashboard/users',
        component: () => import('@/views/dashboard/pages/Dashboard/Pages/UserProfiles'),
      },
      {
        name: 'متولیان',
        path: '/dashboard/generations',
        component: () => import('@/views/dashboard/pages/Dashboard/Pages/Generations'),
      },
      {
        name: 'پرونده ها',
        path: '/dashboard/folders',
        component: () => import('@/views/dashboard/pages/Dashboard/Pages/UserFolders'),
      },
      {
        name: 'نامه ها',
        path: '/dashboard/letters',
        component: () => import('@/views/dashboard/pages/Dashboard/Pages/Letters'),
      },
      // Pages
      {
        name: 'پروفایل کاربری',
        path: 'profile',
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
      // Tables Users
      {
        name: 'مدیریت کاربران',
        path: 'manageusers',
        component: () => import('@/views/dashboard/tables/UserTables'),
      },
      // Tables Letters
      {
        name: 'مدیریت نامه ها',
        path: 'manageletters',
        component: () => import('@/views/dashboard/tables/LetterTables'),
      },
      // Tables Folders
      {
        name: 'مدیریت پرونده ها',
        path: 'managefolders',
        component: () => import('@/views/dashboard/tables/FolderTables'),
        // children: [
        //   {
        //     name: 'مدیریت پرونده',
        //     path: 'folder/:Id',
        //     component: () => import('@/views/dashboard/pages/Folder/Folder'),
        //   },
        // ],
      },
      // Tables Folders
      {
        name: 'مدیریت پرونده',
        path: 'folders/folder/:Id',
        component: () => import('@/views/dashboard/pages/Folder/Folder'),
      },
      {
        name: 'مدیریت تعرفه اوقاف',
        path: 'manageoghafcosts',
        component: () => import('@/views/dashboard/tables/OghafCostTables'),
      },
      // Tables Parts
      {
        name: 'مدیریت قطعات زمین',
        path: 'manageparts',
        component: () => import('@/views/dashboard/tables/PartTables'),
      },
      // Tables Gen
      {
        name: ' نسل سفیداری ',
        path: 'managegenerations',
        component: () => import('@/views/dashboard/tables/GeneretaionTables'),
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
