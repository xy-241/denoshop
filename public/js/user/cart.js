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

	updateTheCart();
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

	updateTheCart();
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
	updateTheCart();
}

function updateTheCart(){
  var cartItems = document.getElementsByClassName("cartItems")[0];
  var cartItem = cartItems.getElementsByClassName("cartItem");
  var sum = 0;
  var amountToPay = document.getElementsByClassName("amountToPay")[0];

  for(var i = 0; i<cartItem.length; i++){
    var price =  parseFloat(cartItem[i].getElementsByClassName("cartItemPrice")[0].innerText.replace("S$", ""));
    var number = parseFloat(cartItem[i].getElementsByClassName("cartItemNum")[0].value);
    sum += (price * number);
  }

  sum = Math.round(sum * 100) /100;
  amountToPay.innerText = "$" + sum;

  //Check if carts has anything
  checkCartStatus();
  //Check if carts has anything

}

//Check Cart Status
function checkCartStatus(){
  var cartItemNumber = document.getElementsByClassName("cartItems")[0].childElementCount;
  if(cartItemNumber == 0){
    document.getElementsByClassName("cartTotal")[0].style.display = "none";
	document.getElementsByClassName("cartEmpty")[0].style.display = "block";
	document.getElementsByClassName("checkout")[0].disabled = true;
	document.getElementsByClassName("checkout")[0].classList.remove("hover");
  }
  else{
    document.getElementsByClassName("cartTotal")[0].style.display = "flex";
	document.getElementsByClassName("cartEmpty")[0].style.display = "none";
	document.getElementsByClassName("checkout")[0].disabled = false;
	document.getElementsByClassName("checkout")[0].classList.add("hover");
  }
}
//Check Cart Status