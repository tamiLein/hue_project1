<template lang="html">
    <div id="vue-map">
        <h2>Dein Weg zur Arbeit:</h2>

        <input id="map-origin-input" class="controls" type="text" placeholder="Start">
        <input id="map-destination-input" class="controls" type="text" placeholder="Ziel">
        <div id="map"></div>

        <div id="duration">Aktuelle Fahrtzeit: {{ durationInTraffic }}</div>

        <div v-if="durationInTraffic < duration">
            Du kannst dir noch etwas Zeit lassen. Heute ist weniger Verkehr als &uuml;blich!
        </div>

        <div v-else-if="durationInTraffic > duration">
            Du solltest dich etwas beeilen. Heute ist mehr Verkehr als sonst.
        </div>

        <div v-else>
            Alles wie gewohnt!
        </div>
    </div>
</template>


<script>
    module.exports = {
        data: function() {
            return {
                directionsDisplay: '',
                origin: '',
                destination: '',
                originId: 'ChIJTYWZ-pWVc0cRxHV5VywpU3w',
                destinationId: 'ChIJGzciup-mc0cR29nSjeigZro',
                mode: 'DRIVING',
                duration: 0,
                durationInTraffic: 0
            }
        },
        methods: {
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
                });

                searchBoxDestination.addListener('places_changed', function() {
                    var places = searchBoxDestination.getPlaces();

                    if (places.length == 0) {
                        return;
                    }

                    that.destination = places[0].geometry.location;
                    that.destinationId = places[0].place_id;

                    that.getDirection(that);
                });

            },
            getDirection: function(that) {
                // Set destination, origin and travel mode.
                var request = {
                    destination: that.destination,
                    origin: that.origin,
                    travelMode: that.mode,
                    drivingOptions: {
                        departureTime: new Date(Date.now() + 60 * 1000 * 30), // in einer halben Stunde
                        trafficModel: 'bestguess'
                    }
                };

                // Pass the directions request to the directions service.
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(request, function(response, status) {
                    if (status == 'OK') {
                        // Display the route on the map.
                        that.directionsDisplay.setDirections(response);
                        that.durationInTraffic = response.routes[0].legs[0].duration_in_traffic.text;
                        that.duration= response.routes[0].legs[0].duration.text;
                    }
                });
            }
        },
        mounted: function () {
            this.loadDirection();
        }
    };


</script>