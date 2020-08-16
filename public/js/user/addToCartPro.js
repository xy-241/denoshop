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
    setTimeout(function () { event.target.disabled = false; }, 100);
    let checkIfLogin = document.getElementsByClassName("shopLogoNav")[0];

    if (checkIfLogin == undefined) {
    } else {
        let button = event.target;
        let item = button.parentElement.parentElement;

        let itemName = item.getElementsByClassName("itemName")[0].innerText;

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
    let checkIfLogin = document.getElementsByClassName("shopLogoNav")[0];

    if (checkIfLogin == undefined) {
        alert("Please login first.🔓");
    } else {
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
});
