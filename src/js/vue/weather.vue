<template lang="html">
    <div id="weather">
        <div v-if="show">
            <span v-bind:class="['icon', 'icon-'+img]"><span id="temp"><br>{{temp}} C°</span></span>
            <span class="weather-info">{{info}}</span>
        </div>
        Position ändern:
        <input v-model="zipCode" v-on:keyup.enter="changePosition">    </div>
</template>


<script>

    var apiKey = '0c606526ad06da0a4c4246eb0282da0a';
    var zipCode = '4511';
    var country = 'at';

    module.exports = {
        data: function() {
            return {
                zipCode: localStorage.getItem('zip'),
                country: 'at',
                show: false,
                weather: '',
                temp: localStorage.getItem('temp'),
                clouds: '',
                info: localStorage.getItem('info'),
                img: localStorage.getItem('img')
            }
        },
        methods: {
            changePosition: function (event) {
                this.zipCode = event.target.value;
                event.target.blur();
                this.loadWeather();
            },
            loadWeather: function () {
                var that = this;
                that.show = true;

                //var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${country}&appid=${apiKey}&lang=de&units=metric`;

                //var url = 'http://api.openweathermap.org/data/2.5/weather?zip=4511,at&appid=0c606526ad06da0a4c4246eb0282da0a&lang=de&units=metric';
                var url = 'http://api.openweathermap.org/data/2.5/weather?zip='+that.zipCode+',at&appid=0c606526ad06da0a4c4246eb0282da0a&lang=de&units=metric';

                $.get( url, function( data ) {
                    that.weather = data;
                    that.temp = Math.round(data.main.temp);
                    that.clouds = data.clouds.all;
                    that.info = data.weather[0].description;
                    that.img = data.weather[0].icon;
                    localStorage.setItem('temp', that.temp);
                    localStorage.setItem('info', that.info);
                    localStorage.setItem('img', that.img);
                    localStorage.setItem('zip', that.zipCode);

                });



            }
        },
        mounted: function () {
            var that = this;
            that.loadWeather();
        },
    };


</script>