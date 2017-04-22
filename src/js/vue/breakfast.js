/**
 * Created by Tamara on 22.04.2017.
 */

import Vue from 'vueCommon';
import Breakfast from './breakfast.vue';

new Vue({
    el: '#breakfast',
    components: { breakfast: Breakfast },
    template: `<span><breakfast></breakfast></span>`,
});
