if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    document.getElementById('closeOrder').addEventListener('click', offOrder);
}

function viewOrder(addrId){

    fetch(
        '/orderInfo/retrieve/'+ addrId
    ).then(data => {
        return data.json()
    }).then(data => {
        const orderName = document.getElementById("orderName");
        const orderDateTime = document.getElementById("orderDateTime");
        const orderList = document.getElementById("orderList");

        orderName.innerText = data.order.orderDescription
        orderDateTime.innerText = data.order.deliveryDate + ", " + data.order.deliveryTime

        var purchaseRecords = data.order.purchaseRecords
        Array.prototype.forEach.call(purchaseRecords, record => {
            var li = document.createElement("li");
            li.innerHTML= `<figure class="itemside mb-3">
            <div class="aside"><img src="${record.imageFile}" class="img-sm border"></div>
            <figcaption class="info align-self-center">
            <p class="title">${record.title}<br> Quantity: ${record.itemNum}</p> <span class="text-muted">$${record.price} </span>
            </figcaption>
        </figure>`
            li.setAttribute("class", "col-md-4 col-lg-3")
            orderList.appendChild(li);
        });

        document.getElementById("overlayOrder").style.display = "block";
    })
}

function offOrder(){
    document.getElementById("overlayOrder").style.display = "none";
    var orderList = document.getElementById("orderList");
    orderList.innerHTML = "";
}
