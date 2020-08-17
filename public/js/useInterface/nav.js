if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}

function ready() {
	fetch(`${window.origin}/cart/cartNum`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if( parseInt(data) >= 100){
        $(".cartNumCount").text("99+");
      } else {
        $(".cartNumCount").text(data);
      }
			
		})
		.catch((err) => {
			console.log(err);
		});
}

//menu
function menuFunction(x){
  x.classList.toggle("change");
}


var toggleNavStatus = false;

var toggleNav = function(){
  var getSideNav = document.querySelector(".sideNav");
  var getSideNavUl = document.querySelector(".sideNav ul");
  var getSideNavA = document.querySelectorAll(".sideNav a");

  var getSection = document.querySelector("article");
  var getFooter = document.querySelector('footer');
  var getMainNav = document.querySelector(".navMain"); //navMain

  var getBody = document.querySelector("body"); //body

  let getSearchBtn = document.querySelector(".searchButtonTGT")
  let getChatbotBtn = document.querySelector('#chatbotTogglex')


  if(toggleNavStatus == false){
    getSideNavUl.style.visibility = "visible";

    getSideNav.style.display ="block"; //Nav


    getMainNav.style.backgroundColor = "black";
    getMainNav.style.borderBottom = "1.49px grey solid";

    //getMainNav.style.height = "calc(100vh)"; //Testing
    getMainNav.style.backgroundColor = "black";
    getBody.style.backgroundColor ="black"; //Testing

    getSection.style.display ="none"; //Content
    getFooter.style.display = "none";
    getSearchBtn.style.display = "none";
    getChatbotBtn.style.display = "none";

    toggleNavStatus = true;
  }
  else if (toggleNavStatus == true){
    getSideNavUl.style.visibility = "hidden";

    getSideNav.style.display ="none"; //Nav


    getMainNav.style.backgroundColor = "#262729";
    //getMainNav.style.height = "50px"; //testing

    getMainNav.style.borderBottom = "1px black solid";


    getSection.style.display ="block"; //Content
    getFooter.style.display = "block";
    getBody.style.backgroundColor = "white"; //testing

    getSearchBtn.style.display = "block";
    getChatbotBtn.style.display = "block";
    toggleNavStatus = false;
  }
}

var toggleNavStatusx = false;

var toggleNavScuffed = function(){

  var getSection = document.querySelector("article");
  var getFooter = document.querySelector('footer');

  let getSearchBtn = document.querySelector(".searchButtonTGT")

  if(toggleNavStatusx == false){
    getSection.style.display ="none"; //Content
    getFooter.style.display = "none";
    getSearchBtn.style.display = "none";

    toggleNavStatusx = true;
  }
  else if (toggleNavStatusx == true){

    getSection.style.display ="block"; //Content
    getFooter.style.display = "block";

    getSearchBtn.style.display = "block";
    toggleNavStatusx = false;
  }
}
