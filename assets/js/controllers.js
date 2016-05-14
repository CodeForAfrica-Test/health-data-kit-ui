angular.module('app.controllers', [])
  
.controller('appCtrl', function($scope, Restangular) {
	var inputMin = 1;
    $scope.search = function() {
    		console.log($scope.service)
    	if ((($scope.name && $scope.name.length)>= inputMin ) && $scope.service == 'doctor') {
            $scope.searching = true;
            Restangular.one('doctor/search').get({name: $scope.name}).then(function(response){
            	$scope.searching = true;
                $scope.results = response;
             }, function(error){
                $scope.error = error;
            });
        } else if ((($scope.name && $scope.name.length) >= inputMin) && $scope.service == 'hospital') {
            $scope.searching = true;
            console.log('medicine')
            $http({
				method: 'GET',
			    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
			          address + '&key=AIzaSyCq_hPKdxEybYoangnVh1Fs_ARyjnmdSqs' + '&sensor=false&components=country:NG',

			    transformRequest: function(data, headersGetter) {
			        var headers = headersGetter();

			        delete headers['Authorization'];

			        return headers;
			    }
			}).then(function(results){
				$scope.searching = true;
			    $scope.results = results.data.results;
			})
        } else {
        	$scope.searching = false;
        }
    }

	$scope.showDetail = function(result) {
		$scope.searching = false;
		$scope.name = '';
		$scope.detail = true;
		$scope.information = result;
		console.log(result)
		// $scope.searching = false;
	}

	$scope.close = function() {
		$scope.detail = false;
	}

})

.controller('hospitalFinderCtrl', function($scope, Restangular, $http) {

	$scope.search = function() {
	    	var address = $scope.hospital.name
			var inputMin = 3;
			
	    	if ($scope.hospital.name && $scope.hospital.name.length >= inputMin) {
	            // $scope.searching = true;
			    $http({
			        method: 'GET',
			        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
			                         address + '&key=AIzaSyCq_hPKdxEybYoangnVh1Fs_ARyjnmdSqs' + '&sensor=false&components=country:NG',

			        transformRequest: function(data, headersGetter) {
			            var headers = headersGetter();

			            delete headers['Authorization'];

			            return headers;
			        }
			    }).then(function(results){
			    	$scope.searching = true;
			    	$scope.results = results.data.results;
				})
	        } else {
               $scope.searching = false;
          } 	   
	    }

	$scope.addLocation = function(result) {
		$scope.hospital.name = result.formatted_address;
		$scope.hospital.latitude = result.geometry.location.lat;
		$scope.hospital.longitude = result.geometry.location.lng;
		// console.log(result.formatted_address);
		$scope.searching = false;
	}

	$scope.showDetail = function() {
		$scope.load = true;
		Restangular.all('hospital/search').post($scope.hospital).then(function(response) {
			$scope.hospitals = response;
			console.log(response.plain())
		}), function(error){
            $scope.error = error;
            console.log(error)
        };
	}

	$scope.showHospital = function(hospital) {
		$scope.hospitalDetails = true;
		$scope.hospital = hospital.obj;
	}

	$scope.close = function() {
		$scope.hospitalDetails = false;
	}
})
