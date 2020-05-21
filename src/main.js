import Vue from 'vue';
import App from './App.vue';
import './scss/theme.scss';
import './scss/styles.scss';
import router from './router';
import Vuex from 'vuex';
import Modal from './plugins/modalPlugin.js';
import Clipboard from 'v-clipboard';
import store from './store/index.js';
var VueScrollTo = require('vue-scrollto');
require("cassproject");
Vue.use(Modal);
Vue.use(require('vue-moment'));
Vue.use(require('vue-infinite-scroll'));
Vue.use(Vuex);
Vue.use(Clipboard);
Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: -50,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
});

EcRepository.caching = true;
window.repo = new EcRepository();
window.repo.selectedServer = "https://dev.api.cassproject.org/api/";

global.jsonld = require('jsonld');
global.base64 = require('base64-arraybuffer');
global.UUID = require('pure-uuid');

Vue.config.productionTip = false;
// Vue.config.silent = true;
Vue.config.warnHandler = function(msg, vm, trace) {
    if (msg === 'Invalid prop: type check failed for prop "clickToLoad". Expected Boolean, got String with value "true".') return;
    if (msg === 'Avoid using non-primitive value as key, use string/number value instead.') return;
    if (msg === "Duplicate keys detected: '[object Object]'. This may cause an update error.") return;
    console.error(("[Vue warn]: " + msg + trace));
    // `trace` is the component hierarchy trace
};

window.app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
