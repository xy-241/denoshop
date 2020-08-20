const botsocket = io.connect("https://denoshopchatserver.herokuapp.com/",
	{reconnect: true}
);

const botmessageContainer = document.getElementById('message-container')
const botmessageForm = document.getElementById('bot-container')
const botmessageInput = document.getElementById('message-input')
const userid = document.getElementById('userid')
var pw = false
var message = ''

if (botmessageForm != null) {
    
    botmessageForm.addEventListener('submit',e => {
        e.preventDefault()
        message = botmessageInput.value
        console.log(message)
        if(message!="") {
            botsocket.emit('chatbotMsg', userid.value , message )
            if (pw == true) {
                message = "******"
            }
            appendUserMessage(message)
        }
        botmessageInput.value = ''
    })
} 

botsocket.on('chatbotReply', message => {
    appendBotMessage(message)
})

botsocket.on('chatbotProduct', message => {
    appendProduct(message)
})

botsocket.on('passwordEntry' , function() {
    botmessageInput.type= 'password';
    pw = true
})

botsocket.on('passwordStop', function() {
    botmessageInput.type= 'text';
    pw = false
})

botsocket.on('addCart', item => {
    let entry = {
        title: item,
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
            appendBotMessage('ERROR')
            return;
        }
        appendBotMessage('Item successfully added to cart !')
        response.json().then(function (data) {
            console.log(data);
        });
    });
})

botsocket.on('alltocart', itemlist => {
    console.log(itemlist)
    const list = itemlist.split(',');
    var i;
    for (i = 0; i < list.length; i++) {
        console.log(list[i])
        let entry = {
            id: list[i],
        };
        fetch(`${window.origin}/cart/addid`, {
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
                appendBotMessage('ERROR')
                return;
            }
            response.json().then(function (data) {
                console.log(data);
            });
        });
    }
    appendBotMessage('Items have been successfully added !')
})


botsocket.on('failCart', function(){
    appendBotMessage('Item does not exist')
})

botsocket.on('addWish', item => {
    fetch(`${window.origin}/wishlist/add`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ id: item }),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json",
            Accept: "application/json",
        }),
    }).catch(err => console.log(err))
    appendBotMessage('Item successfully added to wishlist !')
})

botsocket.on('failWish', function(){
    appendBotMessage('Item does not exist')
})

function appendUserMessage(message) {
    const mediaDiv = document.createElement('div')
    mediaDiv.className = "media ml-auto mb-3 botMsg"
    const messageWrap = document.createElement('div')
    messageWrap.className = "bg-primary rounded py-2 px-3 mb-2"
    const messageElement = document.createElement('p')
    messageElement.className = "text-small mb-0 text-white"
    messageElement.innerText = message
    messageWrap.append(messageElement)
    mediaDiv.append(messageWrap)
    botmessageContainer.append(mediaDiv)
    botmessageContainer.scrollTo(0,botmessageContainer.scrollHeight);
}

function appendBotMessage(message) {
    const mediaDiv = document.createElement('div')
    mediaDiv.className = "media mr-auto mb-3 botMsg"
    const messageWrap = document.createElement('div')
    messageWrap.className = "bg-light rounded py-2 px-3 mb-2"
    const messageElement = document.createElement('p')
    messageElement.className = "text-small mb-0 text-dark"
    messageElement.innerHTML = message
    messageWrap.append(messageElement)
    mediaDiv.append(messageWrap)
    botmessageContainer.append(mediaDiv)
    botmessageContainer.scrollTo(0,botmessageContainer.scrollHeight);
}

function appendProduct(message) {
    botmessageContainer.innerHTML += message
    botmessageContainer.scrollTo(0,botmessageContainer.scrollHeight);
}