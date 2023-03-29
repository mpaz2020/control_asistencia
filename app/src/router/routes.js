import MainLayout from 'layouts/MainLayout.vue'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/asistencias',
        name: 'Asistencias',
        component: () => import('pages/AsistenciasPage.vue'),
        meta: {
          requiresAuth: true,
          title: 'Asistencias',
        },
      },
      {
        path: '/reportes',
        name: 'Reportes',
        component: () => import('pages/ReportesPage.vue'),
        meta: {
          requiresAuth: true,
          title: 'Reportes',
        },
      },

      {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import('pages/UsuariosPage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Usuarios',
        },
      },
      {
        path: '/usuarios/new',
        name: 'usuario',
        component: () => import('pages/UsuarioDetallePage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Usuario',
        },
      },
      {
        path: '/usuarios/edit',
        component: () => import('pages/UsuarioDetallePage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Usuario',
        },
      },
      {
        path: '/tipo-usuario',
        name: 'tipo-usuarios',
        component: () => import('pages/TipoUsuarioPage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Tipo Usuarios',
        },
      },
      {
        path: '/tipo-usuario/new',
        name: 'tipo-usuario',
        component: () => import('pages/TipoUsuarioDetallePage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Tipo Usuario',
        },
      },
      {
        path: '/departamento',
        name: 'departamentos',
        component: () => import('pages/DepartamentoPage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Departamentos',
        },
      },
      {
        path: '/departamento/new',
        name: 'departamento',
        component: () => import('pages/DepartamentoDetallePage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Departamento',
        },
      },
    ],
  },
  {
    path: '/asistencia',
    component: () => import('src/pages/AsistenciaPage.vue'),
  },
  {
    path: '/login',
    component: () => import('src/pages/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
