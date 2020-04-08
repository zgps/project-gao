import Vue from 'vue'
import { Button,RadioGroup,Menu,Submenu,MenuItem, MenuItemGroup,RadioButton,Table,TableColumn} from 'element-ui';
import App from './App.vue'
import router from './router/router'
import store from './store'
import http from './http'
import './directives';
import './filters';

Vue.config.productionTip = false;

Vue.use(http);
Vue.component(Button.name, Button);
Vue.component(RadioGroup.name,RadioGroup);
Vue.component(Menu.name,Menu);
Vue.component(Submenu.name,Submenu);
Vue.component(MenuItem.name,MenuItem);
Vue.component(MenuItemGroup.name,MenuItemGroup);
Vue.component(RadioButton.name,RadioButton);
Vue.component(Table.name,Table);
Vue.component(TableColumn.name,TableColumn);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
