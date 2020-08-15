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
	event.target.disabled = true;
	setTimeout(function(){event.target.disabled = false;},100);
	let checkIfLogin = document.getElementsByClassName("shopLogoNav")[0];

	if (checkIfLogin == undefined) {
	} else {
		let button = event.target;
		let item = button.parentElement.parentElement;

		let itemName = item.getElementsByClassName("card-title")[0].innerText;

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
}

$(".addToCartN").on("click", function () {
	
	let cart = $(".shopLogoNav");
	let checkIfLogin = document.getElementsByClassName("shopLogoNav")[0];

	if (checkIfLogin == undefined) {
		alert("Please login first.🔓");
	} else {
		// Check for window size, so to target different logo
		var $window = $(window);
		var windowsize = $window.width();
		if (windowsize < 1000) {
			cart = $(".shopCartLogo");
		}

		var imgtodrag = $(this)
			.parent(".addToCart")
			.parent(".card-body")
			.parent(".card")
			.find("img")
			.eq(0);
		if (imgtodrag) {
			if (cart) {
				console.log(cart);
			}

			var imgclone = imgtodrag
				.clone()
				.offset({
					top: imgtodrag.offset().top,
					left: imgtodrag.offset().left,
				})
				.css({
					opacity: "0.8",
					position: "absolute",
					height: "150px",
					width: "150px",
					"z-index": "100",
				})
				.appendTo($("body"))
				.animate(
					{
						top: cart.offset().top + 10,
						left: cart.offset().left + 10,
						width: 28,
						height: 28,
					},
					1000,
					"easeInOutExpo"
				);

			setTimeout(function () {}, 1500);

			imgclone.animate(
				{
					width: 0,
					height: 0,
				},
				function () {
					$(this).detach();

					fetch(`${window.origin}/cart/cartNum`)
						.then((res) => {
							return res.json();
						})
						.then((data) => {
							if (parseInt(data) > 99) {
								
								$(".cartNumCount").text("99+");
							} else {
								$(".cartNumCount").text(data);
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			);
		}
	}
});
