import Vue from 'vue';
import App from './App.vue';
import './theme.scss';
import './styles.scss';
import router from './router';
import store from './store.js';
import xhrCachedLoader from "./xhr.js";
require("cassproject");
Vue.use(require('vue-moment'));
Vue.use(require('vue-infinite-scroll'));

EcRepository.caching = true;
window.repo = new EcRepository();
window.repo.selectedServer = "https://dev.cassproject.org/api/";

global.jsonld = require('jsonld');

Vue.config.productionTip = false;
// Vue.config.silent = true;
Vue.config.warnHandler = function(msg, vm, trace) {
    if (msg === 'Invalid prop: type check failed for prop "clickToLoad". Expected Boolean, got String with value "true".') return;
    if (msg === 'Avoid using non-primitive value as key, use string/number value instead.') return;
    if (msg === "Duplicate keys detected: '[object Object]'. This may cause an update error.") return;
    console.error(("[Vue warn]: " + msg + trace));
    // `trace` is the component hierarchy trace
};

jsonld.documentLoader = xhrCachedLoader();

EcRemote.getExpectingObject("", "schema.jsonld", function(context) {
    store.commit('rawSchemata', {id: "http://schema.org", obj: context});
    store.commit('rawSchemata', {id: "https://schema.org", obj: context});
    store.commit('rawSchemata', {id: "http://schema.org/", obj: context});
    store.commit('rawSchemata', {id: "https://schema.org/", obj: context});
    store.commit('rawSchemata', {id: "https://schema.org/docs/jsonldcontext.jsonld", obj: context});


    jsonld.expand(context, function(err, expanded) {
        if (err == null) {
            store.commit('schemaFallback', expanded[0]["@graph"]);
        } else {
            console.error(err);
        }
    });

    EcRemote.getExpectingObject("", "ctdl.json", function(context) {
        store.commit('rawSchemata', {id: "http://credreg.net/ctdl/schema/context/json", obj: context});

        jsonld.expand(context, function(err, expanded) {
            if (err == null) {
                store.commit('schemaFallback', expanded);
            } else {
                console.error(err);
            }
        });

        EcRemote.getExpectingObject("", "ctdlasn.json", function(context) {
            store.commit('rawSchemata', {id: "http://credreg.net/ctdlasn/schema/context/json", obj: context});

            jsonld.expand(context, function(err, expanded) {
                if (err == null) {
                    store.commit('schemaFallback', expanded);
                } else {
                    console.error(err);
                }
            });

            window.app = new Vue({
                router,
                store,
                render: h => h(App)
            }).$mount('#app');
        }, console.error);
    }, console.error);
}, console.error);