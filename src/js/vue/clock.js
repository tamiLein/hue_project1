import Vue from 'vueCommon';
import Clock from './clock.vue';

new Vue({
    el: '#clock',
    components: { clock: Clock },
    template: `<clock></clock>`,
});

