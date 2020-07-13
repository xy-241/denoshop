const socket = io.connect("http://localhost:8000",
	{reconnect: true}
);

let options = {
    timeZone: 'Singapore',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
formatter = new Intl.DateTimeFormat(('en-GB'), options);

const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const endButton = document.getElementById('endButton')

const chatForm = document.getElementById('chatForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const phoneInput = document.getElementById('phone')
const departmentInput = document.getElementById('department')
const descInput = document.getElementById('desc')
const urgentInput = document.getElementById('urgent')
const errorendButton = document.getElementById('errorendButton')


if (messageForm != null) {
    const dateTime = formatter.format(new Date())
    socket.emit('new-user',roomName ,username, 'clientJoin', dateTime)

    messageForm.addEventListener('submit',e => {
        e.preventDefault()
        const dateTime = formatter.format(new Date())
        const message = messageInput.value
        appendOwnMessage(message,dateTime)
        socket.emit('send-chat-message', roomName ,message ,dateTime, 'client' )
        messageInput.value = ''
    })
    endButton.addEventListener('click', function(){
        socket.emit('close-room',roomName)
    })
} else {
    if (errorendButton != null) {
        errorendButton.addEventListener('click', function(){
            socket.emit('close-room',errorendButton.value);
            location.reload();
        })
    }
    chatForm.addEventListener('submit',e => {
        e.preventDefault()
        const name = nameInput.value
        const email = emailInput.value
        const phone = phoneInput.value
        const department = departmentInput.value
        const desc = descInput.value
        const urgent = urgentInput.checked
        const dateTime = formatter.format(new Date())
        socket.emit('new-room',userID,name,email,phone,department,desc,urgent,dateTime)
        
        // socket.emit('send-chat-message', roomName ,message)
    })
}

socket.on('chat-message', data=> {
    appendSenderMessage(data.message , data.dateTime)
})

socket.on('user-connected', data=> {
    appendConnectionMessage(data.message, data.dateTime)
})

socket.on('user-disconnected', data=> {
    appendConnectionMessage(data.message, data.dateTime)
})

socket.on('redirectRoom', roomID=> {
    window.location.href = `http://www.localhost:3000/chat/room/${roomID}`;
})

socket.on('oneroom' , roomid => {
    window.location.href = `http://www.localhost:3000/chat/oneroom/${roomid}`;
})

socket.on('redirect', message => {
    if (message == 'roomend'){
        window.location.href = "http://www.localhost:3000/chat/redirect/roomend";
    } else if (message == 'error'){
        window.location.href = "http://www.localhost:3000/chat/redirect/error";
    }
})


function appendSenderMessage(message , dateTime) {
    const messageDiv = document.createElement('div')
    messageDiv.className = "media-body w-50 mb-3"
    const messageWrap = document.createElement('div')
    messageWrap.className = "bg-light rounded py-2 px-3 mb-2"
    const messageElement = document.createElement('p')
    messageElement.className = "text-small mb-0 text-dark"
    messageElement.innerText = message
    messageWrap.append(messageElement)
    messageDiv.append(messageWrap)
    timeElement = document.createElement('p')
    timeElement.className = "small text-muted"
    timeElement.innerText = dateTime
    messageDiv.append(timeElement)
    messageContainer.append(messageDiv)
}

function appendOwnMessage(message , dateTime) {
    const messageDiv = document.createElement('div')
    messageDiv.className = "media w-50 ml-auto mb-3"
    const mediaDiv = document.createElement('div')
    mediaDiv.className = "media-body"
    const messageWrap = document.createElement('div')
    messageWrap.className = "bg-primary rounded py-2 px-3 mb-2"
    const messageElement = document.createElement('p')
    messageElement.className = "text-small mb-0 text-white"
    messageElement.innerText = message
    messageWrap.append(messageElement)
    mediaDiv.append(messageWrap)
    timeElement = document.createElement('p')
    timeElement.className = "small text-muted"
    timeElement.innerText = dateTime
    mediaDiv.append(timeElement)
    messageDiv.append(mediaDiv)
    messageContainer.append(messageDiv)
}

function appendConnectionMessage(message , dateTime) {
    const messageDiv = document.createElement('div')
    const para = document.createElement('p')
    para.className = "small font-italic text-muted"
    para.innerHTML = `${message} <br> ${dateTime}`
    messageDiv.append(para)
    messageContainer.append(messageDiv)
}

// socket.on("connect", function(){
//     socket.emit('new-room', roomName , reqName , reqEmail , reqPhone , reqDepartment , reqDesc , reqUrgent);
// });

// socket.on("seq-num", (msg) => console.info(msg));