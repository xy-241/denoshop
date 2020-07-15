if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    document.getElementById('openAddress').addEventListener('click', onAddress);
    document.getElementById('closeAddress').addEventListener('click', offAddress);
}

function onAddress(){
    document.getElementById("overlayAddress").style.display = "block";
}

function offAddress(){
    document.getElementById("overlayAddress").style.display = "none";
}