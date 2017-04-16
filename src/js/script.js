var app = new Vue({
    el: '#app',
    data: {
        name: localStorage.getItem('name'),
        greeting: 'Hello'
    },
    methods: {
        changeName: function (event) {
            this.name = event.target.value;
            event.target.blur();
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

var mapApiKey = 'AIzaSyCUfPaTKo2A5d5ImrMlYXNE4RW3jhueOPc';

var apiKey = '0c606526ad06da0a4c4246eb0282da0a';
var zipCode = '4511';
var country = 'at';

var weather = new Vue({
    el: '#weather',
    data: {
        zipCode: localStorage.getItem('zip'),
        country: 'at',
        show: false,
        weather: '',
        temp: localStorage.getItem('temp'),
        clouds: '',
        info: localStorage.getItem('info'),
        img: localStorage.getItem('img')
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

});

var demo = new Vue({
    el: '#vue-map',
    data: {
        travel: ''
    },
    methods: {
        loadTravel: function() {
            //var url = 'https://maps.googleapis.com/maps/api/js?key='+mapApiKey+'&libraries=places';

            //var url = 'https://www.google.com/maps/embed/v1/directions?key='+mapApiKey+'&origin=Oslo+Norway&destination=Telemark+Norway';

            var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key='+mapApiKey;

            $.get( url, function( data ) {
                console.log(data);
                this.travel = data;
            });
        },
        loadMap: function() {


            var myLatLong = new google.maps.LatLng(48.368346, 14.515042);

            var myOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: myLatLong
            };

            var map = new google.maps.Map(document.getElementById("map"), myOptions);

            var marker = new google.maps.Marker({
                position: myLatLong,
                map: map,
                title: 'Campus Hagenberg'
            });

            // Create the search box and link it to the UI element.
            var input = document.getElementById('map-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        },
        loadDirection: function() {
            console.log("direction");

            var origin = new google.maps.LatLng(48.309745, 14.284308);
            var destination = new google.maps.LatLng(48.368346, 14.515042);

            var map = new google.maps.Map(document.getElementById('map'), {
                center: origin,
                scrollwheel: false,
                zoom: 7
            });

            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            // Set destination, origin and travel mode.
            var request = {
                destination: destination,
                origin: origin,
                travelMode: 'DRIVING'
            };

            // Pass the directions request to the directions service.
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
                if (status == 'OK') {
                    // Display the route on the map.
                    directionsDisplay.setDirections(response);
                }
            });
        }
    },
    mounted: function () {
        this.loadMap();
        this.loadTravel();
    }

});

var mapTest = new Vue({
    el: '#mapTest',
    data: {
        origin: 'Linz',
        destination: 'Hagenberg',
        mode: 'driving',
        duration: '??'
    },

    methods: {
      loadMyMap: function(){
          var that = this;
          var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=AIzaSyAXG3MaN8NW0wEURJ6BBVDjPjqyo4GnkpU';

          console.log(url);

          $.get( url, function( data ) {
              console.log("get");
              console.log(data.routes[0].legs[0].duration.text);
              console.log(data);
              that.duration = data.routes[0].legs[0].duration.text;
              that.duration = '22';
          });
      }
    },
    mounted: function(){
        console.log("mounted");
        this.loadMyMap();
    }
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

            var random = Math.floor(Math.random()*5);
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
        sleep: '1',
        muede: '1',
        work: '1',
        workToDo: ['überhaupt nichts', 'nichts', 'wenig', 'kaum', 'genau richtig', 'etwas mehr', 'viel mehr', 'extrem viel', 'unüberschaubar']
    },
});

/*var important = new Vue({
   el: '#important',
    data:{
       items: []
    }, methods:{
           add: function(event){
               this.items.push(event.target.value);
               event.target.value = '';
           },
        remove: function(event){
             var index = this.items.indexOf(event.target.html);
             console.log(index);
             delete this.items[index];
        }
    }
});*/