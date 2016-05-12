angular.module('app.controllers', [])
  
.controller('appCtrl', function($scope, Restangular, utilsFactory) {
	$scope.anime = utilsFactory.fun1();
	var inputMin = 3;
    $scope.search = function() {
    		$scope.anime = true;
    	if ($scope.name && $scope.name.length >= inputMin) {

            // $scope.searching = true;
            Restangular.one('doctor/search').get({name: $scope.name}).then(function(response){
                $scope.results = response;
                console.log(response)
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

// .controller('dodgyDoctorsCtrl', function($scope, Restangular) {
// 	// Restangular.all('doctor').getList().then(function(response) {
		
// 	// 	$scope.doctors = response;
// 	// 	// console.log($scope.doctors.plain())
// 	// })

// 	var inputMin = 3;
//     $scope.search = function() {
//     	utilsFactory.fun1();
//     	if ($scope.name && $scope.name.length >= inputMin) {
//             $scope.searching = true;
//             Restangular.one('doctor/search').get({name: $scope.name}).then(function(response){
//                 $scope.results = response;
//                 console.log(response)
//              }, function(error){
//                 $scope.error = error;
//             });
//         } else {
//                $scope.searching = false;
//           }     
//     }

// 	$scope.showDetail = function(result) {
// 		$scope.information = result;
// 		// console.log($scope.detail)
// 		$scope.searching = false;
// 		$scope.detail = true;
// 	}

// 	$scope.close = function() {
// 		$scope.detail = false;
// 	}
// })

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

.factory('utilsFactory', function() {
	//function definition
	var fun1 = function() {
                var morphSearch = document.getElementById( 'morphsearch' ),
                    input = morphSearch.querySelector( 'input.morphsearch-input' ),
                    ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
                    isOpen = isAnimating = false,
                    // show/hide search area
                    toggleSearch = function(evt) {
                        // return if open and the input gets focused
                        if( evt.type.toLowerCase() === 'focus' && isOpen ) return false;

                        var offsets = morphsearch.getBoundingClientRect();
                        if( isOpen ) {
                            classie.remove( morphSearch, 'open' );

                            // trick to hide input text once the search overlay closes 
                            // todo: hardcoded times, should be done after transition ends
                            if( input.value !== '' ) {
                                setTimeout(function() {
                                    classie.add( morphSearch, 'hideInput' );
                                    setTimeout(function() {
                                        classie.remove( morphSearch, 'hideInput' );
                                        input.value = '';
                                    }, 300 );
                                }, 500);
                            }
                            
                            input.blur();
                        }
                        else {
                            classie.add( morphSearch, 'open' );
                        }
                        isOpen = !isOpen;
                    };

                // events
                input.addEventListener( 'focus', toggleSearch );
                ctrlClose.addEventListener( 'click', toggleSearch );
                // esc key closes search overlay
                // keyboard navigation events
                document.addEventListener( 'keydown', function( ev ) {
                    var keyCode = ev.keyCode || ev.which;
                    if( keyCode === 27 && isOpen ) {
                        toggleSearch(ev);
                    }
                } );


                /***** for demo purposes only: don't allow to submit the form *****/
                morphSearch.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault(); } );
            }
	
	//return functions after the injection
	return {
	    fun1: fun1
	};
})
