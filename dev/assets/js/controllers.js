angular.module('app.controllers', [])
  
.controller('appCtrl', function($scope, Restangular) {
	

})

.controller('dodgyDoctorsCtrl', function($scope, Restangular) {
	Restangular.all('doctor').getList().then(function(response) {
		
		$scope.doctors = response;
		// console.log($scope.doctors.plain())
	})

	var inputMin = 3;
    $scope.search = function() {
    	if ($scope.doctorName && $scope.doctorName.length >= inputMin) {
            $scope.searching = true;
            Restangular.one('doctor/search').get({name: $scope.doctorName}).then(function(response){
                $scope.results = response;
             }, function(error){
                $scope.error = error;
            });
        } else {
               $scope.searching = false;
          }     
    }

	$scope.showDetail = function(result) {
		$scope.information = result;
		// console.log($scope.detail)
		$scope.searching = false;
		$scope.detail = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}
})

.controller('medicineFinderCtrl', function($scope, Restangular) {
	Restangular.all('medicine').getList().then(function(response) {
		$scope.medicine = response;
		// console.log(response.plain())
	})

	var inputMin = 3;
    $scope.search = function() {
    	if ($scope.medicineName && $scope.medicineName.length >= inputMin) {
            $scope.searching = true;
            Restangular.one('medicine/search').get({name: $scope.medicineName}).then(function(response){
                $scope.results = response;
             }, function(error){
                $scope.error = error;
            });
        } else {
               $scope.searching = false;
          }     
    }

	$scope.showDetail = function(result) {
		$scope.information = result;
		// console.log($scope.detail)
		$scope.searching = false;
		$scope.detail = true;
	}
	$scope.showDetail = function() {
		$scope.detail = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}
})

.controller('hospitalFinderCtrl', function($scope, Restangular) {
	// Restangular.all('hospital').getList().then(function(response) {
	// 	$scope.hospitals = response;
	// 	console.log(response)
	// })
	$scope.showDetail = function() {
		$scope.detail = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}
})
