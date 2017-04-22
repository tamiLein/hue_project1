/**
 * Created by Tamara on 22.04.2017.
 */
import Vue from 'vueCommon';
import App from './chat.vue';

Vue.filter('date', function (value) {
    //console.log(value);
    let date = new Date(value);
    let days = date.getDate();
    let months = date.getMonth() + 1;
    let years = date.getFullYear();
    return [days, months, years].join('.');
});

new Vue({
    el: '#firebase',
    components: { app: App },
    template: `<app></app>`
});