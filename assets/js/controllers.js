angular.module('app.controllers', [])
  
.controller('appCtrl', function($scope, Restangular, $http) {
	// $scope.placeholder = 'Search';
	var inputMin = 1;
    $scope.search = function() {
    	if ((($scope.hospital.name && $scope.hospital.name.length)>= inputMin ) && $scope.service == 'doctor') {
    		$scope.copy = true;
            $scope.searching = true;
            Restangular.one('doctor/search').get({name: $scope.hospital.name}).then(function(response){
            	$scope.searching = true;
                $scope.results = response;
             }, function(error){
                $scope.error = error;
                console.log(error)
            });
        } else if ((($scope.hospital.name && $scope.hospital.name.length) >= inputMin) && $scope.service == 'hospital') {
            $scope.searching = true;
            var address = $scope.hospital.name;
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
    		$scope.copy = false;
        	$scope.searching = false;
			$scope.hospitalResults = false;
        }
    }

	$scope.showDetail = function(result) {
		$scope.searching = false;
		$scope.hospital.name = '';
		$scope.detail = true;
		$scope.information = result;
		console.log(result)
		// $scope.searching = false;
	}

	$scope.viewHospital = function(result) {
		$scope.hospitalInfo = result.obj;
		$scope.showHospitalList = true;
		$scope.hospitalResults = false;
		$scope.searching = false;
		$scope.detailView = true;
		console.log(result)
		// $scope.searching = false;
	}

	$scope.close = function() {
		$scope.detail = false;
		$scope.detailView = false;
	}

	$scope.closeHospital = function() {
		$scope.showHospitalList = false;
	}

	$scope.closeHospitalView = function() {
		$scope.detailView = false;
		$scope.searching = true;
		$scope.showHospitalList = false;
	}

	$scope.addLocation = function(result) {
		$scope.hospital.name = result.formatted_address;
		$scope.hospital.latitude = result.geometry.location.lat;
		$scope.hospital.longitude = result.geometry.location.lng;
		console.log($scope.hospital);
		$scope.searching = false;
	}

	$scope.showHospital = function() {
		$scope.loading = true;
		Restangular.all('hospital/search').post($scope.hospital).then(function(response) {
			$scope.results = response;
			$scope.hospitalResults = true;
			// $scope.showHospitalList = true;
			$scope.loading = false;
			console.log(response.plain())
		}), function(error){
            $scope.error = error;
            console.log(error)
        };
	}

})