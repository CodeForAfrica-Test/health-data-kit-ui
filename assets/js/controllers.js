angular.module('app.controllers', [])
  
.controller('appCtrl', function($scope, Restangular) {
	$scope.embed = function() {
		$scope.showCard = true;
	}
	$scope.closeCard = function() {
		$scope.showCard = false;
	}
})

.factory('MockAPI', ['Restangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
         RestangularConfigurer.setBaseUrl('api');
    });
 }])

.controller('dodgyDoctorsCtrl', function($scope, Restangular) {
	Restangular.all('doctor').getList().then(function(response) {
		$scope.doctors = response;
	})

	var inputMin = 1;
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

	$scope.showDetail = function(med) {
		$scope.information = med;
		$scope.searching = false;
		$scope.detail = true;
	}

	$scope.showImage = function() {
		$scope.image = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}

	$scope.closeImage = function() {
		$scope.image = false;
	}
})

.controller('medicinePricesCtrl', function($scope, MockAPI) {
	var inputMin = 1;

    $scope.search = function() {
    	if ($scope.medicineName && $scope.medicineName.length >= inputMin) {
    		$scope.searching = true;
    		MockAPI.all('medicine').getList().then(function(response){
		        $scope.medicines = _.uniq(response, function(o){
		         return o.name
		        });
		        $scope.unfilteredMedicines = response;
		    });
    	} else {
    		$scope.searching = false;
    	}
    }

	$scope.showDetail = function(result) {
		$scope.information = result;
		$scope.searching = false;
		$scope.detail = true;
	}

	$scope.close = function() {
		$scope.detail = false;
	}
})

.controller('hospitalFinderCtrl', function($scope, Restangular, $http) {
	$scope.search = function() {
	    var address = $scope.hospital.name
		var inputMin = 1;
			
	    if ($scope.hospital.name && $scope.hospital.name.length >= inputMin) {
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
		$scope.searching = false;
	}

	$scope.showDetail = function() {
		$scope.load = true;
		Restangular.all('hospital/search').post($scope.hospital).then(function(response) {
			if (response = "null") {
				$scope.nodata = true;
				$scope.load = false;
			} else {
				$scope.hospitals = response;
				$scope.nodata = false;
			}
		}), function(error){
            $scope.error = error;
            console.log(error)
        };
	}

	$scope.showHospital = function(hospital) {
		$scope.hospitalDetails = true;
		$scope.hospital = hospital.obj;
		console.log($scope.hospital)
	}

	$scope.close = function() {
		$scope.hospitalDetails = false;
	}

	$scope.closeList = function() {
		$scope.hospitals = [];
		$scope.load = false;
	}
})

.controller('pharmacyFinderCtrl', function($scope, Restangular, $http) {
	$scope.search = function() {
	    var address = $scope.pharmacy.address
		var inputMin = 1;
			
	    if ($scope.pharmacy.address && $scope.pharmacy.address.length >= inputMin) {
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
		$scope.pharmacy.address = result.formatted_address;
		$scope.pharmacy.latitude = result.geometry.location.lat;
		$scope.pharmacy.longitude = result.geometry.location.lng;
		$scope.searching = false;
	}

	$scope.showDetail = function() {
		$scope.load = true;
		Restangular.all('pharmacy/search').post($scope.pharmacy).then(function(response) {
			if (response = "null") {
				$scope.nodata = true;
				$scope.load = false;
			} else {
				$scope.pharmacies = response;
				$scope.nodata = false;
			}
			// console.log(response.plain());
		}), function(error){
            $scope.error = error;
            console.log(error)
        };
	}

	$scope.showPharmacy = function(pharmacy) {
		$scope.pharmacyDetails = true;
		$scope.pharmacy = pharmacy.obj;
	}

	$scope.close = function() {
		$scope.pharmacyDetails = false;
	}

	$scope.closeList = function() {
		$scope.pharmacies = [];
		$scope.load = false;
	}
})

.controller('articleCtrl', function($scope, Restangular) {
	Restangular.all('content').getList().then(function(response) {
		$scope.articles = response;
	})

})

.controller('articleReadCtrl', function($scope, Restangular, $stateParams) {
	console.log($stateParams)
	Restangular.one('content', $stateParams.id).get().then(function(response) {
		$scope.article = response;
	})
})
