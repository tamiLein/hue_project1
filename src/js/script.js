var app = new Vue({
    el: '#app',
    data: {
        name: localStorage.getItem('name'),
        greeting: 'Hello'
    },
    methods: {
        changeName: function (event) {
            this.name = event.target.value;
            localStorage.setItem('name', this.name)
        },

    },

    mounted: function () {
        var date = new Date();
        var hour = date.getHours();
        var that = this;
        if(hour < 11 && hour > 4){
            that.greeting = 'Good Morning, '
        }else if(hour < 14){
            that.greeting = "Hello, "
        }else if(hour < 18){
            that.greeting ="Good Afternoon, "
        }else if(hour < 21){
            that.greeting ="Good Evening, "
        }else if(hour < 24){
            that.greeting ="Good Night, "
        }else{
            that.greeting ="ZzZzZz, "
        }
    },

});

var clock = new Vue({
    el: '#clock',
    data: {
        clock: ''
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
        },1000)

    },
})

var apiKey = '0c606526ad06da0a4c4246eb0282da0a';
var zipCode = '4511';
var country = 'at';

var weather = new Vue({
    el: '#weather',
    data: {
        zipCode: '4511',
        country: 'at',
        show: false,
        weather: '',
        temp: '',
        clouds: '',
        info: '',
        img: ''
    },
    methods: {
        changePosition: function (event) {
            this.zipCode = event.target.value;
            //event.target.value = "";
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
            });

        }
    },
    mounted: function () {
        var that = this;
        that.loadWeather();
    },

});


var workout = new Vue({
    el: '#workout',
    data: {
        description: '',
        muscles: '',
        name: '',
        start:''
    },
    mounted: function() {
            var that = this;

            var random = Math.floor(Math.random()*2);
            /*var url = 'https://wger.de/api/v2/exercise/?format=json&language=1';
            console.log(url);

            $.get( url, function( data ) {
                var exercise = data.results[Math.floor((Math.random()*20)+1)];
                that.name = exercise['name'];
                that.description = exercise['description'];
                that.description = that.description.replace(/<(?:.|\n)*?>/gm, '');
                that.muscles = exercise['muscles'];
            });*/

            var url = "../json/workout.json";
            $.get(url, function(data){
                console.log(data);
                that.name = data.exercises[random].name;
                that.start = data.exercises[random].startPosition;
                that.description = data.exercises[random].description;
                that.muscles = data.exercises[random].muscles;
            });
        }

});

var zitat = new Vue({
    el: '#zitat',
    data:{
        text: ''
    }, mounted: function(){
            var that = this;
            //var url = 'http://www.zitate-online.de/zufallszitat.js.php';
            var url = 'https://taeglicheszit.at/zitat-api.php?format=string';

            $.get(url, function(data){
                var jsondata = JSON.stringify(data);
               that.text = data;
            });
    }
});

var fruehstueck = new Vue({
    el: '#fruehstueck',
    data: {
        sleep: '7',
        muede: '1',
        work: '4',
        workToDo: ['überhaupt nichts', 'nichts', 'wenig', 'kaum', 'genau richtig', 'etwas mehr', 'viel mehr', 'extrem viel', 'unüberschaubar']
    },
});