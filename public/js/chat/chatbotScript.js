const botsocket = io.connect("http://localhost:8000",
	{reconnect: true}
);

const botmessageContainer = document.getElementById('message-container')
const botmessageForm = document.getElementById('bot-container')
const botmessageInput = document.getElementById('message-input')
const userid = document.getElementById('userid')

if (botmessageForm != null) {
    
    botmessageForm.addEventListener('submit',e => {
        e.preventDefault()
        const message = botmessageInput.value
        if(message!="") {
            botsocket.emit('chatbotMsg', userid.value , message )
            appendUserMessage(message)
        }
        botmessageInput.value = ''
    })
} 

botsocket.on('chatbotReply', message => {
    appendBotMessage(message)
})

function appendUserMessage(message) {
    const mediaDiv = document.createElement('div')
    mediaDiv.className = "media ml-auto mb-3"
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
    mediaDiv.className = "media mr-auto mb-3"
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
