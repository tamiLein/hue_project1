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
        console.log("mounted app");
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

        console.log(that.greeting);
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
        directionsDisplay: '',
        origin: '',
        destination: '',
        originId: 'ChIJTYWZ-pWVc0cRxHV5VywpU3w',
        destinationId: 'ChIJGzciup-mc0cR29nSjeigZro',
        mode: 'DRIVING',
        duration: ''
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

            var that = this;

            that.origin = new google.maps.LatLng(48.309745, 14.284308);
            that.destination = new google.maps.LatLng(48.368346, 14.515042);

            var map = new google.maps.Map(document.getElementById('map'), {
                center: that.origin,
                scrollwheel: false,
                zoom: 7
            });

            this.directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            this.getDirection(that);
            this.loadTravelTime(that);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
                searchBoxOrigin.setBounds(map.getBounds());
            });

            // Create the search box and link it to the UI element.
            var originInput = document.getElementById('map-origin-input');
            var searchBoxOrigin = new google.maps.places.SearchBox(originInput);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);

            var destinationInput = document.getElementById('map-destination-input');
            var searchBoxDestination = new google.maps.places.SearchBox(destinationInput);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);


            searchBoxOrigin.addListener('places_changed', function() {
                var places = searchBoxOrigin.getPlaces();

                if (places.length == 0) {
                    return;
                }

                that.origin = places[0].geometry.location;
                that.originId = places[0].place_id;

                that.getDirection(that);
                that.loadTravelTime(that);
            });

            searchBoxDestination.addListener('places_changed', function() {
                var places = searchBoxDestination.getPlaces();

                if (places.length == 0) {
                    return;
                }

                that.destination = places[0].geometry.location;
                that.destinationId = places[0].place_id;

                that.getDirection(that);
                that.loadTravelTime(that);
            });

        },
        getDirection: function(that) {
            // Set destination, origin and travel mode.
            var request = {
                destination: that.destination,
                origin: that.origin,
                travelMode: that.mode
            };

            // Pass the directions request to the directions service.
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
                if (status == 'OK') {
                    // Display the route on the map.
                    that.directionsDisplay.setDirections(response);
                }
            });
        },
        loadTravelTime: function(that) {
            var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=place_id:'+that.originId+'&destination=place_id:'+that.destinationId+'&key='+mapApiKey;

            console.log(url);

            $.get( url, function( data ) {
                console.log(data.routes[0].legs[0].duration.text);
                console.log(data);
                that.duration = data.routes[0].legs[0].duration.text;

            });
        }
    },
    mounted: function () {
        //this.loadMap();
        this.loadDirection();
        this.loadTravel();
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



