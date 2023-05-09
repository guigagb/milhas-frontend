import { routes } from '@/router'

export const pages = () => { return routes.filter(page => page?.meta?.title) }

export const tabsName = state => state.tabs.map((tab) => {

  const route = routes.find(page => page?.meta?.title == tab)
  return route.name

})