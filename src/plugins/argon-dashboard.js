import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/scss/argon.scss";
import globalComponents from "@/plugins/globalComponents";
import globalDirectives from "@/plugins/globalDirectives";
import SidebarPlugin from "@/components/SidebarPlugin/index"
import NotificationPlugin from "@/components/NotificationPlugin/index"

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(SidebarPlugin);
    Vue.use(NotificationPlugin);
  }
};
