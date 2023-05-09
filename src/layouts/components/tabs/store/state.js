const pageActiveDefault = {
  name: 'Home',
  meta: {
    icon: 'mdi-home',
    title: 'Home'
  }
}

export default {
  pageActiveDefault,
  tabDefault: pageActiveDefault.name,
  tabs: [pageActiveDefault.name],
  pageActive: pageActiveDefault,
}