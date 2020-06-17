if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    document.getElementById('openStripe').addEventListener('click', onStripe);
    document.getElementById('closeStripe').addEventListener('click', offStripe);
    // document.getElementsByClassName('btn-stripe')[0].addEventListener('click', stripeClicked)
}

const stripe = Stripe(stripePublicKey);

// const stripeCheckoutButton = document.querySelector('#checkout-button')
// checkoutButton.addEventListener('click', () => {
//     var items = []
//     var itemdata = []
//     var cartItemContainer = document.getElementsByClassName('cartItem')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cartItem')
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var quantityElement = cartRow.getElementsByClassName('cartItem-quantity')[0]
//         var quantity = quantityElement.value
//         var price = cartRow.dataset.price
//         var id = cartRow.dataset.id
//         itemdata.push({
//             product: id,
//             unit_amount: price,
//             currency: 'sgd',
//         })
//         items.push({
//             price_data: itemdata,
//             quantity: quantity,
//         })
//     }

//     const checkoutSession = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: items,
//         mode: 'payment',
//         currency: 'sgd',
//         locale: 'en',
//         successUrl: '127.0.0.1:5000/payment/cart',
//         cancelUrl: '127.0.0.l:5000/payment/checkout',
//     })
    
//     const {error} = await stripe.redirectToCheckout({
//         sessionId: '{{'
//     }).then(
//         function(result) {},
//         function(err) {}
//     ),
// });

function onStripe(){
    document.getElementById("overlay").style.display = "block";
}

function offStripe(){
    document.getElementById("overlay").style.display = "none";
}
// Old Stripe

// var stripeHandler = StripeCheckout.configure({
//     key: stripePublicKey,
//     locale: 'en',
//     token: function(token){
//         var items = []
//         var cartItemContainer = document.getElementsByClassName('cartItem')[0]
//         var cartRows = cartItemContainer.getElementsByClassName('cartItem')
//         for (var i = 0; i < cartRows.length; i++) {
//             var cartRow = cartRows[i]
//             var quantityElement = cartRow.getElementsByClassName('cartItem-quantity')[0]
//             var quantity = quantityElement.value
//             var id = cartRow.dataset.id
//             items.push({
//                 id: id,
//                 quantity: quantity,
//             })
//         }
        
//         fetch('/purchaseStripe', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: JSON.stringify({
//                 stripeTokenId: token.id,
//                 items: items,
//             })
//         }).then(function(res) {
//             return res.json()
//         }).then(function(data) {
//             alert(data.message)
//             var cartItems = document.getElementsByClassName('cartItems')[0]
//             while (cartItems.hasChildNodes()) {
//                 cartItems.removeChild(cartItems.firstChild)
//             }
//             updateTheCart()
//         }).catch(function(error) {
//             console.error(error)
//         })
//     }
// })

// function stripeClicked() {
//     var sumElement = document.getElementsByClassName('price')[0]
//     var sum = parseFloat(sumElement.innerHTML.replace('$', '')) * 100
//     stripeHandler.open({
//         amount: sum
//     })
// }