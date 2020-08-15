
window.onload = function () {
    var banner_modal = document.getElementById('banner_modal');

    if (localStorage.getItem("disable_offers") == "true") {
        banner_modal.style.display = "none";
    } else {
        banner_modal.style.display = "block";
    }
    document.getElementsByClassName("closeBtn")[1].addEventListener("click", removeModal);
    window.addEventListener("click", clickOutsideModal);

}

function removeModal(event) {
    var button = event.target;
    button.parentElement.parentElement.parentElement.style.display = "none";
}

function clickOutsideModal(event) {
    var area = event.target;
    if (area == banner_modal) {
        banner_modal.style.display = "none";
    }
}

function begone() {
    localStorage.setItem("disable_offers", true);
}


