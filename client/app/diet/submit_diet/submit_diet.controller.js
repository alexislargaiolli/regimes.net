'use strict';

angular.module('regimesApp')
    .controller('SubmitDietCtrl', function($scope, Diet) {
        var self = this;
        this.submission = {};
        this.maxAbstractLength = 1000;
        this.maxContentLength = 100000;
        this.diet = {};
        this.dietTypes = [{ value: 0, label: 'Régime amincissant' }, { value: 1, label: 'Régime santé' }];
        this.abstractErrors=[];
        this.contentErrors=[];

        this.tinymceOptions = {
            plugins: '',
            menubar: false,
            toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent'
        };

        var success = function(data){
        	console.log('success ' + data);
        	self.submission.success = true;
        	self.submission.message = 'Votre régime a bien été soumis. Il maintenant en attente de validation.';
        };

        var error = function(err){
        	console.log(err);
			self.submission.success = false;
			self.submission.message = 'Une erreur est survenue pendant la soumission de votre régime...';
        };

        this.submitDiet = function(form){
        	self.abstractErrors=[];
        	this.contentErrors=[];
        	if(form.$valid){
        		if(self.diet.abstract.length === 0){
					self.abstractErrors.push('Vous n\'avez pas détaillé brièvement votre régime.');
        		}
        		else if(self.diet.abstract.length > self.maxAbstractLength){
					self.abstractErrors.push('La taille de ce champ ne doit pas dépasser ' + self.maxAbstractLength);
        		}
        		else if(self.diet.content.length === 0){
					self.contentErrors.push('Vous n\'avez pas détaillé votre régime.');
        		}
        		else if(self.diet.content.length > self.maxContentLength){
					self.contentErrors.push('La taille de ce champ ne doit pas dépasser ' + self.maxContentLength);
        		}
        		else{
        			Diet.resource.submit(self.diet, success, error);
        		}
        	}
        };        

    });

