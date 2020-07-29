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

function getAddress(addrId) {
    fetch(
        '/payment/retrieve/'+ addrId
    ).then(data => {
        return data.json()
    }).then(data => {
        console.log(data)

        const receiverName = document.getElementById("receiverName");
        const phoneNo = document.getElementById("phoneNum");
        const country = document.getElementById("country");
        const state = document.getElementById("administrative_area_level_1");
        const city = document.getElementById("locality");
        const blockNo = document.getElementById("street_number");
        const street = document.getElementById("route");
        const unitNo = document.getElementById("unitNo");
        const postcode = document.getElementById("postal_code");

        receiverName.value = data.receiverName
        phoneNo.value = data.phoneNo
        country.value = data.country
        state.value = data.state
        city.value = data.city
        blockNo.value = data.blockNo
        street.value = data.street
        unitNo.value = data.unitNo
        postcode.value = data.postcode
    })
}