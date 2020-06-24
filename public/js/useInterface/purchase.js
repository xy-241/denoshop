if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    document.getElementById('openStripe').addEventListener('click', onStripe);
    document.getElementById('closeStripe').addEventListener('click', offStripe);
}


function onStripe(){
    document.getElementById("overlay").style.display = "block";
}

function offStripe(){
    document.getElementById("overlay").style.display = "none";
}