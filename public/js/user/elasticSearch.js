// Elasticsearch
let field = document.getElementById("searchInput");
field.addEventListener("keyup", getResult);

function getResult() {
	// REMOVE DATE AND QUANTIT
	let userSearch = field.value;

	let entry = {
		query: {
			multi_match: {
				query: userSearch,
				fields: ["price", "title", "category"],
			},
		},
		highlight: {
			pre_tags: ["<b>"],
			post_tags: ["</b>"],
			fields: {
				title: {},
				price: {},
			},
		},
	};

	console.log(userSearch);

	fetch(
		"https://search-hacking-products-krxi5keaxpoltjfkhnzevnbuou.ap-southeast-1.es.amazonaws.com/hacking-products/_search?pretty",
		{
			method: "POST",
			body: JSON.stringify(entry),
			headers: new Headers({
				"content-type": "application/json",
			}),
		}
	)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			let searchBox = document.getElementsByClassName("searchItems")[0];
			searchBox.innerHTML = "";
			console.log("Time taken to retrieve: 🚀", data.took, "ms 🚀");
			let resultArray = data.hits.hits;
			//console.table(resultArray.length);
			if (resultArray.length != 0) {
				for (let i = 0; i < resultArray.length; i++) {
					//console.log(resultArray[i]._source.title);

					let itemId = resultArray[i]._id;
					let itemTitle = resultArray[i]._source.title;
					let itemPrice = resultArray[i]._source.price;
					let itemImage = resultArray[i]._source.imageFile;
					

					if (resultArray[i].highlight) {
						highlightTitle = resultArray[i].highlight.title;
						highlightPrice = resultArray[i].highlight.price;
						if (highlightTitle) {
							itemTitle = highlightTitle[0];
						}
						if (highlightPrice) {
							itemPrice = highlightPrice[0];
						}
					}

					//console.log(itemTitle, itemPrice, itemImage);
					//console.table(resultArray[i]);
					// https://res.cloudinary.com/dchpyunul/image/upload/c_scale,w_115/v1595087407/denoshop/hackingProducts/outfits/300-300-maxout_kakwk7.jpg

					let itemWrapper = document.createElement("div");
					itemWrapper.setAttribute(
						"class",
						"container pt-3"
					);
					let searchItem = `
							<div class="row mb-1">
								<div class="col-5 col-sm-4 col-md-3 col-xl-2">
								<a class="aLink" href="/product/${itemId}">
									<img src="${itemImage}" alt="" id="searchImage">
									</img>
								</a>
								</div>
								<div class="col-7 col-sm-8 col-md-9 col-xl-10">
									<div class="row ml-1">
									<a class="aLink" href="/product/${itemId}">
										<p id="deliveryInfoName">
											${itemTitle}
										</p>
									</a>
									</div>
									<div class="row mt-3 ml-1">
										<p id="deliveryInfoAddr">
											$${itemPrice}
										</p>
									</div>
								</div>
							</div>
					`;
					itemWrapper.innerHTML = searchItem;
					searchBox = document.getElementsByClassName(
						"searchItems"
					)[0];
					searchBox.append(itemWrapper);
				}
			} else {
			}
		})
		.catch((err) => {
			console.log(err);
		});
}
