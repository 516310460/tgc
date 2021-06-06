import Vue from "vue";
import Loading from "../components/Public/page-loading";
import btnLoading from "../components/Public/btn-loading";

const Mask = Vue.extend(Loading);
const btnMask = Vue.extend(btnLoading);

const directive = {};
directive.install = Vue => {
  if (Vue.prototype.$isServer) return;

  const toggleLoading = (el, binding) => {
    if (binding.value) {
      el.appendChild(el.mask);
      el.domInserted = true;
    } else {
      el.mask.style.opacity = 0;
      setTimeout(() => {
        el.mask.parentNode && el.mask.parentNode.removeChild(el.mask);
      }, 200);
    }
  };
  Vue.directive("buybit-loading", {
    bind(el, binding, vnode, oldVnode) {
      const mask = new Mask({
        el: document.createElement("div")
      });
      el.instance = mask;
      el.mask = mask.$el;
      binding.value && toggleLoading(el, binding);
    },
    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
          el.mask.parentNode &&
          el.mask.parentNode.removeChild(el.mask);
      }
    }
  });

  Vue.directive("buybit-btn-loading", {
    bind(el, binding, vnode, oldVnode) {
      const mask = new btnMask({
        el: document.createElement("div")
      });
      el.instance = mask;
      el.mask = mask.$el;
      binding.value && toggleLoading(el, binding);
    },
    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
          el.mask.parentNode &&
          el.mask.parentNode.removeChild(el.mask);
      }
    }
  });

  Vue.directive("focus", {
    inserted: function(el) {
      el.focus();
    }
  });
};

Vue.use(directive);
export default directive;
