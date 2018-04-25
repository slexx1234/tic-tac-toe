import Vue from 'vue';
import components from '../components';

for(let name in components) {
    Vue.component(name, components[name]);
}
