if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
function ready() {
	let removeButton = document.getElementsByClassName("removeButton");
	for (let i = 0; i < removeButton.length; i++) {
		removeButton[i].addEventListener("click", removeItem);
	}
	//document.getElementsByClassName('addToCartN').addCartBtn.addEventListener('click', addCart);

	//NumSelected
	var quantityInputs = document.getElementsByClassName("cartItemNum");
	for (var i = 0; i < quantityInputs.length; i++) {
		quantityInputs[i].addEventListener("change", quantityInputUpdate);
	}
	//NumSelected
}

function removeItem(event) {
	let button = event.target;

	//Remove items away from the local storage
	let cartItemName = button.parentElement.getElementsByClassName(
		"cartItemName"
	)[0].innerText;
	let entry = {
		title: cartItemName,
	};

	fetch(`${window.origin}/cart/removeItem`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(entry),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then(function (response) {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then(function (data) {
			console.log(data);
		});
	});

	button.parentElement.remove();
}

function quantityInputUpdate(event) {
	var button = event.target;

	//Making sure the cartItem is one or bigger

	if (button.value < 1 || isNaN(button.value)) {
		button.value = 1;
	}
    var roundedValue = Math.round(button.value);
	var itemName = button.parentElement.parentElement.parentElement.getElementsByClassName(
		"cartItemName"
	)[0].innerText;

	var entry = {
		title: itemName,
		itemNum: roundedValue,
	};

	fetch(`${window.origin}/cart/valueUpdate`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(entry),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then(function (response) {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then(function (data) {
			console.log(data);
		});
	});
}
