if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    document.getElementById('openStripe').addEventListener('click', onStripe);
    document.getElementById('closeStripe').addEventListener('click', offStripe);

    document.getElementById('openAddress').addEventListener('click', onAddress);
    document.getElementById('closeAddress').addEventListener('click', offAddress);
}


function onStripe(){
    document.getElementById("overlayStripe").style.display = "block";
}

function offStripe(){
    document.getElementById("overlayStripe").style.display = "none";
}

function onAddress(){
    document.getElementById("overlayAddress").style.display = "block";
}

function offAddress(){
    document.getElementById("overlayAddress").style.display = "none";
}