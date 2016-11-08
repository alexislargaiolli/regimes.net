'use strict';

angular.module('regimesApp')
  .controller('BibliographyCtrl', function ($scope, Book, $sce) {    
    var self = this;
    self.books = [{
    	title : 'Test',
    	description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor asperiores eos explicabo, consequuntur nemo accusantium necessitatibus suscipit, tenetur esse odit ullam dolore beatae saepe iure nesciunt eligendi vel, in quas.',
    	author : 'Test Test',
    	date : new Date()
    },
    {
    	title : 'Test2',
    	description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor asperiores eos explicabo, consequuntur nemo accusantium necessitatibus suscipit, tenetur esse odit ullam dolore beatae saepe iure nesciunt eligendi vel, in quas.',
    	author : 'Test Test',
    	date : new Date()
    }];
    Book.query(function(books){
    	self.books = books;
    });

    this.trustUrl = function(url){
    	return $sce.trustAsResourceUrl(url);
    }
  });
