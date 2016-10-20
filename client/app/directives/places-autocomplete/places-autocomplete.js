'use strict';

var app = angular.module('regimesApp');

app.service('PlacesAutocomplete', function() {

    this.init = function(inputId, placeChangeCallback) {
        var input = document.getElementById(inputId);
        var options = {
            componentRestrictions: {country: 'fr'}
        };

        var autocomplete = new google.maps.places.Autocomplete(input, options); // jshint ignore:line
        autocomplete.addListener('place_changed', function() {
            placeChangeCallback(autocomplete.getPlace());
        });
    };

});
