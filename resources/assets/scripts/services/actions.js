import { apiRequest } from './api'

const actions = {
  getUsers: async(store) => {
    const res = await apiRequest('GET', 'users')
    store.setState({ users: res.users, isLoading: false, usersLoaded: true })
  },

  createUser: async(store, user) => {
    const res = await apiRequest('POST', 'users', user)
    await store.actions.getUsers()
  },

  getCompanies: async(store) => {
    const res = await apiRequest('GET', 'companies')
    store.setState({ companies: res.companies, isLoading: false, companiesLoaded: true })
  },

  createCompany: async(store, company) => {
    const res = await apiRequest('POST', 'companies', company)
    await store.actions.getCompanies()
  },

  getProfessionals: async(store) => {
    const res = await apiRequest('GET', 'professionals')
    store.setState({ professionals: res.professionals, isLoading: false, professionalsLoaded: true })
  },

  createProfessional: async(store, professional) => {
    console.log(professional)
    const res = await apiRequest('POST', 'professionals', professional)
    await store.actions.getProfessionals()
  },

  getEvents: async(store) => {
    const res = await apiRequest('GET', 'events')
    store.setState({ events: res.events, isLoading: false, eventsLoaded: true })
  },

  getProducts: async(store) => {
    const res = await apiRequest('GET', 'products')
    store.setState({ products: res.products, isLoading: false, productsLoaded: true })
  },

  createProduct: async(store, product) => {
    const res = await apiRequest('POST', 'products', product)
    await store.actions.getProducts()
  },

  getOrders: async(store) => {
    const res = await apiRequest('GET', 'orders')
    store.setState({ orders: res.orders, isLoading: false, ordersLoaded: true })
  },

  createOrder: async(store, order) => {
    const res = await apiRequest('POST', 'orders', order)
    await store.actions.getOrders()
  },

  getInventories: async(store) => {
    const res = await apiRequest('GET', 'inventories')
    store.setState({ inventories: res.inventories, isLoading: false, inventoriesLoaded: true })
  },

  createInventory: async(store, inventory) => {
    const res = await apiRequest('POST', 'inventories', inventory)
    await store.actions.getInventories()
  },

  getProjects: async(store) => {
    const res = await apiRequest('GET', 'projects')
    store.setState({ projects: res.projects, isLoading: false, projectsLoaded: true })
  },

  createProject: async(store, project) => {
    const res = await apiRequest('POST', 'projects', project)
    await store.actions.getProjects()
  },

  getProfessions: async(store) => {
    const res = await apiRequest('GET', 'professions')
    store.setState({ professions: res.professions, isLoading: false, professionsLoaded: true })
  },

  getCities: async(store) => {
    const res = await apiRequest('GET', 'cities')
    store.setState({ cities: res.cities, isLoading: false, citiesLoaded: true })
  },

  getVenues: async(store) => {
    const res = await apiRequest('GET', 'venues')
    store.setState({ venues: res.venues, isLoading: false, venuesLoaded: true })
  },

  getSuppliers: async(store) => {
    const res = await apiRequest('GET', 'suppliers')
    store.setState({ suppliers: res.suppliers, isLoading: false, suppliersLoaded: true })
  },

  createSupplier: async(store, supplier) => {
    const res = await apiRequest('POST', 'suppliers', supplier)
    await store.actions.getSuppliers()
  },

  showSuccess: (store) => {
    store.setState({ showSuccess: !store.state.showSuccess })
  },

  showError: (store) => {
    store.setState({ showError: !store.state.showError })
  }

}

export default actions
