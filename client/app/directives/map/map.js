'use strict';

var app = angular.module('regimesApp');

app.service('Map', function() {

    this.init = function(containerId) {
        var options = {
            center: new google.maps.LatLng(46.52863469527167, 2.43896484375),// jshint ignore:line
            zoom: 6,
            disableDefaultUI: true
        };
        var map = new google.maps.Map(// jshint ignore:line
            document.getElementById(containerId), options
        );
        return map;
    };

    this.addMarker = function(map, place) {
        var marker = new google.maps.Marker({// jshint ignore:line
            map: map,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP// jshint ignore:line
        });
        map.setCenter(place.geometry.location);
        return marker;
    };

    this.addClinicMarker = function(map, clinic) {
        var position  = {
            lat: clinic.coord.latitude,
            lng: clinic.coord.longitude
        };
        var marker = new google.maps.Marker({// jshint ignore:line
            map: map,
            position: position,
            animation: google.maps.Animation.DROP// jshint ignore:line
        });
        map.setCenter(position);
        return marker;
    };

});
