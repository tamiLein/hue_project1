/**
 * Created by Tamara on 22.04.2017.
 */
import Vue from 'vueCommon';
import Weather from './weather.vue';

new Vue({
    el: '#weather',
    components: { weather: Weather },
    template: `<weather></weather>`,
});


/**
 * Created by Tamara on 22.04.2017.
 */
