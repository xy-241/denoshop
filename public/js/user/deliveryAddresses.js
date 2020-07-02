let placeSearch, autocomplete;
let editAutocomplete // ###

let componentForm = {
	street_number: "short_name",
	route: "long_name",
	locality: 'long_name',
	administrative_area_level_1: "short_name",
	postal_code: "short_name",
	country: "long_name"
}

// ###
let editComponentForm = {
	street_numberE: "short_name",
	routeE: "long_name",
	localityE: 'long_name',
	administrative_area_level_1E: "short_name",
	postal_codeE: "short_name",
	countryE: "long_name"
}
// ###


function initAutocomplete() {
  
	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(1.369, 103.8827),
		new google.maps.LatLng(1.369, 103.8827)
	)
	let options = {
		bounds: defaultBounds,
		types: ['establishment']
	}
	
	// Data input and output
	let input = document.getElementById('autocomplete');
	let editInput = document.getElementById('editAutocomplete'); // ###
	// Autocomplete magic spell API, takes in the input/output field and option which contains the bound
	autocomplete = new google.maps.places.Autocomplete(input, options);
	editAutocomplete = new google.maps.places.Autocomplete(editInput, options); // ###
	autocomplete.setFields(['address_component'])


	// When user selects an address from the drop-down, populate the address field
	autocomplete.addListener('place_changed', fillInAddress)
	editAutocomplete.addListener('place_changed', fillInAddressE) // ###
	

}


function fillInAddress(){
	let place = autocomplete.getPlace();
	console.log(place, "place")
	

	for (let component in componentForm){
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
	}

	for (let i=0; i< place.address_components.length; i++){
		console.log(place.address_components[i].short_name)
		let type = place.address_components[i].types[0];
		let inputField = document.getElementById(type);

		if(componentForm[type]){
			inputField.value = place.address_components[i][componentForm[type]]
		}
	}
}


function fillInAddressE(){
	let place = editAutocomplete.getPlace();
	console.log(place, "place")


	for (let component in editComponentForm){
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
		
	}

	for (let i=0; i< place.address_components.length; i++){
		console.log(place.address_components[i].short_name)
		let type = place.address_components[i].types[0];
		let documentEditFieldId = type+"E"
		let inputField = document.getElementById(documentEditFieldId);

		if(editComponentForm[documentEditFieldId]){
			inputField.value = place.address_components[i][editComponentForm[documentEditFieldId]]
		}
	}
}
// ###


//Onfocus, triggered when click the field
function geolocate() {
	if (navigator.geolocation) { // If geo is allowed
		navigator.geolocation.getCurrentPosition((position) => {
			let geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			console.log(geolocation)
			console.log(position.coords.accuracy)
			// The circle around the current location
			let circle = new google.maps.Circle({center: geolocation, radius: position.coords.accuracy});
			autocomplete.setBounds(circle.getBounds()); // Change the default coords to current
			editAutocomplete.setBounds(circle.getBounds()); // ###
		

		})
	}

}








