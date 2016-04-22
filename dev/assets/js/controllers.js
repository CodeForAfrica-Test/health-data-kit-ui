angular.module('app.controllers', [])
  
.controller('appCtrl', function($scope) {
	

})

.controller('dodgyDoctorsCtrl', function($scope) {
	$scope.showDetail = function() {
		$scope.detail = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}
})

.controller('medicineFinderCtrl', function($scope) {
	$scope.showDetail = function() {
		$scope.detail = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}
})

.controller('hospitalFinderCtrl', function($scope) {
	$scope.showDetail = function() {
		$scope.detail = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}
})
