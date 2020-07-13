// if(document.readyState == "loading"){
//   document.addEventListener("DOMContentLoaded", ready);

// } else{
//   ready();

// }

// //localStorage
// var data = localStorage.getItem("storedCartItems");
// if(data ==null){
//   var storedCartItems = [];

// } else{
//   var storedCartItems = JSON.parse(data);
// }
// //localStorage

// function addToCartFunc(event){
//   var button = event.target;
//   var item = button.parentElement.parentElement;
//   var itemRow = document.createElement("div");
//   itemRow.setAttribute("class", "cartItem");

//   var itemName = item.getElementsByClassName("itemName")[0].innerText;
//   var src = item.getElementsByTagName("img")[0].src;
//   var itemPrice = item.getElementsByClassName("itemPrice")[0].innerText;

//   var cartItems = document.getElementsByClassName("cartItems")[0];
//   var cartItemNames = cartItems.getElementsByClassName("cartItemName");

//   //Add 1 to value if item is already inside, and return to quit the function
//   for(var i = 0; i<cartItemNames.length; i++){
//     if(cartItemNames[i].innerText == itemName){

//       var currentValue = parseInt(cartItemNames[i].parentElement.getElementsByClassName("cartItemNum")[0].value);
//       cartItemNames[i].parentElement.getElementsByClassName("cartItemNum")[0].value = currentValue+1;
//       updateTheCart();  //Update the cart!!!

//       //Local Strong Value changes
//       for(var i=0; i<storedCartItems.length; i++){
//         if(storedCartItems[i]["name"] == itemName){
//           storedCartItems[i]["value"] = parseInt(storedCartItems[i]["value"]) + 1;
//           localStorage.setItem("storedCartItems", JSON.stringify(storedCartItems));
//         }
//       }
//       //Local Strong Value changes
//       return;
//     }
//   }

//   var itemContent = `
//     <div class="cartItemDes">
//       <div class="cartItemPic">
//         <img src=${src}>
//       </div>
//       <div class="cartItemInfo">
//         <p class="cartItemName">${itemName}</p>
//         <div class="cartItemBuyingInfo">
//           <p class="cartItemPrice">${itemPrice}</p>
//           <div class="cartItemNumWrapper">
//             <input type="number" class="cartItemNum" value="1">
//           </div>
//         </div>
//       </div> <!--End of cart Info-->
//     </div> <!--End of cart Des-->
//     <button type="button" class="removeButton">Remove</button>
//   `;
//   itemRow.innerHTML = itemContent;

//   var cartList = document.getElementsByClassName("cartItems")[0];
//   cartList.append(itemRow);

//   //Store to localStorage RMB TO REMOVE when checkout/remove clicked
//   storedCartItems.push({"name": itemName, "price": itemPrice, "src": src, "value": parseInt(cartItemNames[i].parentElement.getElementsByClassName("cartItemNum")[0].value)});
//   localStorage.setItem("storedCartItems", JSON.stringify(storedCartItems));
//   //Store to localStorage RMB TO REMOVE when checkout/remove clicked

//   //Give the newly created button an event handler
//   //NumSelected
// //   var quantityInputs = document.getElementsByClassName("cartItemNum");
// //   for(var i=0; i<quantityInputs.length; i++){
// //     quantityInputs[i].addEventListener("change", quantityInputUpdate);
// //   }
// //   //NumSelected
// //   //Remove Button
// //   var removeButtons = document.getElementsByClassName("removeButton");
// //   for(var i=0; i<removeButtons.length; i++){
// //     removeButtons[i].addEventListener("click", removeItemFromCart);
// //   }
//   //Remove Button

//   updateTheCart()   //Update the cart!!!
//   return;
// }

// function updateTheCart(){
//   var cartItems = document.getElementsByClassName("cartItems")[0];
//   var cartItem = cartItems.getElementsByClassName("cartItem");
//   var sum = 0;
//   var amountToPay = document.getElementsByClassName("amountToPay")[0];

//   for(var i = 0; i<cartItem.length; i++){
//     var price =  parseFloat(cartItem[i].getElementsByClassName("cartItemPrice")[0].innerText.replace("S$", ""));
//     var number = parseFloat(cartItem[i].getElementsByClassName("cartItemNum")[0].value);
//     sum += (price * number);
//   }

//   sum = Math.round(sum * 100) /100;
//   amountToPay.innerText = "$" + sum;

//   //Check if carts has anything
//   checkCartStatus();
//   //Check if carts has anything

// }

if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
function ready() {
	let addToCartN = document.getElementsByClassName("addToCartN");
	for (let i = 0; i < addToCartN.length; i++) {
		addToCartN[i].addEventListener("click", addCart);
	}
	//document.getElementsByClassName('addToCartN').addCartBtn.addEventListener('click', addCart);
}

function addCart(event) {
	let button = event.target;
	let item = button.parentElement.parentElement;
	let itemRow = document.createElement("div");

	let itemName = item.getElementsByClassName("itemName")[0].innerText;

	let entry = {
		title: itemName,
	};

	fetch(`${window.origin}/cart/add`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(entry),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
			Accept: "application/json",
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
