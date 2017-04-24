<template lang="html">
    <div id="clock">
        {{ clock }}
        <h1>{{greeting}} <input v-model="name" v-on:keyup.enter="changeName"></h1>
    </div>
</template>


<script>

    module.exports = {
        data: function() {
            return {
                clock: '',
                name: localStorage.getItem('name'),
                greeting: 'Hello'
            }
        },
        methods: {
            changeName: function (event) {
                this.name = event.target.value;
                event.target.blur();
                localStorage.setItem('name', this.name)
            },

        },
        mounted: function () {
            var that = this;
            setInterval(function () {
                var date = new Date();
                var hour = date.getHours();
                if(hour<10) hour = '0' + hour
                var minutes = date.getMinutes();
                if(minutes<10) minutes = '0' + minutes
                var sec = date.getSeconds();
                if(sec<10) sec = '0' + sec
                var digital = hour + ':' + minutes + ':' + sec;
                that.clock = digital;
            },1000);

            var date = new Date();
            var hour = date.getHours();

            if(hour < 11 && hour > 4){
                that.greeting = 'Guten Morgen, '
            }else if(hour < 18){
                that.greeting = "Hallo, "
            }else if(hour < 20){
                that.greeting ="Guten Abend, "
            }else if(hour < 23){
                that.greeting ="Gute Nacht, "
            }else{
                that.greeting ="ZzZzZz, "
            }

        },
    };


</script>