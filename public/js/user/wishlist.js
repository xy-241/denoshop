// var client = new recombee.ApiClient('denoshop-dev', 'WF9CGlrAhbzbniAyqmYteNuoJdwDWRGaVA0hvd8X5GSLokW6oI5M7iszkUVItTPY');
document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", ready) : ready();

function ready() {
    let wishlist_btn = document.getElementsByClassName("wishlist_btn");
    for (let i = 0; i < wishlist_btn.length; i++) {
        wishlist_btn[i].addEventListener("click", addWishList);
    }
}


function addWishList(event) {
    let button = event.target
    let item = button.parentElement;
    let itemID = item.getElementsByClassName("itemID")[0].innerText;

    if (!item.getElementsByClassName('wishlist_btn')[0].classList.contains('active')) {
        fetch(`${window.origin}/wishlist/add`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ id: itemID }),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json",
                Accept: "application/json",
            }),
        }).catch(err => console.log(err))

        item.getElementsByClassName('wishlist_btn')[0].classList.add('active')
    }
    else {
        fetch(`${window.origin}/wishlist/delete/${itemID}`).catch(err => console.log('user not logged in'))
        item.getElementsByClassName('wishlist_btn')[0].classList.remove('active')
    }
}


const showWishlist_btn = async () => {
    let itemId = document.getElementsByClassName("itemID")
    for (let i = 0; i < itemId.length; i++) {
        await fetch(`${window.origin}/wishlist/get/${itemId[i].innerText}`
        ).then((res) => {
            return res.json()
        }).then((data) => {
            if (data) {
                document.getElementsByClassName('wishlist_btn')[i].classList.add('active')
            }
        })
    }
}

showWishlist_btn().catch( err => console.log('user not logged in'))








