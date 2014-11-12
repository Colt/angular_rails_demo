// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require turbolinks
//= require jquery
//= require angular
//= require ng-rails-csrf
//= require angular-resource
//= require_tree .


var app = angular.module("Raffler", ["ngResource", "ng-rails-csrf"]);

app.factory("Entry", function($resource){
	return $resource("/entries/:id", {id: "@id"}, {update: {method: "PUT"}});
});

var RaffleCtrl = function($scope, Entry){
	$scope.entries = Entry.query(); //    "/entries"
	console.log(Entry.query())

	$scope.addEntry = function(){
		var entry = Entry.save($scope.newEntry) //create
		$scope.entries.push(entry)
		$scope.newEntry = {}
	}

	$scope.getInfo = function(entry){
		var info = Entry.get(entry);
		console.log(info);
	}

	$scope.drawWinner = function(){
		var pool = []
		angular.forEach($scope.entries, function(entry){
			if(!entry.winner){
				pool.push(entry);
			}
		});
		var entry = pool[Math.floor(Math.random() * pool.length)];
		entry.winner = true;
		entry.$update()
		$scope.lastWinner = entry
	}
}
