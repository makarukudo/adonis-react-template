import Dashboard from './pages/Dashboard'
import Users from './pages/users/index'
import Professionals from './pages/professionals/index'
import Companies from './pages/companies/index'
import Events from './pages/events/index'
import Products from './pages/products/index'
import Orders from './pages/orders/index'
import Inventories from './pages/inventories/index'
import Projects from './pages/projects/index'

const routeLinks = [
  {
    key: 'dashboard',
    path: '/',
    icon: 'user',
    label: 'Dashboard',
    exact: true,
    component: Dashboard
  },
  {
    key: 'users',
    path: '/users',
    icon: 'team',
    label: 'Users',
    component: Users
  },
  {
    key: 'pros',
    path: '/professionals',
    icon: 'usergroup-add',
    label: 'Professionals',
    component: Professionals
  },
  {
    key: 'companies',
    path: '/companies',
    icon: 'shop',
    label: 'Companies',
    component: Companies
  },
  {
    key: 'events',
    path: '/events',
    icon: 'calendar',
    label: 'Events',
    component: Events
  },
  {
    key: 'products',
    path: '/products',
    icon: 'project',
    label: 'Products',
    component: Products
  },
  {
    key: 'orders',
    path: '/orders',
    icon: 'shopping-cart',
    label: 'Orders',
    component: Orders
  },
  {
    key: 'projects',
    path: '/projects',
    icon: 'project',
    label: 'Projects',
    component: Projects
  },
  {
    key: 'inventories',
    path: '/inventories',
    icon: 'ordered-list',
    label: 'Inventories',
    component: Inventories
  }

]

export default routeLinks
