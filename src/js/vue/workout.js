/**
 * Created by Tamara on 22.04.2017.
 */
import Vue from 'vueCommon';
import Workout from './workout.vue';

new Vue({
    el: '#workout',
    components: { workout: Workout },
    template: `<workout></workout>`,
});


