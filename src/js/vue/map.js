

import Vue from 'vueCommon';
import Map from './map.vue';

new Vue({
    el: '#vue-map',
    components: { trafficmap: Map },
    template: `<trafficmap></trafficmap>`,
});
