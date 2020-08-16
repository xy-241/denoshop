$(window).on('load', function(){
  $(".loader").fadeOut("slow");
})

if (document.readyState == "loading") {
  
	document.addEventListener("DOMContentLoaded", ready);
} else {
  
	
}

function ready() {
  // let loadingScreen = document.querySelector(".loader");
  // loadingScreen.style.display = "none";
}
var toggleLoading = function () {
	var getSection = document.querySelector("article");
	var getFooter = document.querySelector("footer");
	var getMainNav = document.querySelector(".navMain"); //navMain
	let getSideNav = document.querySelector(".sideNav");
	let getWorkContent = document.querySelector(".workContent");

	let getSearchBtn = document.querySelector(".searchButtonTGT");
	let getLogo = document.querySelector(".logo");

	let loadingScreen = document.querySelector(".loader");

	getMainNav.style.visibility = "hidden";

	getSection.style.display = "none"; //Content
	getFooter.style.display = "none";
	getSearchBtn.style.display = "none";
	getLogo.style.display = "none";
	getWorkContent.style.setProperty("display", "none", "important");
	getSideNav.style.setProperty("display", "none", "important");

	loadingScreen.style.display = "flex";
};
