if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready);
} else{
  ready();
}




function ready(){
  //Tab Actions
  var tabs = document.getElementsByClassName("tabButton");
  for(var i = 0; i< tabs.length; i++){
    tabs[i].addEventListener("click", displayItems);
  }
  //Tab Actions
  
}




function displayItems(event){
  //Get the item Page Name
  var button = event.target;
  subPageName = button.value;

  //Making sure only one subPage is displayed
  var subPages = document.getElementsByClassName("subPage");
  for(var i=0; i< subPages.length; i++){
    subPages[i].style.display = "none";
  }

  document.getElementsByClassName(subPageName)[0].style.display = "block"; //Display the page that is required
  //Making sure only one subPage is displayed
}


