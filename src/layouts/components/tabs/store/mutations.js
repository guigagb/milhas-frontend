export const setTabs = (state, value) => {
  if (Array.isArray(value))
    state.tabs = value;
  else
    state.tabs.push(value);
};

export const setPageActive = (state, value) => {
  state.pageActive = value;
};

export const resetTabs = (state) => {
  state.tabs = [state.tabDefault];
  state.pageActive = state.pageActiveDefault;
};

export const openPage = (state, { pages, title }) => {
  if (!state.tabs.includes(title))
    state.tabs.push(title);
  state.pageActive = pages.find(page => page.meta.title == title);
  window.location = '#' + state.pageActive.name;
};

export const closePage = async (state, { pages, title }) => {
  const indexTab = state.tabs.findIndex(tab => tab == title);
  state.tabs.splice(indexTab, 1);
  if (state.tabs.length == 0)
    state.tabs.push(state.tabDefault);
  state.pageActive = pages.find(page => page.meta.title == state.tabs[0]);
  window.location = '#' + state.pageActive.name;
};