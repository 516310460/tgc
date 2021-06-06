import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "coinpool",
    storage: window.localStorage
  })(store);
};
