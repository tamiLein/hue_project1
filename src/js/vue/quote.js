import Vue from 'vueCommon';
import Quote from './quote.vue';

new Vue({
    el: '#quote',
    components: { quote: Quote },
    template: `<quote></quote>`,
});

